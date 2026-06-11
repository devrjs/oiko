# Stage 1: Base image
FROM oven/bun:1.3-alpine AS base
WORKDIR /app

# Stage 2: Install dependencies (copia arquivos, não symlinks)
FROM base AS prereqs
COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
RUN bun install --frozen-lockfile --backend=copy

# Stage 3: Build application
FROM prereqs AS builder
COPY apps/api ./apps/api
WORKDIR /app/apps/api
RUN bun run build

# Install production dependencies in api directory (copia arquivos, não symlinks)
RUN cd /app/apps/api && bun install --production --backend=copy

# Stage 4: Production runner
FROM base AS runner
ENV NODE_ENV=production

WORKDIR /app

# Copy source files and dist
COPY --from=builder /app/apps/api ./apps/api
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json

# Install dependencies (recreate node_modules with proper symlinks)
RUN bun install --backend=copy

EXPOSE 3333

WORKDIR /app/apps/api

CMD ["bun", "run", "start"]
