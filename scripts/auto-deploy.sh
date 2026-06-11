#!/usr/bin/env bash
# auto-deploy.sh — Auto-deploy via polling do GitHub
set -euo pipefail

REPO_DIR="/opt/oiko"
BRANCH="master"
GIT_REMOTE="origin"
SLEEP_BEFORE_HEALTH=10

# === Variáveis de ambiente ===
DB_PASSWORD="postgrespassword"
DB_USER="postgres"
DB_NAME="oiko"
DB_PORT="5432"
BACKEND_API_PORT="3333"
BETTER_AUTH_SERVER_URL="http://192.168.0.233:3333"
# Gera BETTER_AUTH_SECRET na primeira execucao e persiste
if [ -f "/opt/oiko/.deploy-secrets" ]; then
  source "/opt/oiko/.deploy-secrets"
else
  BETTER_AUTH_SECRET="$(openssl rand -base64 32 | tr -d '\n')"
  echo "BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}" > /opt/oiko/.deploy-secrets
fi
BETTER_AUTH_TRUSTED_ORIGINS="http://192.168.0.233:3000"
NEXT_PUBLIC_BACKEND_API_URL="http://192.168.0.233:3333"
INTERNAL_BACKEND_API_URL="http://api:3333"

# Garantir que o repositório existe
if [ ! -d "$REPO_DIR/.git" ]; then
  echo "[deploy] Clonando repositório..."
  mkdir -p "$REPO_DIR"
  git clone "git@github.com:devrjs/oiko.git" "$REPO_DIR"
fi

cd "$REPO_DIR"

# Buscar atualizações
git fetch "$GIT_REMOTE" "$BRANCH" 2>&1

LOCAL=$(git rev-parse HEAD 2>/dev/null || echo "none")
REMOTE=$(git rev-parse "@{u}" 2>/dev/null || echo "")

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "[deploy] Nenhuma mudanca detectada ($LOCAL)"
  exit 0
fi

echo "[deploy] Nova versao detectada: $(echo $REMOTE | head -c 12) (atual: $(echo $LOCAL | head -c 12))"
echo "[deploy] Atualizando codigo..."
git reset --hard "$REMOTE"

# Gerar .env
cat > .env << EOF
DB_PORT=${DB_PORT}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DB_NAME=${DB_NAME}
BACKEND_API_PORT=${BACKEND_API_PORT}
BETTER_AUTH_SERVER_URL=${BETTER_AUTH_SERVER_URL}
BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
BETTER_AUTH_TRUSTED_ORIGINS=${BETTER_AUTH_TRUSTED_ORIGINS}
NEXT_PUBLIC_BACKEND_API_URL=${NEXT_PUBLIC_BACKEND_API_URL}
INTERNAL_BACKEND_API_URL=${INTERNAL_BACKEND_API_URL}
EOF

echo "[deploy] Reconstruindo e subindo containers..."
docker compose up -d --build 2>&1

echo "[deploy] Aguardando ${SLEEP_BEFORE_HEALTH}s..."
sleep "$SLEEP_BEFORE_HEALTH"

echo "[deploy] Verificando saude da API..."
curl --fail --retry 5 --retry-delay 5 http://localhost:3333/health || {
  echo "[deploy] ERRO: API nao respondeu!"
  docker compose logs api --tail=30
  exit 1
}

echo "[deploy] Rodando migracoes Drizzle..."
docker compose exec -T api bun x drizzle-kit push --force --config drizzle.config.ts 2>&1 || {
  echo "[deploy] WARNING: Migrations falhou, continuando..."
}

echo "[deploy] Verificando frontend..."
curl --fail --retry 3 --retry-delay 5 http://localhost:3000/ || {
  echo "[deploy] WARNING: Frontend nao respondeu"
  docker compose logs web --tail=20
}

echo "[deploy] Limpando imagens antigas..."
docker system prune -f --filter until=24h 2>&1 || true

echo "[deploy] Deploy concluido!"
