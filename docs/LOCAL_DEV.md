# Running FinMate Locally

Get the full stack running on your machine in under 10 minutes.

---

## What You Need

| Tool | Version | Check |
|---|---|---|
| Node.js | ≥ 18 | `node -v` |
| pnpm | 9.x | `pnpm -v` |
| Docker Desktop | any recent | `docker -v` |
| Git | any | `git -v` |

> **Docker Desktop must be running** before any of the steps below.

---

## First-Time Setup

Do this once. Skip on subsequent runs.

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment files

Copy the root example and the backend example:

```bash
cp .env.example .env
cp apps/backend-api/.env.example apps/backend-api/.env
```

Create the frontend env file:

```bash
# apps/frontend-web/.env.local
echo 'NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=local-dev-secret-change-in-production' > apps/frontend-web/.env.local
```

The root `.env` already has the correct local values — no changes needed for local dev:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/finmate"
REDIS_URL="redis://localhost:6379"
FRONTEND_URL="http://localhost:3000"
```

### 3. Start the database and Redis

```bash
pnpm db:up
```

This starts PostgreSQL on port **5432** and Redis on port **6379** via Docker Compose. First run downloads the images (~400 MB total), subsequent runs are instant.

Wait for:
```
finmate-postgres  | database system is ready to accept connections
```

### 4. Run database migrations

```bash
pnpm --filter @repo/db migrate
```

When prompted for a migration name, press **Enter** (or type anything — it only creates a new file if there are schema changes, otherwise it just applies pending migrations).

Expected:
```
All migrations have been successfully applied.
```

### 5. Generate the Prisma client

```bash
pnpm --filter @repo/db build
```

Expected: `✔ Generated Prisma Client`

---

## Starting the Stack

### Option A — Everything at once (recommended for demo)

```bash
pnpm dev:all
```

This concurrently starts the backend, frontend, and ingestion worker. All logs appear in the same terminal, colour-coded by service.

### Option B — Each service in its own terminal (easier to read logs)

**Terminal 1 — Database** (keep running from First-Time Setup, or restart):
```bash
pnpm db:up
```

**Terminal 2 — Backend API**:
```bash
pnpm dev:backend
```

Wait for: `Server running on port 4000`

**Terminal 3 — Ingestion Worker**:
```bash
pnpm dev:worker
```

Wait for: `Scheduler started` then article ingestion logs.

**Terminal 4 — Frontend**:
```bash
pnpm dev:frontend
```

Wait for: `✓ Ready in Xms` then open **http://localhost:3000**

---

## Verify Everything is Working

| Check | How |
|---|---|
| Database up | `docker ps` → see `finmate-postgres` and `finmate-redis` |
| Backend healthy | `curl http://localhost:4000/health` → `{"status":"ok"}` |
| Articles ingested | `curl http://localhost:4000/feed?limit=3` → JSON array of articles |
| Frontend loads | Open **http://localhost:3000** → feed renders |
| Trending topics | Feed page shows horizontal tag chips (needs articles in DB) |
| Market bar | FiltersPanel shows live S&P/Nasdaq/BTC prices |
| Search works | Go to **/search** → type "inflation" → results appear |
| Auth works | Go to **/signup** → create account → session persists |
| History works | Open an article, read for 10+ seconds, go back → check **/history** |

> **Feed is empty on first run?** The ingestion worker runs on a 15-minute cron. Either wait for the first cycle or trigger it manually:
> ```bash
> pnpm --filter ingestion-worker run-once
> ```
> This runs a single ingestion pass immediately and exits.

---

## Service Map

| Service | URL | What it does |
|---|---|---|
| Frontend | http://localhost:3000 | Next.js web app |
| Backend API | http://localhost:4000 | Express REST API |
| PostgreSQL | localhost:5432 | Main database |
| Redis | localhost:6379 | Pub/sub for live feed + market data cache |
| Ingestion Worker | — (no port) | RSS cron — fetches articles every 15 min |

---

## Useful Commands

```bash
# Stop the database and Redis (data is preserved in Docker volumes)
pnpm db:down             # or: docker compose down

# Wipe all data and start fresh (useful if DB is in a bad state)
docker compose down -v   # -v removes the volumes (deletes all data)
pnpm db:up
pnpm --filter @repo/db migrate

# Run a single ingestion pass right now (don't wait for cron)
pnpm --filter ingestion-worker run-once

# TypeScript check across all packages
pnpm check-types

# Format code
pnpm format

# View backend logs live (if running via dev:all)
# Logs are pino JSON — pipe through pino-pretty for readability:
pnpm dev:backend | npx pino-pretty
```

---

## Accounts for the Demo

better-auth stores sessions in the database. For the demo, sign up a fresh account at **/signup** — no email verification is required in local dev.

If you want to pre-seed a demo user via SQL:

```bash
# Open a psql shell into the running container
docker exec -it finmate-postgres psql -U postgres -d finmate
```

```sql
-- Check existing users
SELECT id, name, email FROM "User";
```

---

## Troubleshooting

**`pnpm install` fails with peer dep errors**
```bash
pnpm install --no-strict-peer-dependencies
```

**`Cannot connect to database` on backend startup**
Docker isn't running or the container crashed. Run `docker ps` — if `finmate-postgres` isn't listed, run `pnpm db:up` again.

**`DIRECT_URL` env var missing error from Prisma**
Add this to your root `.env`:
```
DIRECT_URL="postgresql://postgres:password@localhost:5432/finmate"
```

**Frontend shows `NEXT_PUBLIC_API_URL` undefined / fetch errors in console**
Make sure `apps/frontend-web/.env.local` exists with `NEXT_PUBLIC_API_URL=http://localhost:4000`. Next.js needs a restart after env file changes.

**Port already in use**
```bash
# Find and kill what's on port 4000
npx kill-port 4000
# or for 3000:
npx kill-port 3000
```

**Prisma client out of sync after schema change**
```bash
pnpm --filter @repo/db migrate
pnpm --filter @repo/db build
```
