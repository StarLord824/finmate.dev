FROM node:20-alpine AS base
RUN npm install -g pnpm@9 && apk add --no-cache openssl

FROM base AS deps
WORKDIR /app
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY packages/db/package.json               packages/db/
COPY packages/shared-types/package.json     packages/shared-types/
COPY packages/shared-utils/package.json     packages/shared-utils/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json   packages/eslint-config/
COPY apps/ingestion-worker/package.json    apps/ingestion-worker/
RUN pnpm install --frozen-lockfile

FROM deps AS builder
WORKDIR /app
COPY packages/ packages/
COPY apps/ingestion-worker/ apps/ingestion-worker/
RUN pnpm --filter @repo/db exec prisma generate
RUN pnpm --filter ingestion-worker build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules                         ./node_modules
COPY --from=builder /app/packages/db/node_modules            ./packages/db/node_modules
COPY --from=builder /app/packages/db/src/generated           ./packages/db/src/generated
COPY --from=builder /app/packages/db/prisma                  ./packages/db/prisma
COPY --from=builder /app/packages/db/package.json            ./packages/db/package.json
COPY --from=builder /app/apps/ingestion-worker/dist          ./apps/ingestion-worker/dist
COPY --from=builder /app/apps/ingestion-worker/config        ./apps/ingestion-worker/config
COPY --from=builder /app/apps/ingestion-worker/package.json  ./apps/ingestion-worker/package.json

CMD ["node", "apps/ingestion-worker/dist/index.js"]
