# Stage 1: Base image
FROM oven/bun:1.3-alpine AS base
WORKDIR /app

# Stage 2: Install dependencies
FROM base AS prereqs
COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
RUN bun install --frozen-lockfile --backend=copy

# Stage 3: Build application
FROM prereqs AS builder

# Accept build arguments for environment variables
ARG NEXT_PUBLIC_BACKEND_API_URL
ENV NEXT_PUBLIC_BACKEND_API_URL=$NEXT_PUBLIC_BACKEND_API_URL
ARG INTERNAL_BACKEND_API_URL
ENV INTERNAL_BACKEND_API_URL=$INTERNAL_BACKEND_API_URL

COPY apps/web ./apps/web
WORKDIR /app/apps/web
RUN bun run build

# Stage 4: Production runner
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

# Copy node_modules, build outputs, and package configuration
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json

EXPOSE 3000

WORKDIR /app/apps/web

# Run the Next.js server using Bun
CMD ["bun", "run", "start"]
