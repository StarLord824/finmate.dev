# FundLens — Local Development Runbook

## Prerequisites

- Docker Desktop running (for Postgres + Redis)
- `pnpm` installed
- `uv` installed (for Python scraper)
- `sqlc` installed (for Go API codegen — `go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest`)
- Go 1.23+

## Quick Start

```bash
# 1. Start Postgres + Redis
pnpm db:up

# 2. Start FundLens services (scraper, celery worker, go API)
pnpm fundlens:up

# 3. Run Alembic migrations (creates fundlens schema + seeds top-5 AMCs)
pnpm fundlens:migrate

# 4. Start the Next.js frontend
pnpm dev:frontend

# 5. Open the browser
open http://localhost:3000/fundlens
```

## Verify the API is running

```bash
# Health check
curl http://localhost:5000/fundlens/api/v1/health | jq

# List AMCs (should show 5 seeded AMCs)
curl http://localhost:5000/fundlens/api/v1/amcs | jq '.data | length'

# Scraper health
curl http://localhost:8001/health | jq
```

## Run the PPFAS scraper manually

```bash
# Inside the running scraper container:
docker compose exec fundlens-scraper fundlens-scraper run --amc ppfas-mf

# Or locally with uv (requires FUNDLENS_DATABASE_URL set):
cd apps/fundlens-scraper
FUNDLENS_DATABASE_URL=postgresql://postgres:password@localhost:5432/finmate \
  uv run fundlens-scraper run --amc ppfas-mf
```

After the scraper runs, verify holdings were stored:

```bash
curl http://localhost:5000/fundlens/api/v1/schemes/ppfas-flexi-cap-fund/holdings | jq '.data | length'
```

## Run tests

```bash
# Python scraper tests (no Docker needed for most):
cd apps/fundlens-scraper
uv run pytest --ignore=tests/test_persistence.py -v

# Persistence test (requires Docker):
uv run pytest tests/test_persistence.py -v

# Go API:
cd apps/fundlens-api
go test ./...

# Frontend type check:
pnpm --filter frontend-web check-types
```

## Add a new AMC scraper

1. Create `apps/fundlens-scraper/src/fundlens_scraper/scrapers/<amc_slug>.py`
2. Implement `AbstractAmcScraper` protocol (see `scrapers/ppfas.py` for a Tier 1 example)
3. Use `@register("<amc_slug>")` decorator on the class
4. Add a seed migration: `apps/fundlens-scraper/alembic/versions/000N_seed_<amc>.py`
5. Add a cron job in `jobs.py` (follow the `_run_scrape_ppfas` pattern)
6. Run `pnpm fundlens:migrate` to apply the seed

## Common issues

**`fundlens-api` container exits immediately:** Check `FUNDLENS_DATABASE_URL` env var in docker-compose.
**Scraper `persist.scheme_not_seeded` errors:** Run `pnpm fundlens:migrate` to seed the AMC/scheme rows.
**Frontend shows "AMC data loading":** Ensure `fundlens-api` is running on port 5000. Set `NEXT_PUBLIC_FUNDLENS_API_URL=http://localhost:5000` in `.env.local`.
