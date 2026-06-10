# Docker + Render Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Containerise the backend API and ingestion worker, validate both locally, then deploy them to Render as Docker services backed by Supabase PostgreSQL and Upstash Redis.

**Architecture:** Each app gets its own multi-stage Dockerfile that uses `turbo prune` to create a minimal monorepo slice before building, keeping images lean. A root `render.yaml` declares both services as Infrastructure as Code so deployment is repeatable. The frontend (already on Vercel) just needs its `NEXT_PUBLIC_API_URL` env var updated to point at the live Render backend URL.

**Tech Stack:** Docker (multi-stage, Alpine), Turborepo `prune`, pnpm 9, Node 20, Render (Web Service + Background Worker), Supabase PostgreSQL, Upstash Redis (free tier)

---

## File Map

### New Files

| File | Purpose |
|---|---|
| `apps/backend-api/Dockerfile` | Multi-stage build for the Express API |
| `apps/ingestion-worker/Dockerfile` | Multi-stage build for the cron worker |
| `.dockerignore` | Prevents `node_modules`, `.git`, `.next` etc. from entering build context |
| `render.yaml` | Render Infrastructure-as-Code — declares both services |

### Modified Files

| File | Change |
|---|---|
| `packages/db/prisma/schema.prisma` | Add `binaryTargets` (Alpine engine) + `directUrl` (Supabase migration URL) |

---

## Task 1: Prepare Prisma Schema for Docker + Supabase

**Files:**
- Modify: `packages/db/prisma/schema.prisma` (lines 1–8)

Prisma ships platform-specific query engine binaries. Alpine Linux uses `musl` libc — if we don't declare this target the container crashes at startup with "binary not found". Supabase also requires a `directUrl` (bypassing pgBouncer) for migrations to work.

- [ ] **Step 1: Update the generator and datasource blocks**

Open `packages/db/prisma/schema.prisma`. Replace lines 1–8:

```prisma
generator client {
  provider      = "prisma-client-js"
  output        = "../src/generated/client"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

> `native` keeps local dev working. `linux-musl-openssl-3.0.x` is the Alpine 3.17+ target. `directUrl` is used only by `prisma migrate` — not by runtime queries. Supabase's pooler URL (port 6543) doesn't support the migration protocol, so migrations must go through the direct connection (port 5432).

- [ ] **Step 2: Regenerate the Prisma client locally**

```bash
pnpm --filter @repo/db build
```

Expected: `✔ Generated Prisma Client` with no errors.

- [ ] **Step 3: Update your local .env to add DIRECT_URL**

Open `packages/db/.env` (or the repo root `.env` — wherever `DATABASE_URL` is currently set). Add:

```env
# Same value as DATABASE_URL for local dev (no pgBouncer locally)
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/finmate"
```

- [ ] **Step 4: Verify nothing broke locally**

```bash
pnpm check-types
```

Expected: `Tasks: N successful` with 0 errors.

- [ ] **Step 5: Commit**

```bash
git add packages/db/prisma/schema.prisma
git commit -m "feat(db): add Alpine binary target and directUrl for Supabase + Docker compatibility"
```

---

## Task 2: Root .dockerignore

**Files:**
- Create: `.dockerignore` (repo root)

Without this, Docker sends the entire `node_modules` (often 500 MB+) and `.git` to the build daemon on every build. This makes every build slow.

- [ ] **Step 1: Create .dockerignore**

Create `.dockerignore` at the repo root:

```
# Dependencies — reinstalled inside the container
node_modules
**/node_modules

# Build outputs — rebuilt inside the container
dist
**/.next
**/dist

# Git and tooling
.git
.gitignore
.turbo

# Local env files — secrets must come from environment variables
.env
.env.*
**/.env
**/.env.*

# Docs and plans — not needed at runtime
docs
logs
*.md
!README.md

