#!/bin/bash

set -e

docker network inspect traefik >/dev/null 2>&1 || docker network create traefik
docker network inspect oiko >/dev/null 2>&1 || docker network create oiko

docker compose -f docker-compose.infra.yml -p oiko-infra up -d

BLUE_RUNNING=$(docker ps --filter "label=com.docker.compose.project=oiko-blue" --filter "status=running" -q)
GREEN_RUNNING=$(docker ps --filter "label=com.docker.compose.project=oiko-green" --filter "status=running" -q)

if [ -n "$BLUE_RUNNING" ]; then
    NEW_COLOR="green"
    OLD_COLOR="blue"
elif [ -n "$GREEN_RUNNING" ]; then
    NEW_COLOR="blue"
    OLD_COLOR="green"
else
    NEW_COLOR="blue"
    OLD_COLOR=""
fi

echo "NEW_COLOR=$NEW_COLOR"
echo "OLD_COLOR=$OLD_COLOR"

docker compose -f docker-compose.app.yml -p oiko-$NEW_COLOR up -d --build

API_CONTAINER=""
until [ -n "$API_CONTAINER" ]; do
    sleep 1
    API_CONTAINER=$(docker compose -f docker-compose.app.yml -p oiko-$NEW_COLOR ps -q api || echo "")
done

docker exec $API_CONTAINER bun run db:push

until docker exec $API_CONTAINER wget --no-verbose --spider http://localhost:3333/health >/dev/null 2>&1; do
    sleep 2
done

WEB_CONTAINER=""
until [ -n "$WEB_CONTAINER" ]; do
    sleep 1
    WEB_CONTAINER=$(docker compose -f docker-compose.app.yml -p oiko-$NEW_COLOR ps -q web || echo "")
done

until docker exec $WEB_CONTAINER wget --no-verbose --spider http://localhost:3000/ >/dev/null 2>&1; do
    sleep 2
done

sleep 5

if [ -n "$OLD_COLOR" ]; then
    docker compose -f docker-compose.app.yml -p oiko-$OLD_COLOR down
fi

echo "Deploy finalizado com sucesso na stack $NEW_COLOR!"
