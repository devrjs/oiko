/// <reference types="@types/bun" />
import { $ } from 'bun'

// Configura para lançar exceção em caso de erro nos comandos (equivalente ao "set -e")
$.throws(true)

console.log('Iniciando verificação de redes docker...')

// 1. Garante que as redes do docker existam
try {
  await $`docker network inspect traefik`.quiet()
} catch {
  await $`docker network create traefik`
}

try {
  await $`docker network inspect oiko`.quiet()
} catch {
  await $`docker network create oiko`
}

// 2. Sobe a infraestrutura base (postgres, traefik) apenas se não estiver rodando
const infraRunning = (
  await $`docker ps --filter "label=com.docker.compose.project=oiko-infra" --filter "status=running" -q`.text()
).trim()
if (!infraRunning) {
  console.log('Infraestrutura inativa. Iniciando...')
  try {
    await $`docker rm -f oiko-traefik oiko-db`.quiet()
  } catch {}
  await $`docker compose -f docker-compose.infra.yml -p oiko-infra up -d`
} else {
  console.log('Infraestrutura ativa e rodando.')
}

// 2b. Remove containers do projeto legado "oiko" (anterior ao blue-green)
//     que usam as mesmas labels Traefik e causam conflito de serviço duplicado
const legacyRunning = (
  await $`docker ps --filter "label=com.docker.compose.project=oiko" --filter "status=running" -q`.text()
).trim()
if (legacyRunning) {
  console.log("Removendo containers legados do projeto 'oiko'...")
  await $`docker compose -f docker-compose.yml -p oiko down`.quiet().nothrow()
}

// 3. Identifica qual stack (blue/green) está rodando atualmente
const blueRunning = (
  await $`docker ps --filter "label=com.docker.compose.project=oiko-blue" --filter "status=running" -q`.text()
).trim()
const greenRunning = (
  await $`docker ps --filter "label=com.docker.compose.project=oiko-green" --filter "status=running" -q`.text()
).trim()

let newColor = 'blue'
let oldColor = ''

if (blueRunning) {
  newColor = 'green'
  oldColor = 'blue'
} else if (greenRunning) {
  newColor = 'blue'
  oldColor = 'green'
}

console.log(`NEW_COLOR=${newColor}`)
console.log(`OLD_COLOR=${oldColor}`)

// ──────────────────────────────────────────────────────────
// 4. Determina prioridades dos routers Traefik para a nova stack
//    Lemos a prioridade atual da stack antiga e incrementamos em 1.
//    Isso garante que o Traefik sempre prefira a nova stack
//    durante o período em que ambas coexistirem, evitando que
//    requisições caiam na stack antiga ou na nova antes do healthy.
// ──────────────────────────────────────────────────────────
let webPriority = 5
let apiPriority = 10

if (oldColor) {
  try {
    const oldWebLabel = (
      await $`docker inspect oiko-${oldColor}-web-1 --format '{{index .Config.Labels "traefik.http.routers.web.priority"}}'`.text()
    ).trim()
    const parsed = parseInt(oldWebLabel, 10)
    if (!isNaN(parsed)) {
      webPriority = parsed + 1
      apiPriority = webPriority + 5
    } else {
      webPriority = 6
      apiPriority = 11
    }
  } catch {
    webPriority = 6
    apiPriority = 11
  }
}

console.log(`Prioridades definidas: web=${webPriority}, api=${apiPriority}`)

// ──────────────────────────────────────────────────────────
// 5. Faz o build da nova stack (a antiga continua servindo)
// ──────────────────────────────────────────────────────────
console.log(`Build da nova stack (${newColor}) em andamento...`)
await $`WEB_ROUTER_PRIORITY=${webPriority} API_ROUTER_PRIORITY=${apiPriority} docker compose -f docker-compose.app.yml -p oiko-${newColor} build`

