FROM node:20-alpine AS base

FROM base AS builder
WORKDIR /app

RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=ui --docker


FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN yarn global add pnpm
RUN pnpm install --ignore-scripts

COPY --from=builder /app/out/full/ .
RUN pnpm install
RUN yarn turbo run build --filter=ui

FROM nginx:alpine AS runner

COPY --from=installer /app/packages/ui/storybook-static /usr/share/nginx/html
