# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FinMate is a full-stack finance news platform with AI-powered trading simulation (Traders Arena). It's a **Turborepo monorepo** using **pnpm workspaces**.

## Common Commands

### Development
```bash
pnpm db:up           # Start PostgreSQL + Redis via Docker (required first)
pnpm dev:all         # Start all services concurrently (DB + backend + worker + frontend)
pnpm dev:frontend    # Next.js frontend only (port 3000)
pnpm dev:backend     # Express backend only (port 4000)
pnpm dev:worker      # Ingestion worker only
```

### Code Quality
```bash
pnpm lint            # Lint all packages via Turborepo
pnpm check-types     # TypeScript check across all packages
pnpm format          # Prettier format (ts, tsx, md files)
```

### Database (run from repo root or `packages/db`)
```bash
pnpm --filter @repo/db migrate          # Create + run dev migration
pnpm --filter @repo/db migrate-deploy   # Apply migrations in production
pnpm --filter @repo/db dev              # Generate client + db push (no migration file)
```

### Build
```bash
pnpm build           # Build all apps via Turborepo
```

### FundLens (Indian mutual fund intelligence — see docs/fundlens/)
```bash
pnpm fundlens:up         # Start fundlens-scraper + fundlens-celery-worker + fundlens-api
pnpm fundlens:down       # Stop fundlens services
pnpm fundlens:logs       # Tail scraper + api logs
pnpm fundlens:migrate    # Run alembic upgrade head against fundlens schema
```
The fundlens services live behind a Docker Compose `fundlens` profile — `pnpm db:up`
intentionally only starts Postgres + Redis so the existing FinMate dev flow is
unchanged. Bring up fundlens only when working on it.

Frontend routes: `/fundlens`, `/fundlens/amc/[slug]`, `/fundlens/scheme/[slug]`,
`/fundlens/scheme/[slug]/diffs`, `/fundlens/stock/[isin]` (under `apps/frontend-web/app/(app)/fundlens/`).

API: Go service at `http://localhost:5000` — see `apps/fundlens-api/README.md`.
Scraper: Python service at `http://localhost:8001/health` — see `apps/fundlens-scraper/`.

## Architecture

### Monorepo Layout

```
apps/
  backend-api/          # Express 5 REST API — port 4000
  frontend-web/         # Next.js 14 App Router — port 3000
  ingestion-worker/     # RSS/article scraping cron worker
  arena-market-simulator/     # Trading simulation engine
  arena-agent-orchestrator/   # LLM agent orchestration (OpenRouter)
  fundlens-scraper/     # Python — ingests Indian mutual fund disclosures — port 8001 (/health)
  fundlens-api/         # Go + Fiber — read API for fundlens schema — port 5000
  chrome-extension/     # Vite + React extension

packages/
  db/                   # Single Prisma schema + generated client (shared by all backends)
  ui/                   # React component library (@repo/ui)
  shared-types/         # TypeScript types shared across apps
  arena-types/          # Traders Arena-specific types
  fundlens-types/       # TS contracts for the fundlens-api JSON envelope
  shared-utils/         # Utility functions
  eslint-config/        # ESLint configs (base, next-js, react-internal)
  typescript-config/    # TSConfig presets (base, nextjs, react-library)
```

### Key Architectural Decisions

- **`@repo/db`** is the single source of truth for the database schema and Prisma client. All backend apps import from here — never install Prisma directly in an app.
- **Frontend** uses Next.js App Router with TanStack React Query v5 for server state and better-auth for authentication (with OAuth support).
- **Backend** is a standalone Express 5 server (not Next.js API routes) running separately on port 4000. The frontend calls it via `NEXT_PUBLIC_API_URL`.
- **Turborepo task graph**: `build` and `lint` run dependencies first (`^build`, `^lint`). `dev` runs persistently with no caching.
- **Arena apps** (`arena-market-simulator`, `arena-agent-orchestrator`) are separate processes that communicate via the shared DB and Redis.
- **FundLens apps** (`fundlens-scraper`, `fundlens-api`) own the `fundlens` Postgres schema end-to-end. The Python scraper is the single writer (via Alembic in `apps/fundlens-scraper/alembic/versions/`); the Go API is the single reader (via sqlc). Prisma in `packages/db` does NOT manage the `fundlens` schema.

### Database Models (Prisma)

Schema lives at `packages/db/prisma/schema.prisma`. Key model groups (all in `public` schema):
- **Core**: `Article`, `Source` — finance news content
- **Auth**: `User`, `Session`, `Account`, `Verification` — managed by better-auth
- **Traders Arena**: `ArenaAgent`, `ArenaSimulation`, `ArenaParticipation`, `ArenaTrade`, `ArenaSnapshot`, `ArenaLeaderboard`, `MarketDataCache`

### FundLens schema (Alembic-managed, not Prisma)

The `fundlens` Postgres schema is owned by `apps/fundlens-scraper/alembic/versions/`. Tables:
`amc`, `fund_manager`, `scheme`, `holdings_snapshot`, `holding`, `holding_diff`,
`isin_master`, `nav`. The Go API (`apps/fundlens-api`) reads via sqlc-generated code in
`apps/fundlens-api/internal/db/` — schema snapshot for sqlc lives at
`apps/fundlens-api/internal/schema/schema.sql` (keep in sync with the Alembic migrations).

### Environment Variables

Each app has its own `.env`. Key variables:
- `DATABASE_URL` — PostgreSQL (all backend apps + `@repo/db`)
- `REDIS_URL` — Redis (backend, worker)
- `OPENROUTER_API_KEY` — AI features in Arena
- `NEXT_PUBLIC_API_URL` — Frontend → backend URL (default: `http://localhost:4000`)
- `FRONTEND_URL` — CORS origin in backend (default: `http://localhost:3000`)
- `FUNDLENS_DATABASE_URL`, `FUNDLENS_REDIS_URL` — connection strings for fundlens-scraper and fundlens-api (default to the same Docker postgres + redis as the rest of the monorepo)
- `NEXT_PUBLIC_FUNDLENS_API_URL` — Frontend → fundlens-api URL (default `http://localhost:5000`)

Copy `.env.example` to `.env` at repo root for shared vars, then set app-specific vars in each app's `.env` or `.env.local`.

### Deployment

- **Frontend** → Vercel (configured via `vercel.json`, build filter: `frontend-web`)
- **Backend + Worker** → Node.js host (Railway/Render/Fly.io); run `prisma migrate deploy` on deploy
- **Database** → Managed PostgreSQL (Neon/Supabase/Railway)
- Local dev uses Docker (`docker-compose.yml`) for Postgres + Redis