# OS noise
.DS_Store
Thumbs.db
```

- [ ] **Step 2: Verify the ignore file is respected**

From the repo root run a dry-run build context size check:

```bash
docker build --no-cache --progress=plain -f apps/backend-api/Dockerfile . 2>&1 | head -5
```

Expected: The first lines show `=> [internal] load build context` — the size should be under 50 MB. If it shows hundreds of MB, the `.dockerignore` is not in the right directory (must be alongside the `Dockerfile`'s context, i.e., the root).

> **Note:** We're passing `.` (the repo root) as the Docker context for both Dockerfiles so that `turbo prune` can see the entire monorepo. The `.dockerignore` at the root applies to this context.

- [ ] **Step 3: Commit**

```bash
git add .dockerignore
git commit -m "chore: add root .dockerignore to exclude node_modules and build artifacts from Docker context"
```

---

## Task 3: Backend API Dockerfile

**Files:**
- Create: `apps/backend-api/Dockerfile`

This is a 4-stage build: `pruner` → `installer` → `builder` → `runner`.

- [ ] **Step 1: Create the Dockerfile**

Create `apps/backend-api/Dockerfile`:

```dockerfile
# ── Stage 1: Prune monorepo to only what backend-api needs ──────────────────
FROM node:20-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo@2
WORKDIR /app
COPY . .
RUN turbo prune backend-api --docker

# ── Stage 2: Install dependencies from the pruned lockfile ──────────────────
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@9
WORKDIR /app

# Copy pruned package.json files first — layer-cached unless deps change
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# ── Stage 3: Build TypeScript ────────────────────────────────────────────────
FROM installer AS builder
WORKDIR /app
COPY --from=pruner /app/out/full/ .

# Generate Prisma client for the correct platform (Alpine linux-musl)
RUN pnpm --filter @repo/db build

# Compile TypeScript → dist/
RUN pnpm --filter backend-api build

# ── Stage 4: Minimal production image ───────────────────────────────────────
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production

# Copy compiled output
COPY --from=builder /app/apps/backend-api/dist ./apps/backend-api/dist

# Copy the generated Prisma client (contains the platform-specific engine binary)
COPY --from=builder /app/packages/db/src/generated ./packages/db/src/generated

# Copy node_modules (pnpm hoists most deps to the root)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend-api/node_modules ./apps/backend-api/node_modules
COPY --from=builder /app/packages/db/node_modules ./packages/db/node_modules

EXPOSE 4000
CMD ["node", "apps/backend-api/dist/server.js"]
```

- [ ] **Step 2: Build the image locally**

Run from the repo root (`.` is the context):

```bash
docker build -f apps/backend-api/Dockerfile -t finmate-backend:local .
```

Expected: `=> exporting to image` then `Successfully tagged finmate-backend:local`. Build should take 2–4 minutes first time. Subsequent builds are fast due to layer caching.

If you see `turbo: command not found`, ensure you are running from the repo root and Docker can see the `.dockerignore`.

- [ ] **Step 3: Verify the image exists**

```bash
docker images finmate-backend
```

Expected: one row with `finmate-backend  local  <id>  <size>`. Image should be under 400 MB.

- [ ] **Step 4: Commit**

```bash
git add apps/backend-api/Dockerfile
git commit -m "feat(backend): add multi-stage Dockerfile with turbo prune for Render deployment"
```

---

## Task 4: Ingestion Worker Dockerfile

**Files:**
- Create: `apps/ingestion-worker/Dockerfile`

Same 4-stage pattern. The worker has no HTTP port — it's a long-running process that runs cron jobs.

- [ ] **Step 1: Create the Dockerfile**

Create `apps/ingestion-worker/Dockerfile`:

```dockerfile
# ── Stage 1: Prune monorepo ──────────────────────────────────────────────────
FROM node:20-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN npm install -g turbo@2
WORKDIR /app
COPY . .
RUN turbo prune ingestion-worker --docker

# ── Stage 2: Install dependencies ───────────────────────────────────────────
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@9
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

# ── Stage 3: Build ───────────────────────────────────────────────────────────
FROM installer AS builder
WORKDIR /app
COPY --from=pruner /app/out/full/ .

RUN pnpm --filter @repo/db build
RUN pnpm --filter ingestion-worker build

# ── Stage 4: Production image ────────────────────────────────────────────────
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/ingestion-worker/dist ./apps/ingestion-worker/dist

