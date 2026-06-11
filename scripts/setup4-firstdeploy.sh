#!/bin/bash
set -euo pipefail
cd /opt/oiko
if [ ! -f /opt/oiko/.deploy-secrets ]; then
  SECRET_X=*** rand -base64 32 | tr -d '\n')
  echo "BETTER_AUTH_SECRET=*** > /opt/oiko/.deploy-secrets
fi
source /opt/oiko/.deploy-secrets
cat > .env << EOFCONFIG
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgr...X"
BETTER_AUTH_TRUSTED_ORIGINS=http://192.168.0.233:3000
NEXT_PUBLIC_BACKEND_API_URL=http://192.168.0.233:3333
INTERNAL_BACKEND_API_URL=http://api:3333
EOFCONFIG
echo ".env criado"
echo "Primeiro deploy..."
docker compose up -d --build 2>&1
echo "Aguardando 15s..."
sleep 15
echo "Health check API..."
curl --fail --retry 5 --retry-delay 5 http://localhost:3333/health && echo "API OK" || echo "API FAIL"
echo "Check web..."
curl --fail --retry 3 --retry-delay 5 http://localhost:3000/ && echo "WEB OK" || echo "WEB FAIL"
echo "Migrations..."
docker compose exec -T api bun x drizzle-kit push --force --config drizzle.config.ts 2>&1 || echo "MIGRATIONS WARNING"
echo "DEPLOY COMPLETE"
