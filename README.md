# Oiko

Monorepo com API (Elysia/Bun) e Client (Next.js).

## Pré-requisitos

- **Node.js** >= 22.0.0
- **pnpm** 11.5.0 — gerenciador de pacotes oficial do projeto

```bash
# Instalar pnpm globalmente (caso não tenha)
npm install -g pnpm
```

## Instalação

```bash
pnpm install
```

## Desenvolvimento

Sobe API e Client simultaneamente:

```bash
pnpm dev
# ou
npx turbo dev
```

| Serviço | URL |
|---|---|
| API (Elysia) | http://localhost:3333 |
| Client (Next.js) | http://localhost:3000 |
| Swagger | http://localhost:3333/swagger |

## Scripts

| Comando | Descrição |
|---|---|
| `pnpm dev` | Dev server (API + Client) |
| `pnpm build` | Build de produção |
| `pnpm lint` | Biome check |
| `pnpm format` | Biome format |
| `pnpm check` | TypeScript check |
| `pnpm db:seed` | Popular banco |
| `pnpm clean` | Limpar node_modules, dist, .next |

## Estrutura

```
oiko/
├── apps/
│   ├── api/          # Elysia (Bun)
│   └── web/          # Next.js
├── .npmrc            # Config do pnpm
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

## Arquivos de Configuração

### `.npmrc`

Arquivo de configuração nativo do npm (também lido pelo pnpm e yarn). Fica na raiz do projeto e vale apenas pra ele.

No pnpm v11, scripts de build de dependências são **bloqueados por segurança**. O comando `pnpm approve-builds` abre um menu interativo pra liberar manualmente:

```
? Choose which packages to build
❯○ esbuild
 ○ sharp
 ○ es5-ext
```

O `.npmrc` com `onlyBuiltDependencies[]=...` faz a **mesma coisa** de forma automática e versionada — sem ter que escolher manualmente toda vez que o projeto for instalado.

```
onlyBuiltDependencies[]=esbuild
onlyBuiltDependencies[]=sharp
onlyBuiltDependencies[]=es5-ext
```

Cada linha autoriza um pacote a executar scripts de `postinstall` / `install`:

| Pacote | Por que precisa |
|---|---|
| **esbuild** | Bundler usado por várias ferramentas. Compila binário nativo na instalação. |
| **sharp** | Processamento de imagens do Next.js. Precisa compilar bindings nativos. |
| **es5-ext** | Dependência do ecossistema JS com build scripts próprios. |

**Quando mexer:** Se o pnpm reclamar com `ERR_PNPM_IGNORED_BUILDS` seguido do nome de um novo pacote, adicione uma linha e rode `pnpm rebuild`:

```
onlyBuiltDependencies[]=nome-do-pacote
```

> ⚠️ Escopo de projeto — vai pro Git. Config globais ficam em `~/.npmrc` (Unix) ou `%USERPROFILE%\.npmrc` (Windows).

### `pnpm-workspace.yaml`

Define os workspaces do monorepo:

```yaml
packages:
  - "apps/*"

onlyBuiltDependencies:
  - esbuild
  - sharp
  - es5-ext
```

- `packages` — toda subpasta de `apps/` é um workspace reconhecido pelo pnpm
- `onlyBuiltDependencies` — configuração equivalente à do `.npmrc`, mas no formato YAML. O pnpm lê ambos, então está duplicado intencionalmente como redundância.

> **Nota:** `onlyBuiltDependencies` pode estar em **qualquer um dos dois arquivos** — `.npmrc` ou `pnpm-workspace.yaml`. Mantemos nos dois pra garantir que funcione independente de qual arquivo o pnpm priorizar na sua versão.

### `package.json` — campo `packageManager`

```json
"packageManager": "pnpm@11.5.0"
```

**Pra que serve:** Declara oficialmente qual gerenciador de pacotes este projeto usa e em qual versão. Isso:

1. Impede que alguém rode `npm install` ou `bun install` acidentalmente (o pnpm avisa)
2. Se o **corepack** estiver habilitado, ele baixa automaticamente a versão correta do pnpm
3. O Turbo usa essa info pra resolver o binário do package manager

**Não altere esta linha** a menos que esteja migrando o projeto para outro gerenciador (bun, npm, yarn).

### `turbo.json`

Orquestra as tasks entre os workspaces:

```json
{
  "tasks": {
    "dev": { "cache": false, "persistent": true },
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "lint": { "dependsOn": ["^lint"] }
  }
}
```

- `persistent: true` — tasks como `dev` rodam em modo contínuo (servidor não termina)
- `dependsOn: ["^build"]` — antes de buildar um pacote, builda suas dependências primeiro
- `outputs` — pastas que o Turbo cacheia entre execuções