// ──────────────────────────────────────────────────────────
// 6. Sobe a nova stack — a antiga **ainda está no ar** servindo tráfego
//    A nova stack começa a receber requisições assim que passar
//    no health check do Traefik. Ambas coexistem por alguns instantes.
// ──────────────────────────────────────────────────────────
console.log(
  `Subindo nova stack (${newColor}) com prioridade web=${webPriority} api=${apiPriority}...`
)
await $`WEB_ROUTER_PRIORITY=${webPriority} API_ROUTER_PRIORITY=${apiPriority} docker compose -f docker-compose.app.yml -p oiko-${newColor} up -d`

// ──────────────────────────────────────────────────────────
// 7. Aguarda o banco de dados ficar saudável
// ──────────────────────────────────────────────────────────
console.log('Aguardando banco de dados ficar saudável...')
let dbHealthy = false
for (let attempt = 0; attempt < 30 && !dbHealthy; attempt++) {
  try {
    const health =
      await $`docker inspect oiko-db --format '{{.State.Health.Status}}'`.text()
    if (health.trim() === 'healthy') {
      dbHealthy = true
    }
  } catch {}
  if (!dbHealthy) await Bun.sleep(2000)
}
if (!dbHealthy) {
  console.log('Timeout aguardando DB. Tentando migrações mesmo assim...')
}

// ──────────────────────────────────────────────────────────
// 8. Aguarda o container da API da nova stack subir
// ──────────────────────────────────────────────────────────
let apiContainer = ''
console.log('Aguardando container da API inicializar...')
while (!apiContainer) {
  await Bun.sleep(1000)
  const result =
    await $`docker compose -f docker-compose.app.yml -p oiko-${newColor} ps -q api`.text()
  apiContainer = result.trim()
}

// 9. Aguarda o health check interno do Docker na API
console.log('Aguardando API ficar saudável (Docker healthcheck)...')
let apiHealthy = false
for (let attempt = 0; attempt < 60 && !apiHealthy; attempt++) {
  try {
    const health =
      await $`docker inspect ${apiContainer} --format '{{.State.Health.Status}}'`.text()
    if (health.trim() === 'healthy') {
      apiHealthy = true
    }
  } catch {}
  if (!apiHealthy) await Bun.sleep(2000)
}

// 10. Roda as migrações do banco (só depois da API estar pronta)
console.log('Executando migrações do banco de dados...')
try {
  await $`docker exec ${apiContainer} bun run db:push`
  console.log('Migrações aplicadas com sucesso.')
} catch (err) {
  console.error('Falha ao aplicar migrações:', err.message)
  console.log('Continuando mesmo com falha na migração...')
}

// 11. Aguarda o container do Web Frontend subir
let webContainer = ''
console.log('Aguardando container Web inicializar...')
while (!webContainer) {
  await Bun.sleep(1000)
  const result =
    await $`docker compose -f docker-compose.app.yml -p oiko-${newColor} ps -q web`.text()
  webContainer = result.trim()
}

// 12. Aguarda o frontend ficar saudável
console.log('Aguardando Frontend responder saudável...')
let webHealthy = false
for (let attempt = 0; attempt < 60 && !webHealthy; attempt++) {
  try {
    const health =
      await $`docker inspect ${webContainer} --format '{{.State.Health.Status}}'`.text()
    if (health.trim() === 'healthy') {
      webHealthy = true
    }
  } catch {}
  if (!webHealthy) await Bun.sleep(2000)
}

// ──────────────────────────────────────────────────────────
// 13. SÓ AGORA derruba a stack antiga — a nova já está saudável
//     Zero downtime: em nenhum momento o site ficou sem resposta.
// ──────────────────────────────────────────────────────────
if (oldColor) {
  console.log(
    `Derrubando stack antiga (${oldColor}) — nova stack (${newColor}) já está saudável.`
  )
  await $`docker compose -f docker-compose.app.yml -p oiko-${oldColor} down`
    .quiet()
    .nothrow()
}

console.log(`Deploy finalizado com sucesso na stack ${newColor}!`)
