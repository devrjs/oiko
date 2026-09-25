# Oiko

Aplicativo web de **controle de finanças pessoais** (pt-BR), em monorepo.

- **API** — Elysia + Bun + Drizzle ORM + Better Auth (`apps/api`)
- **Client** — Next.js 16 + React 19 + Tailwind CSS 4 (`apps/web`)
- **Infra** — Postgres 16 + Traefik (reverse proxy) via Docker Compose

## Stack

| Camada | Tecnologias |
|---|---|
| Runtime / gerenciador de pacotes | Bun 1.3+ (`packageManager: bun@1.3.14`) |
| Monorepo | Turbo 2.9 (orquestração de tasks) |
| API | Elysia 1.4, Drizzle ORM 0.45 (`postgres-js`), Better Auth 1.6, Zod 4 |
| Banco | PostgreSQL 16 |
| Client | Next.js 16.2 (App Router), React 19, TanStack Query, Axios, Recharts, Tailwind CSS 4, shadcn/Base UI |
| Qualidade | Biome 2.5, TypeScript 6, Knip 6, cSpell |
| Código gerado | Kubb 4.37 (a partir do OpenAPI do próprio Elysia) |
| Deploy | Docker Compose + Traefik, blue-green sem downtime (`scripts/deploy-blue-green.ts`) |

## Pré-requisitos

- **Bun** >= 1.3 — runtime e gerenciador de pacotes oficial do projeto
- **Docker** + Docker Compose — para o banco local e para o deploy
- **Node.js** >= 22 — opcional, usado apenas por ferramentas de CLI (há `engines.node` no `package.json`)

```bash
# Instalar o Bun (caso não tenha)
curl -fsSL https://bun.sh/install | bash
# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"
```

> O `packageManager` do `package.json` declara `bun@1.3.14`. O **corepack não suporta o Bun** (só npm, yarn e pnpm), então a versão do Bun é responsabilidade do ambiente — confira com `bun --version`.
> O `pnpm-lock.yaml` que ainda existe em `apps/web/` é legado e está no `.gitignore` — o lockfile do projeto é o `bun.lock` na raiz.

## Instalação

```bash
bun install
```

## Variáveis de ambiente

Os arquivos `.env*` **não são versionados**. Crie o seu antes de rodar qualquer coisa:

| Arquivo | Uso |
|---|---|
| `.env` | Desenvolvimento local (lido por todos os scripts via `--env-file=.env`) |
| `.env.docker` | Sobe a stack completa em Docker (`docker:up`) |
| `.env.production` | Valores de produção |

### API (`apps/api/src/env.ts`)

Validadas na inicialização com Zod — se faltar ou estiver inválida, o servidor não sobe.

| Variável | Padrão | Descrição |
|---|---|---|
| `BACKEND_API_PORT` | `3333` | Porta do servidor Elysia |
| `DB_HOST` | — | Host do Postgres |
| `DB_PORT` | `5432` | Porta do Postgres |
| `DB_USER` | — | Usuário do banco |
| `DB_PASSWORD` | — | Senha do banco |
| `DB_NAME` | — | Nome do banco |
| `BETTER_AUTH_SERVER_URL` | — | URL base do Better Auth (dev: `http://localhost:3333`; em Docker: `http://localhost/api/auth`) |
| `BETTER_AUTH_TRUSTED_ORIGINS` | — | Origens confiáveis, separadas por vírgula |
| `BETTER_AUTH_SECRET` | — | Segredo de assinatura (mínimo prático de 32 caracteres) |

### Client (`apps/web/src/env.ts`)

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_BACKEND_API_URL` | URL que o **browser** usa para falar com a API |
| `INTERNAL_BACKEND_API_URL` | URL que o **servidor Next.js** usa (obrigatória no SSR) |

### Exemplo para desenvolvimento local

```dotenv
BACKEND_API_PORT=3333
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgrespassword
DB_NAME=oiko
BETTER_AUTH_SERVER_URL=http://localhost:3333
BETTER_AUTH_TRUSTED_ORIGINS=http://localhost:3000
BETTER_AUTH_SECRET=troque_este_segredo_em_producao_com_32_chars

NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3333
INTERNAL_BACKEND_API_URL=http://localhost:3333
```

### Exemplo para a stack em Docker

Dentro do Docker o browser não enxerga a porta `3333`: ele fala com o Traefik na porta 80, que remove o prefixo `/api-proxy` antes de encaminhar para `api:3333`.

```dotenv
BETTER_AUTH_SERVER_URL=http://localhost/api/auth
BETTER_AUTH_TRUSTED_ORIGINS=http://localhost
NEXT_PUBLIC_BACKEND_API_URL=http://localhost/api-proxy
INTERNAL_BACKEND_API_URL=http://api:3333
```

> Em produção, `BETTER_AUTH_SECRET` e `DB_PASSWORD` vêm dos secrets do GitHub Actions (`.github/workflows/deploy.yml`).

## Desenvolvimento

### Banco de dados

```bash
bun run db:up        # sobe só o Postgres em Docker (127.0.0.1:5432)
bun run db:push      # aplica o schema Drizzle (drizzle-kit push --force)
```

### API + Client juntos

```bash
bun run dev          # bun --env-file=.env turbo dev
```

| Serviço | URL |
|---|---|
| API (Elysia) | http://localhost:3333 |
| Swagger / OpenAPI | http://localhost:3333/swagger |
| Client (Next.js) | http://localhost:3000 |

### Por aplicativo

```bash
cd apps/api && bun run dev     # bun --watch src/server.ts
cd apps/web && bun run dev     # next dev --webpack
```

### Roteamento no client

- O middleware (`apps/web/src/proxy.ts`) verifica o cookie de sessão e redireciona:
  - sem sessão em rota protegida → `/`
  - com sessão nas rotas declaradas públicas → `/dashboard`
- Rotas protegidas: `/dashboard`, `/finances`, `/pendencies`, `/category`, `/goals`, `/profile`
- Públicas para efeito de redirecionamento: `/`, `/signup` e `/forgot`. Atenção: `/signin` **não** está nessa lista (o `/forgot` listado também não tem página correspondente em `src/app`) — vale revisar se o comportamento esperado é redirecionar usuários logados que abrem `/signin`.
- Requisições para `/api/auth/*` são reescritas pelo Next para `INTERNAL_BACKEND_API_URL` (`apps/web/next.config.ts`)

## Scripts (raiz)

| Comando | Descrição |
|---|---|
| `bun run dev` | Dev server da API e do Client via Turbo |
| `bun run build` | Build de produção dos dois apps |
| `bun run check` | `tsc --noEmit` em todos os workspaces |
| `bun run lint` | `biome check .` em todos os workspaces |
| `bun run format` | `biome format --write .` em todos os workspaces |
| `bun run clean` | `knip --fix` + remove `dist`, `.next`, `node_modules`, `.turbo` e lockfiles |
| `bun run db:up` | Sobe o Postgres em Docker |
| `bun run db:generate` | Gera migration a partir do schema |
| `bun run db:migrate` | Aplica as migrations versionadas |
| `bun run db:push` | Aplica o schema direto no banco (sem migration) |
| `bun run db:studio` | Abre o Drizzle Studio |
| `bun run db:seed` | ⚠️ script existe, mas `apps/api/src/db/seed.ts` ainda não foi implementado |
| `bun run docker:up` | Sobe Traefik + Postgres + API + Web (`--env-file .env.docker`) |
| `bun run docker:down` | Derruba a stack Docker |
| `bun run docker:logs` | Logs da stack Docker |
| `bun run deploy:infra` | Sobe apenas a infraestrutura (`docker-compose.infra.yml`, projeto `oiko-infra`) |
| `bun run deploy` | Deploy blue-green (`scripts/deploy-blue-green.ts`) |

> ⚠️ `bun run clean` é destrutivo: além de `node_modules`/`.next`/`dist`, ele apaga `bun.lock` e usa `knip --fix --allow-remove-files`, que pode remover arquivos do projeto. Use com atenção.

### Scripts por app

| App | Comando | Descrição |
|---|---|---|
| `apps/api` | `bun run start` | Roda o build (`dist/server.js`) |
| `apps/api` | `bun run db:push` | `drizzle-kit push --force` |
| `apps/web` | `bun run codegen` | Gera o client tipado com Kubb |

## Rotas da API

As rotas dependem de uma sessão válida do Better Auth (via cookie). As rotas de escrita são `POST` por convenção do projeto.

> ⚠️ **Verificado:** o guard de autenticação (`isAuthenticated` em `apps/api/src/modules/auth-middleware.ts`) **não está bloqueando** as requisições sem cookie. Chamadas sem sessão às rotas abaixo retornam `200` com corpo vazio (os handlers fazem `if (!user_id) return`) em vez do `401` documentado no Swagger — `GET /view/goals` é a exceção e responde `500`, porque acessa `session.user.id` sem guarda opcional. Não há vazamento de dados (o handler sai antes de consultar o banco), mas o contrato de autenticação não está sendo cumprido. Vale corrigir antes de expor a API.

| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Healthcheck (usado pelo Docker e pelo load balancer do Traefik) |
| ALL | `/api/auth/*` | Handler do Better Auth (signin, signup, sessão, reset de senha, verificação de e-mail) |
| GET | `/me` | Perfil do usuário logado |
| POST | `/edit/user` | Edita `name`, `username` e/ou `password` |
| POST | `/add/category` | Cria categoria |
| GET | `/list/categories` | Lista categorias com paginação e busca |
| GET | `/all/categories` | Lista todas as categorias do usuário |
| POST | `/edit/category` | Edita descrição da categoria |
| POST | `/delete/category` | Exclui categoria, suas finanças e metas relacionadas |
| POST | `/add/finance` | Cria transação financeira |
| POST | `/edit/finance` | Edita transação existente |
| GET | `/list/finance` | Lista transações (Entradas e Saídas) |
| GET | `/list/pendencies` | Lista pendências (contas a pagar/receber) |
| GET | `/total/finances` | Resumos estatísticos (totais e dados dos gráficos) |
| POST | `/delete/finance` | Exclui transação |
| POST | `/add/goals` | Cria meta financeira |
| POST | `/edit/goals` | Edita meta existente |
| GET | `/view/goals` | Status da meta (carteira, acumulado, projeção) |
| POST | `/delete/goals` | Exclui meta |

`/swagger/json` expõe o OpenAPI dinâmico gerado pelo Elysia (18 paths, sem contar `/api/auth/*`).

## Código gerado (Kubb)

O client tipado fica em `apps/web/src/gen` e é gerado a partir de um snapshot do OpenAPI:

```bash
cd apps/web && bun run codegen   # bunx kubb generate
```

- Entrada: `apps/web/swagger-test.json` (snapshot versionado, com 23 paths)
- Saída: `src/gen/{types,clients,hooks}` — configurado em `apps/web/kubb.config.mjs`
- **Status:** em migração, e o snapshot está **desatualizado** em relação à API atual:
  - O snapshot contém os paths antigos (`/category/list`, `/signup`, `/session`, `/password/reset`…), enquanto a API hoje expõe `/list/categories`, `/me`, `/health` — ou seja, o código gerado aponta para rotas que a API mudou de nome.
  - Os hooks atuais (`apps/web/src/hooks/*`) ainda usam Axios direto (`src/lib/api.ts`) e o código gerado não é consumido pela aplicação.
  - Ao retomar a migração, gere um novo snapshot a partir de `http://localhost:3333/swagger/json` antes de rodar o codegen.
- `apps/web/src/lib/react-query-shim.ts` existe para contornar um import de `mutationOptions` do Kubb e é mapeado por alias no `tsconfig.json`.

## Docker e deploy

| Arquivo | Responsabilidade |
|---|---|
| `docker-compose.yml` | Stack de desenvolvimento: Traefik + Postgres + API + Web (projeto `oiko`) |
| `docker-compose.infra.yml` | Infraestrutura persistente: Traefik + Postgres em volume nomeado `oiko-db-data` (projeto `oiko-infra`) |
| `docker-compose.app.yml` | Apenas API + Web, usado pelas stacks blue/green (projetos `oiko-blue` / `oiko-green`) |
| `infra/traefik/traefik.yml` | Config estática (entrypoints `web`/`websecure`/`traefik`, provider docker + file) |
| `infra/traefik/dynamic/middleware.yml` | Middlewares globais: `security-headers`, `cors-headers`, `compress`, `rate-limit` |

### Portas e hostnames

| Serviço | Endereço |
|---|---|
| Traefik | `80` e `443` |
| Traefik Dashboard | http://localhost:8080 (ou `traefik.oiko.local:8080`) |
| Postgres | `127.0.0.1:5432` |
| API / Web | sem porta publicada — só através do Traefik |

Roteamento: `api.oiko.local` → `api:3333` e `PathPrefix(/api-proxy)` (com `stripprefix`); `app.oiko.local` e `/` → `web:3000`.

Para usar os hostnames localmente, adicione ao arquivo de hosts (`C:\Windows\System32\drivers\etc\hosts` ou `/etc/hosts`):

```
127.0.0.1 api.oiko.local app.oiko.local traefik.oiko.local
```

### Deploy blue-green

`bun run deploy` (`scripts/deploy-blue-green.ts`) executa:

1. Garante as redes Docker `traefik` e `oiko` e sobe a infraestrutura se necessário
2. Detecta qual stack está no ar e escolhe a cor oposta (`blue` ↔ `green`)
3. Incrementa a prioridade dos routers Traefik da nova stack (mantendo a antiga servindo tráfego)
4. Faz build e sobe a nova stack, espera DB, API e Web ficarem `healthy`
5. Aplica as migrations (`docker exec … bun run db:push`)
6. Só então derruba a stack antiga — zero downtime

No CI, `.github/workflows/deploy.yml` roda em runner **self-hosted** a cada push em `master`, grava o `.env` a partir dos secrets e chama `bun run deploy`.

## Estrutura

```
oiko/
├── apps/
│   ├── api/                     # Elysia + Bun + Drizzle + Better Auth
│   │   ├── src/
│   │   │   ├── db/              # cliente Drizzle, schema e migrations
│   │   │   ├── lib/auth.ts      # configuração do Better Auth
│   │   │   ├── modules/         # auth, categories, finances, goals
│   │   │   ├── env.ts           # validação das variáveis com Zod
│   │   │   └── server.ts        # bootstrap do Elysia (CORS, Swagger, rotas)
│   │   ├── drizzle.config.ts
│   │   └── Dockerfile
│   └── web/                     # Next.js (App Router)
│       ├── src/
│       │   ├── app/             # (public) landing/signin/signup + (auth) painel
│       │   ├── components/      # componentes de UI do app
│       │   ├── hooks/           # data fetching por domínio
│       │   ├── gen/             # client gerado pelo Kubb
│       │   ├── lib/api.ts       # instância Axios (base URL por ambiente)
│       │   └── proxy.ts         # middleware de rotas públicas/protegidas
│       ├── kubb.config.mjs
│       └── Dockerfile
├── infra/traefik/               # config estática, middlewares e certificados
├── scripts/deploy-blue-green.ts
├── docker-compose{,.infra,.app}.yml
├── turbo.json
├── biome.jsonc
└── package.json                 # workspaces: apps/*
```

## Qualidade de código

| Ferramenta | Onde | Como rodar |
|---|---|---|
| Biome | `biome.jsonc` | `bun run lint` / `bun run format` |
| TypeScript | `tsconfig.json` de cada app | `bun run check` |
| Turbo | `turbo.json` | orquestra `dev`, `build`, `check`, `lint`, `format`, `start` |
| Knip | `knip.json` | `bun run clean` |
| cSpell | `cspell.json` | manual (`cspell` não está nos scripts) |

Convenções do Biome: aspas simples, sem ponto e vírgula, vírgula final ES5, indentação de 2 espaços, `organizeImports` ligado. `apps/web/src/components/ui/` e `apps/web/src/gen/` ficam fora do lint.

### Notas conhecidas

- **Line endings:** o Biome espera `LF`. Em Windows com `core.autocrlf=true` os arquivos chegam com `CRLF` no working tree e o `bun run lint` acusa "Formatter would have printed the following content" em quase todos os arquivos. Rode `bun run format` ou use `git config core.autocrlf input`.
- **`next dev` e caminhos com `!`:** o webpack reserva `!` para sintaxe de loader e falha se o caminho do repositório contiver esse caractere (`The provided value … contains exclamation mark (!) which is not allowed`). Clone o projeto em um caminho sem `!`.
- **Testes:** não há framework de testes configurado; os portões atuais são `check`, `lint` e `build`.
- **`biome` não é dependência declarada:** o comando vem do Biome instalado no ambiente (ou `bunx @biomejs/biome`).
- **Lockfile legado:** `apps/web/pnpm-lock.yaml` faz o Next.js avisar sobre múltiplos lockfiles; pode ser removido com segurança.

## Arquivos de configuração

| Arquivo | Papel |
|---|---|
| `turbo.json` | Tasks: `build` (`dependsOn: ^build`, cacheia `.next/**`/`dist/**`), `dev` (`persistent`, sem cache), `start`, `lint`, `format`, `check`, `db:seed` |
| `biome.jsonc` | Lint + formatação, com `vcs.useIgnoreFile` e exclusões de `components/ui`, `src/gen`, `.next`, `dist`, `build` |
| `knip.json` | Entradas e ignores por workspace (usado pelo `clean`) |
| `kubb.config.mjs` | Geração do client a partir de `swagger-test.json` |
| `cspell.json` | Dicionário `en,pt-BR` com os termos do projeto |
| `.npmrc` | `onlyBuiltDependencies[]` — configuração do **pnpm**, ignorada pelo Bun |

### Sobre o `.npmrc`

O projeto migrou de pnpm para Bun. Hoje o arquivo é legado:

- O Bun **ignora** `onlyBuiltDependencies` (campo do pnpm).
- O equivalente no Bun é `trustedDependencies` no `package.json` — e, por padrão, o Bun já confia em uma lista embutida de ~367 pacotes que cobre `esbuild` e `sharp`, então nenhum ajuste é necessário (`bun pm untrusted` retorna zero pendências).
- Comandos úteis: `bun pm untrusted` (lista pendências), `bun pm trust <pkg>` (autoriza um pacote), `bun install --trust <pkg>`.

## Documentação relacionada

| Arquivo | Conteúdo |
|---|---|
| `DESIGN.md` | Sistema de design (tokens, tipografia, componentes, do's & don'ts) |
| `apps/web/PRODUCT.md` | Product brief: usuários, propósito, posicionamento e princípios |
| `AGENTS.md` | Regras do projeto para agentes (documentação e respostas em pt-BR) |
| `apps/web/AGENTS.md` | Regras específicas do Next.js 16 (consulte `node_modules/next/dist/docs/`) |