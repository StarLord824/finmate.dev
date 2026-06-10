# fundlens-api

Go + Fiber read API serving the `fundlens` Postgres schema.

## Local dev

```bash
# From repo root, ensure Postgres + Redis are up
pnpm db:up

# Run alembic migrations (from apps/fundlens-scraper) so the fundlens schema exists
FUNDLENS_DATABASE_URL=postgresql://postgres:password@localhost:5432/finmate \
  pnpm dev:fundlens-migrate

# Now run the API
cd apps/fundlens-api
FUNDLENS_DATABASE_URL=postgresql://postgres:password@localhost:5432/finmate \
FUNDLENS_REDIS_URL=redis://localhost:6379/0 \
  go run ./cmd/server
```

`curl http://localhost:5000/health` → `{"service":"fundlens-api","status":"ok",...}`

## sqlc

Generate Go DB layer from `internal/queries/*.sql` (uses `internal/schema/schema.sql`
as the type-check anchor — keep it in sync with the Alembic migrations):

```bash
sqlc generate
```

Output lands in `internal/db/` — checked-in and committed alongside the queries.

## Why this layout

- `cmd/server/` — only the entrypoint
- `internal/config/` — env-driven settings
- `internal/handlers/` — Fiber HTTP handlers
- `internal/queries/` — hand-written SQL (sqlc input)
- `internal/schema/schema.sql` — schema snapshot for sqlc
- `internal/db/` — sqlc-generated; do not hand-edit
- `internal/logger/` — zerolog JSON setup (matches Pino shape used by Node services)