# The worker reads RSS source config at runtime
COPY --from=builder /app/apps/ingestion-worker/config ./apps/ingestion-worker/config

COPY --from=builder /app/packages/db/src/generated ./packages/db/src/generated

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/ingestion-worker/node_modules ./apps/ingestion-worker/node_modules
COPY --from=builder /app/packages/db/node_modules ./packages/db/node_modules

CMD ["node", "apps/ingestion-worker/dist/index.js"]
```

- [ ] **Step 2: Build the image locally**

```bash
docker build -f apps/ingestion-worker/Dockerfile -t finmate-worker:local .
```

Expected: `Successfully tagged finmate-worker:local`. Under 350 MB.

- [ ] **Step 3: Commit**

```bash
git add apps/ingestion-worker/Dockerfile
git commit -m "feat(worker): add multi-stage Dockerfile with turbo prune for Render deployment"
```

---

## Task 5: Set Up Supabase PostgreSQL

This task has no code changes — it's pure cloud setup. The output is two connection strings you'll need for every subsequent step.

- [ ] **Step 1: Create a Supabase project**

1. Go to [supabase.com](https://supabase.com) → New project
2. Choose a region close to your users (e.g., `ap-south-1` for India)
3. Set a strong database password — save it, you'll need it
4. Wait ~2 minutes for provisioning

- [ ] **Step 2: Get your connection strings**

Go to **Project Settings → Database → Connection string**.

Copy two strings:

**`DATABASE_URL`** — the **Transaction pooler** URL (port 6543). Used by the running app:
```
postgresql://postgres.xxxxxxxxxxxx:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**`DIRECT_URL`** — the **Direct connection** URL (port 5432). Used only by `prisma migrate`:
```
postgresql://postgres.xxxxxxxxxxxx:[PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
```

