/// <reference types="@types/bun" />
import { $ } from "bun";

// Configura para lançar exceção em caso de erro nos comandos (equivalente ao "set -e")
$.throws(true);

console.log("Iniciando verificação de redes docker...");

// 1. Garante que as redes do docker existam
try {
  await $`docker network inspect traefik`.quiet();
} catch {
  await $`docker network create traefik`;
}

try {
  await $`docker network inspect oiko`.quiet();
} catch {
  await $`docker network create oiko`;
}

// 2. Sobe a infraestrutura base (postgres, traefik) apenas se não estiver rodando
const infraRunning = (await $`docker ps --filter "label=com.docker.compose.project=oiko-infra" --filter "status=running" -q`.text()).trim();
if (!infraRunning) {
  console.log("Infraestrutura inativa. Iniciando...");
  try {
    await $`docker rm -f oiko-traefik oiko-db`.quiet();
  } catch {}
  await $`docker compose -f docker-compose.infra.yml -p oiko-infra up -d`;
} else {
  console.log("Infraestrutura ativa e rodando.");
}

// 2b. Remove containers do projeto legado "oiko" (anterior ao blue-green)
//     que usam as mesmas labels Traefik e causam conflito de serviço duplicado
const legacyRunning = (await $`docker ps --filter "label=com.docker.compose.project=oiko" --filter "status=running" -q`.text()).trim();
if (legacyRunning) {
  console.log("Removendo containers legados do projeto 'oiko'...");
  await $`docker compose -f docker-compose.yml -p oiko down`.quiet().nothrow();
}

// 3. Identifica qual stack (blue/green) está rodando atualmente
const blueRunning = (await $`docker ps --filter "label=com.docker.compose.project=oiko-blue" --filter "status=running" -q`.text()).trim();
const greenRunning = (await $`docker ps --filter "label=com.docker.compose.project=oiko-green" --filter "status=running" -q`.text()).trim();

let newColor = "blue";
let oldColor = "";

if (blueRunning) {
  newColor = "green";
  oldColor = "blue";
} else if (greenRunning) {
  newColor = "blue";
  oldColor = "green";
}

console.log(`NEW_COLOR=${newColor}`);
console.log(`OLD_COLOR=${oldColor}`);

// 4. Sobe a nova stack (com build)
console.log(`Subindo a nova stack (${newColor})...`);
await $`docker compose -f docker-compose.app.yml -p oiko-${newColor} up -d --build`;

// 5. Aguarda o container da API subir para rodar as migrations do banco
let apiContainer = "";
console.log("Aguardando container da API inicializar...");
while (!apiContainer) {
  await Bun.sleep(1000);
  const result = await $`docker compose -f docker-compose.app.yml -p oiko-${newColor} ps -q api`.text();
  apiContainer = result.trim();
}

// 6. Roda o push do Drizzle ORM no banco de dados
console.log("Executando migrações do banco de dados...");
await $`docker exec ${apiContainer} bun run db:push`;

// 7. Aguarda a API estar totalmente saudável
console.log("Aguardando API responder /health...");
let apiHealthy = false;
while (!apiHealthy) {
  try {
    await $`docker exec ${apiContainer} wget --no-verbose --spider http://localhost:3333/health`.quiet();
    apiHealthy = true;
  } catch {
    await Bun.sleep(2000);
  }
}

// 8. Aguarda o container do Web Frontend subir
let webContainer = "";
console.log("Aguardando container Web inicializar...");
while (!webContainer) {
  await Bun.sleep(1000);
  const result = await $`docker compose -f docker-compose.app.yml -p oiko-${newColor} ps -q web`.text();
  webContainer = result.trim();
}

// 9. Aguarda o frontend estar saudável
console.log("Aguardando Frontend responder saudável...");
let webHealthy = false;
while (!webHealthy) {
  try {
    await $`docker exec ${webContainer} wget --no-verbose --spider http://localhost:3000/`.quiet();
    webHealthy = true;
  } catch {
    await Bun.sleep(2000);
  }
}

// Tempo de segurança para estabilização das conexões do proxy Traefik
await Bun.sleep(5000);

// 10. Desliga a stack antiga se ela existir
if (oldColor) {
  console.log(`Derrubando a stack antiga (${oldColor})...`);
  await $`docker compose -f docker-compose.app.yml -p oiko-${oldColor} down`;
}

console.log(`Deploy finalizado com sucesso na stack ${newColor}!`);
