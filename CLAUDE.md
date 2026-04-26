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

## Architecture

### Monorepo Layout

```
apps/
  backend-api/          # Express 5 REST API — port 4000
  frontend-web/         # Next.js 14 App Router — port 3000
  ingestion-worker/     # RSS/article scraping cron worker
  arena-market-simulator/     # Trading simulation engine
  arena-agent-orchestrator/   # LLM agent orchestration (OpenRouter)
  chrome-extension/           # Vite + React extension

packages/
  db/                   # Single Prisma schema + generated client (shared by all backends)
  ui/                   # React component library (@repo/ui)
  shared-types/         # TypeScript types shared across apps
  arena-types/          # Traders Arena-specific types
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

### Database Models (Prisma)

Schema lives at `packages/db/prisma/schema.prisma`. Key model groups:
- **Core**: `Article`, `Source` — finance news content
- **Auth**: `User`, `Session`, `Account`, `Verification` — managed by better-auth
- **Traders Arena**: `ArenaAgent`, `ArenaSimulation`, `ArenaParticipation`, `ArenaTrade`, `ArenaSnapshot`, `ArenaLeaderboard`, `MarketDataCache`

### Environment Variables

Each app has its own `.env`. Key variables:
- `DATABASE_URL` — PostgreSQL (all backend apps + `@repo/db`)
- `REDIS_URL` — Redis (backend, worker)
- `OPENROUTER_API_KEY` — AI features in Arena
- `NEXT_PUBLIC_API_URL` — Frontend → backend URL (default: `http://localhost:4000`)
- `FRONTEND_URL` — CORS origin in backend (default: `http://localhost:3000`)

Copy `.env.example` to `.env` at repo root for shared vars, then set app-specific vars in each app's `.env` or `.env.local`.

### Deployment

- **Frontend** → Vercel (configured via `vercel.json`, build filter: `frontend-web`)
- **Backend + Worker** → Node.js host (Railway/Render/Fly.io); run `prisma migrate deploy` on deploy
- **Database** → Managed PostgreSQL (Neon/Supabase/Railway)
- Local dev uses Docker (`docker-compose.yml`) for Postgres + Redis