Store both somewhere safe (e.g., a local `.env.supabase` file that's git-ignored).

- [ ] **Step 3: Run migrations against Supabase**

Set the env vars in your shell temporarily and run the migration deploy command:

```bash
DATABASE_URL="<pooler-url>" \
DIRECT_URL="<direct-url>" \
pnpm --filter @repo/db exec prisma migrate deploy
```

Expected output:
```
Applying migration `20251130095937_`
Applying migration `20251130125019_user`
Applying migration `20251207115744_auth_init`
Applying migration `20260109190648_add_arena_models`
Applying migration `20260426000001_article_fulltext_index`
Applying migration `20260426000002_add_read_history`

All migrations have been successfully applied.
```

If a migration errors saying a table already exists (the `ReadHistory` case from earlier), run:
```bash
DIRECT_URL="<direct-url>" \
DATABASE_URL="<pooler-url>" \
pnpm --filter @repo/db exec prisma migrate resolve --applied 20260426000002_add_read_history
```

- [ ] **Step 4: Verify the schema in Supabase**

Go to **Table Editor** in the Supabase dashboard. You should see: `Article`, `Source`, `User`, `Session`, `Account`, `Verification`, `ArenaAgent`, `ArenaSimulation`, `ArenaParticipation`, `ArenaTrade`, `ArenaSnapshot`, `ArenaLeaderboard`, `MarketDataCache`, `ReadHistory`.

---

## Task 6: Set Up Upstash Redis

- [ ] **Step 1: Create a free Redis database**

1. Go to [console.upstash.com](https://console.upstash.com) → Create Database
2. Name: `finmate-redis`
3. Region: same region as your Supabase project (e.g., `ap-south-1`)
4. Type: **Regional** (not Global — cheaper and lower latency for a single-region app)
5. TLS: **Enabled** (required for production)

- [ ] **Step 2: Copy the Redis URL**

From the database details page, copy the **Redis URL**. It looks like:

```
rediss://default:AbCdEfGhIjKlMnOpQrStUvWxYz@ap1-xxx-yyy.upstash.io:6379
```

Note the `rediss://` scheme (double-s) — that's TLS. ioredis supports this natively, no config change needed.

---

## Task 7: Test Backend Container Locally Against Supabase + Upstash

Before deploying to Render, prove the container works against the real cloud services.

- [ ] **Step 1: Create a local Docker env file**

Create `.env.docker` at the repo root (this file is already in `.dockerignore` so it won't leak into images):

```env
DATABASE_URL=postgresql://postgres.xxxxxxxxxxxx:[PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.xxxxxxxxxxxx:[PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
REDIS_URL=rediss://default:[TOKEN]@ap1-xxx-yyy.upstash.io:6379
FRONTEND_URL=http://localhost:3000
NODE_ENV=production
PORT=4000
```

- [ ] **Step 2: Run the backend container**

```bash
docker run --rm -p 4000:4000 --env-file .env.docker finmate-backend:local
```

Expected: the server starts with no crash. You'll see pino JSON logs:
```json
{"level":30,"msg":"Server running on port 4000"}
```

- [ ] **Step 3: Hit the health endpoint**

In a new terminal:

```bash
curl http://localhost:4000/health
```

Expected: `{"status":"ok"}`

- [ ] **Step 4: Hit the feed endpoint**

```bash
curl "http://localhost:4000/feed?limit=5"
```

Expected: a JSON array. If the array is empty that's fine — Supabase DB is fresh with no articles yet. What matters is no 500 error.

- [ ] **Step 5: Stop the container**

`Ctrl+C` in the docker run terminal.

---

## Task 8: Test Ingestion Worker Container Locally

- [ ] **Step 1: Run the worker container**

```bash
docker run --rm --env-file .env.docker finmate-worker:local
```

Expected log output (pino JSON):
```json
{"level":30,"msg":"Scheduler started with N sources"}
{"level":30,"msg":"[MarketWatch] fetched 15 items"}
{"level":30,"msg":"[CNBC Finance] fetched 8 items"}
...
```

The worker won't exit — it keeps running and fires cron jobs. The first cycle runs immediately on startup for most cron configurations.

- [ ] **Step 2: Verify articles appear in Supabase**

Wait ~30 seconds after the first cron fires. Open **Supabase Table Editor → Article**. You should see rows appearing.

- [ ] **Step 3: Re-test the backend feed endpoint**

```bash
curl "http://localhost:4000/feed?limit=5"
```

Expected: now returns articles that were just ingested by the worker. This confirms both containers can talk to the same Supabase DB.

- [ ] **Step 4: Stop the worker**

`Ctrl+C`.

- [ ] **Step 5: Commit .env.docker to .gitignore (safety check)**

Verify `.env.docker` is not tracked:

```bash
git status
```

Expected: `.env.docker` does NOT appear in the output (it's covered by `.env.*` in `.dockerignore` and should also be in `.gitignore`). If it appears, add it:

```bash
echo ".env.docker" >> .gitignore
git add .gitignore
git commit -m "chore: ensure .env.docker is git-ignored"
```

---

## Task 9: render.yaml — Infrastructure as Code

**Files:**
- Create: `render.yaml` (repo root)

- [ ] **Step 1: Create render.yaml**

Create `render.yaml` at the repo root:

```yaml
services:
  # ── Backend API ─────────────────────────────────────────────────────────────
  - type: web
    name: finmate-backend
    runtime: docker
    dockerfilePath: apps/backend-api/Dockerfile
    dockerContext: .
    region: oregon   # change to: singapore, frankfurt, ohio — pick closest to users
    plan: free       # upgrade to starter ($7/mo) to avoid 15-min spin-down
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: "4000"
      - key: DATABASE_URL
        sync: false   # set manually in Render dashboard — never commit secrets
      - key: DIRECT_URL
        sync: false
      - key: REDIS_URL
        sync: false
      - key: FRONTEND_URL
        sync: false   # set to your Vercel URL after frontend deploys

  # ── Ingestion Worker ─────────────────────────────────────────────────────────
  - type: worker
    name: finmate-ingestion-worker
    runtime: docker
    dockerfilePath: apps/ingestion-worker/Dockerfile
    dockerContext: .
    region: oregon
    plan: free
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        sync: false
      - key: DIRECT_URL
        sync: false
      - key: REDIS_URL
        sync: false
```

> **Note on `plan: free`:** Render's free tier spins web services down after 15 minutes of inactivity. For the backend API this means a ~30s cold start on the first request. For the ingestion worker (type: `worker`) there is no spin-down — background workers stay alive on the free tier. If cold starts are unacceptable for the API, upgrade to the `starter` plan ($7/mo).

- [ ] **Step 2: Commit**

```bash
git add render.yaml
git commit -m "feat(infra): add render.yaml declaring backend web service and ingestion worker"
```

---

## Task 10: Deploy to Render

- [ ] **Step 1: Push staging branch**

```bash
git push origin staging
```

- [ ] **Step 2: Connect repo to Render**

1. Go to [dashboard.render.com](https://dashboard.render.com) → New → Blueprint
2. Connect your GitHub account if not already connected
3. Select the `StarLord824/finmate.dev` repo
4. Render detects `render.yaml` and previews the two services
5. Click **Apply**

- [ ] **Step 3: Set secret env vars in Render dashboard**

For **both** services, go to **Environment** tab and add:

| Key | Value |
|---|---|
| `DATABASE_URL` | Your Supabase pooler URL |
| `DIRECT_URL` | Your Supabase direct URL |
| `REDIS_URL` | Your Upstash Redis URL |

For **finmate-backend** only, also add:

| Key | Value |
|---|---|
| `FRONTEND_URL` | `https://your-app.vercel.app` (your actual Vercel URL) |

- [ ] **Step 4: Trigger first deploy**

Render auto-deploys on every push once connected. If it hasn't started, click **Manual Deploy → Deploy latest commit** for each service.

Watch the build logs. Expected sequence:
```
==> Building Docker image...
==> Running turbo prune...
==> Installing dependencies...
==> Generating Prisma Client...
==> Compiling TypeScript...
==> Build succeeded 🎉
==> Starting service...
```

- [ ] **Step 5: Verify backend is live**

Once the backend shows **Live** status in the Render dashboard, note your service URL (e.g., `https://finmate-backend.onrender.com`). Hit the health endpoint:

```bash
curl https://finmate-backend.onrender.com/health
```

Expected: `{"status":"ok"}`

- [ ] **Step 6: Verify worker is running**

In the Render dashboard for `finmate-ingestion-worker`, check the **Logs** tab. You should see the scheduler start logs and then ingestion logs every 15 minutes.

Also verify in **Supabase Table Editor → Article** that rows are being added.

---

## Task 11: Wire Frontend to Production Backend

- [ ] **Step 1: Update NEXT_PUBLIC_API_URL in Vercel**

1. Go to your Vercel project dashboard → **Settings → Environment Variables**
2. Find `NEXT_PUBLIC_API_URL` (or add it if missing)
3. Set value to: `https://finmate-backend.onrender.com` (your actual Render URL)
4. Apply to: **Production** + **Preview**

- [ ] **Step 2: Redeploy the frontend**

In Vercel, go to **Deployments → Redeploy** the latest deployment (so the new env var takes effect).

Or push a trivial commit to trigger a new build:

```bash
git commit --allow-empty -m "chore: trigger vercel redeploy for new API URL"
git push origin staging
```

- [ ] **Step 3: Smoke test the full stack end-to-end**

Open your Vercel deployment URL in a browser.

Checklist:
- [ ] Feed loads articles (served by Render backend, data from Supabase)
- [ ] Search works
- [ ] Article detail page opens
- [ ] Trending topics bar appears with real tags
- [ ] MarketBar shows live prices
- [ ] Sign up / sign in works (better-auth stores sessions in Supabase)
- [ ] Bookmarks work (requires auth)

If the feed is empty: the ingestion worker may not have run a full cycle yet. Wait up to 15 minutes and refresh.

---

## Final Checklist

- [ ] `pnpm check-types` — 0 errors
- [ ] Both Docker images build cleanly locally
- [ ] Backend container returns `{"status":"ok"}` from `/health` with Supabase + Upstash
- [ ] Worker container ingests articles into Supabase within 15 minutes
- [ ] Render dashboard shows both services as **Live** / **Running**
- [ ] Vercel frontend calls production Render backend successfully
- [ ] No secrets committed to git (`.env.docker` is git-ignored)
