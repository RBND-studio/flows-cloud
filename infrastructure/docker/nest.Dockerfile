FROM node:20-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=backend --docker

FROM base AS installer
RUN apk add --no-cache libc6-compat alpine-sdk python3
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN yarn global add pnpm
RUN pnpm install --ignore-scripts

COPY --from=builder /app/out/full/ .
RUN pnpm install
RUN yarn turbo run build --filter=backend...

FROM base as prod-installer
WORKDIR /app
RUN yarn global add pnpm
COPY --from=builder /app/out/full/ .
RUN pnpm install --production --ignore-scripts

FROM base AS runner
WORKDIR /app


COPY --chown=node:node --from=installer /app/packages/db/drizzle ./packages/db/drizzle
COPY --chown=node:node --from=installer /app/apps/backend/package.json ./apps/backend/
COPY --chown=node:node --from=prod-installer /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --chown=node:node --from=prod-installer /app/node_modules ./node_modules
COPY --chown=node:node --from=prod-installer /app/package.json ./package.json
COPY --chown=node:node --from=installer /app/apps/backend/dist ./apps/backend/dist
COPY ./apps/backend/.env ./apps/backend/.env

WORKDIR /app/apps/backend
CMD ["node", "dist/main.js"]