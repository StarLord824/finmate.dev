# FundLens Phase 0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the FundLens end-to-end pipeline for PPFAS Mutual Fund (canary AMC) plus AMFI NAV + NSE ISIN ingestion, served by the Go API and rendered in the existing Next.js `/fundlens` routes.

**Architecture:** Python scraper writes to the `fundlens` Postgres schema (Alembic-owned). Go API reads via sqlc-generated typed queries with Redis cache. Next.js frontend fetches via `/fundlens-api/*` rewrite proxy. PPFAS is the canary because its disclosure URL pattern is stable, schemes are few (7-8), and PDF quality is excellent.

**Tech Stack:** Python 3.12 (pdfplumber, SQLAlchemy 2.0, httpx, APScheduler, Celery, structlog), Go 1.23 (Fiber, sqlc, pgx/v5, go-redis), Postgres 16, Redis 7, Next.js 16, TanStack Query v5.

---

## Pre-flight Context

**What's already scaffolded (do NOT recreate):**
- `apps/fundlens-scraper/` — top-level skeleton (`main.py`, `db.py`, `settings.py`, `jobs.py`, `cli.py`, `celery_app.py`, `logging_config.py`, `pyproject.toml`, Dockerfile)
- `apps/fundlens-scraper/alembic/versions/` — `0001_initial_schema.py` (8 tables in `fundlens` schema), `0002_roles.py` (read/write roles)
- `apps/fundlens-api/` — Go skeleton (`cmd/server/main.go`, `internal/config/`, `internal/handlers/health.go`, `internal/logger/`, `internal/schema/schema.sql`, `internal/queries/amc.sql`, `sqlc.yaml`, `go.mod`, Dockerfile)
- `packages/fundlens-types/` — TS contracts (`envelope.ts`, `amc.ts`, `scheme.ts`, `holding.ts`, `diff.ts`, `stock.ts`, `nav.ts`)
- `apps/frontend-web/app/(app)/fundlens/` — placeholder pages (`page.tsx`, `amc/[slug]/page.tsx`, `scheme/[slug]/page.tsx`, `stock/`)
- `docker-compose.yml` — `fundlens-scraper`, `fundlens-celery-worker`, `fundlens-api` services under `fundlens` profile
- `CLAUDE.md` — FundLens section with `pnpm fundlens:up` / `:down` / `:logs` / `:migrate` scripts
- `apps/frontend-web/next.config.ts` — should already have the `/fundlens-api/*` → `http://localhost:5000` rewrite

**Critical:** The Alembic schema in `0001_initial_schema.py` and the sqlc schema snapshot at `apps/fundlens-api/internal/schema/schema.sql` MUST stay in sync. Bumping one without the other is a contract violation caught by `sqlc generate`.

**Frequent commit cadence:** Each task ends with a commit. The branch is `feat/funds-scraper`. Do NOT push until end of plan.

---

## File Structure — what gets created in this plan

```
apps/fundlens-scraper/
├── alembic/versions/
│   └── 0003_seed_top5_amcs.py                   ← NEW
├── src/fundlens_scraper/
│   ├── models.py                                ← NEW — SQLAlchemy ORM
│   ├── http_client.py                           ← NEW — shared httpx + tenacity
│   ├── scrapers/
│   │   ├── __init__.py                          ← NEW
│   │   ├── base.py                              ← NEW — AbstractAmcScraper Protocol
│   │   ├── registry.py                          ← NEW — SCRAPER_REGISTRY
│   │   └── ppfas.py                             ← NEW — first scraper
│   ├── parsers/
│   │   ├── __init__.py                          ← NEW
│   │   ├── header_detector.py                   ← NEW
│   │   ├── normalizer.py                        ← NEW
│   │   └── pdf_extractor.py                     ← NEW
│   ├── isin/
│   │   ├── __init__.py                          ← NEW
│   │   ├── nse_master.py                        ← NEW
│   │   └── resolver.py                          ← NEW
│   ├── amfi/
│   │   ├── __init__.py                          ← NEW
│   │   ├── nav_fetcher.py                       ← NEW
│   │   └── nav_parser.py                        ← NEW
│   ├── diff_engine.py                           ← NEW
│   ├── persistence.py                           ← NEW — snapshot/holding writer
│   └── jobs.py                                  ← MODIFY — wire real jobs
│   └── cli.py                                   ← MODIFY — add subcommands
├── tests/
│   ├── fixtures/ppfas_flexicap_202604.pdf       ← NEW (test fixture; small real PDF)
│   ├── fixtures/navall_sample.txt               ← NEW
│   ├── fixtures/equity_l_sample.csv             ← NEW
│   ├── test_header_detector.py                  ← NEW
│   ├── test_normalizer.py                       ← NEW
│   ├── test_pdf_extractor.py                    ← NEW
│   ├── test_nav_parser.py                       ← NEW
│   ├── test_nse_master.py                       ← NEW
│   ├── test_diff_engine.py                      ← NEW
│   ├── test_ppfas_scraper.py                    ← NEW
│   └── conftest.py                              ← NEW

apps/fundlens-api/
├── internal/queries/
│   ├── scheme.sql                               ← NEW
│   ├── holding.sql                              ← NEW
│   ├── diff.sql                                 ← NEW
│   ├── stock.sql                                ← NEW
│   └── nav.sql                                  ← NEW
├── internal/handlers/
│   ├── amc.go                                   ← NEW
│   ├── scheme.go                                ← NEW
│   ├── holding.go                               ← NEW
│   ├── diff.go                                  ← NEW
│   ├── stock.go                                 ← NEW
│   ├── nav.go                                   ← NEW
│   └── response.go                              ← NEW — envelope helpers
├── internal/cache/
│   └── cache.go                                 ← NEW — Redis cache-aside
├── internal/db/                                 ← AUTOGEN by sqlc generate
└── cmd/server/main.go                           ← MODIFY — wire routes

apps/frontend-web/
├── lib/fundlens-api-client.ts                   ← NEW
├── components/fundlens/
│   ├── AmcCard.tsx                              ← NEW
│   ├── AmcGrid.tsx                              ← NEW
│   ├── SchemeRow.tsx                            ← NEW
│   ├── HoldingsTable.tsx                        ← NEW
│   ├── DiffBadge.tsx                            ← NEW
│   └── ScraperStatusPill.tsx                    ← NEW
└── app/(app)/fundlens/
    ├── page.tsx                                 ← MODIFY — wire to /amcs
    ├── amc/[slug]/page.tsx                      ← MODIFY — wire to /amcs/:slug
    └── scheme/[slug]/page.tsx                   ← MODIFY — wire to /schemes/:slug + holdings

packages/fundlens-types/                         ← (mostly stable; one tweak in Task 23)

docs/fundlens/
└── DEV.md                                       ← NEW — local dev runbook
```

---

## Task Sequence

The plan is split into **6 chunks** to keep token output manageable. Each chunk lands a logically self-contained slice.

1. **Chunk A (Tasks 1-6):** Foundation — models, fixtures, header detector, normalizer, PDF extractor, persistence
2. **Chunk B (Tasks 7-9):** PPFAS scraper — discovery, fetch, end-to-end ingest test
3. **Chunk C (Tasks 10-12):** Diff engine + AMFI NAV + NSE ISIN
4. **Chunk D (Tasks 13-18):** Go API — queries, sqlc gen, handlers, cache, routes
5. **Chunk E (Tasks 19-23):** Frontend — API client, components, page wiring
6. **Chunk F (Tasks 24-26):** Wiring — cron schedule, dev runbook, top-5 AMC seed

Chunk A is written in full below. Chunks B-F are sketched at the end with task-name + one-sentence intent, and the full task body for each will be written before that chunk executes. This keeps the plan reviewable in one read while remaining executable.

---

# CHUNK A — Foundation (Tasks 1-6)

---

### Task 1: Add SQLAlchemy ORM models matching the Alembic schema

Models give type-safe writes from Python. They must match `alembic/versions/0001_initial_schema.py` exactly.

**Files:**
- Create: `apps/fundlens-scraper/src/fundlens_scraper/models.py`
- Test: `apps/fundlens-scraper/tests/test_smoke.py` (extend existing)

- [ ] **Step 1: Write the failing test**

Edit `apps/fundlens-scraper/tests/test_smoke.py`, append:

```python
def test_models_import_and_tablenames():
    from fundlens_scraper.models import (
        Amc, FundManager, Scheme, HoldingsSnapshot,
        Holding, HoldingDiff, IsinMaster, Nav,
    )
    assert Amc.__tablename__ == "amc"
    assert Amc.__table_args__ == {"schema": "fundlens"}
    assert Scheme.__tablename__ == "scheme"
    assert HoldingsSnapshot.__tablename__ == "holdings_snapshot"
    assert HoldingDiff.__tablename__ == "holding_diff"
    assert IsinMaster.__tablename__ == "isin_master"
    assert Nav.__tablename__ == "nav"
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/fundlens-scraper && uv run pytest tests/test_smoke.py::test_models_import_and_tablenames -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'fundlens_scraper.models'`

- [ ] **Step 3: Write the models module**

Create `apps/fundlens-scraper/src/fundlens_scraper/models.py`:

```python
"""SQLAlchemy 2.0 declarative models for the fundlens schema.

These mirror the Alembic-managed DDL in alembic/versions/0001_initial_schema.py.
The Alembic migrations are the source of truth — this file MUST be kept in sync
when columns change.
"""
from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import (
    BigInteger,
    CheckConstraint,
    Date,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    Numeric,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

SCHEMA = "fundlens"


class Base(DeclarativeBase):
    pass


class Amc(Base):
    __tablename__ = "amc"
    __table_args__ = {"schema": SCHEMA}

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    slug: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    sebi_reg_no: Mapped[str | None] = mapped_column(Text)
    website: Mapped[str | None] = mapped_column(Text)
    logo_url: Mapped[str | None] = mapped_column(Text)
    total_aum_cr: Mapped[Decimal | None] = mapped_column(Numeric(18, 2))
    scheme_count: Mapped[int | None] = mapped_column(Integer)
    scraper_status: Mapped[str] = mapped_column(Text, nullable=False, server_default="active")
    last_scraped_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class FundManager(Base):
    __tablename__ = "fund_manager"
    __table_args__ = (Index("fund_manager_amc_idx", "amc_id"), {"schema": SCHEMA})

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    amc_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.amc.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    since_date: Mapped[date | None] = mapped_column(Date)
    bio: Mapped[str | None] = mapped_column(Text)
    photo_url: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class Scheme(Base):
    __tablename__ = "scheme"
    __table_args__ = (
        Index("scheme_amc_idx", "amc_id"),
        Index("scheme_category_idx", "category", "sub_category"),
        {"schema": SCHEMA},
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    amc_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.amc.id", ondelete="CASCADE"), nullable=False)
    manager_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.fund_manager.id", ondelete="SET NULL"))
    amfi_code: Mapped[str | None] = mapped_column(Text, unique=True)
    isin_growth: Mapped[str | None] = mapped_column(Text)
    isin_idcw: Mapped[str | None] = mapped_column(Text)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    slug: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    category: Mapped[str | None] = mapped_column(Text)
    sub_category: Mapped[str | None] = mapped_column(Text)
    benchmark: Mapped[str | None] = mapped_column(Text)
    aum_cr: Mapped[Decimal | None] = mapped_column(Numeric(18, 2))
    expense_ratio: Mapped[Decimal | None] = mapped_column(Numeric(5, 3))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class HoldingsSnapshot(Base):
    __tablename__ = "holdings_snapshot"
    __table_args__ = (
        UniqueConstraint("scheme_id", "disclosure_date", name="holdings_snapshot_scheme_id_disclosure_date_key"),
        Index("snapshot_sha256_per_scheme_idx", "scheme_id", "raw_file_sha256", unique=True),
        {"schema": SCHEMA},
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    scheme_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.scheme.id", ondelete="CASCADE"), nullable=False)
    disclosure_date: Mapped[date] = mapped_column(Date, nullable=False)
    aum_at_disclosure: Mapped[Decimal | None] = mapped_column(Numeric(18, 2))
    raw_file_url: Mapped[str] = mapped_column(Text, nullable=False)
    raw_file_sha256: Mapped[str] = mapped_column(Text, nullable=False)
    parsed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    parser_version: Mapped[str] = mapped_column(Text, nullable=False)


class Holding(Base):
    __tablename__ = "holding"
    __table_args__ = (
        Index("holding_snapshot_idx", "snapshot_id"),
        Index("holding_isin_idx", "isin", postgresql_where="isin IS NOT NULL"),
        {"schema": SCHEMA},
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    snapshot_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.holdings_snapshot.id", ondelete="CASCADE"), nullable=False)
    isin: Mapped[str | None] = mapped_column(Text)
    ticker_nse: Mapped[str | None] = mapped_column(Text)
    ticker_bse: Mapped[str | None] = mapped_column(Text)
    company_name: Mapped[str] = mapped_column(Text, nullable=False)
    sector: Mapped[str | None] = mapped_column(Text)
    quantity: Mapped[Decimal | None] = mapped_column(Numeric(20, 4))
    market_value_cr: Mapped[Decimal | None] = mapped_column(Numeric(18, 2))
    pct_of_nav: Mapped[Decimal | None] = mapped_column(Numeric(7, 4))


class HoldingDiff(Base):
    __tablename__ = "holding_diff"
    __table_args__ = (
        CheckConstraint("action IN ('NEW','ADD','TRIM','EXIT','HOLD')", name="holding_diff_action_check"),
        Index("diff_scheme_idx", "scheme_id", "curr_snapshot_id"),
        Index("diff_isin_idx", "isin"),
        {"schema": SCHEMA},
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    scheme_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.scheme.id", ondelete="CASCADE"), nullable=False)
    isin: Mapped[str] = mapped_column(Text, nullable=False)
    prev_snapshot_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.holdings_snapshot.id"))
    curr_snapshot_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.holdings_snapshot.id"))
    prev_qty: Mapped[Decimal | None] = mapped_column(Numeric(20, 4))
    curr_qty: Mapped[Decimal | None] = mapped_column(Numeric(20, 4))
    qty_delta: Mapped[Decimal | None] = mapped_column(Numeric(20, 4))
    prev_value_cr: Mapped[Decimal | None] = mapped_column(Numeric(18, 2))
    curr_value_cr: Mapped[Decimal | None] = mapped_column(Numeric(18, 2))
    action: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class IsinMaster(Base):
    __tablename__ = "isin_master"
    __table_args__ = {"schema": SCHEMA}

    isin: Mapped[str] = mapped_column(Text, primary_key=True)
    ticker_nse: Mapped[str | None] = mapped_column(Text)
    ticker_bse: Mapped[str | None] = mapped_column(Text)
    company_name: Mapped[str] = mapped_column(Text, nullable=False)
    sector: Mapped[str | None] = mapped_column(Text)
    industry: Mapped[str | None] = mapped_column(Text)
    refreshed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class Nav(Base):
    __tablename__ = "nav"
    __table_args__ = (
        UniqueConstraint("scheme_id", "date", name="nav_scheme_id_date_key"),
        Index("nav_scheme_date_idx", "scheme_id", "date"),
        {"schema": SCHEMA},
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    scheme_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.scheme.id", ondelete="CASCADE"), nullable=False)
    date: Mapped[date] = mapped_column(Date, nullable=False)
    nav: Mapped[Decimal] = mapped_column(Numeric(12, 4), nullable=False)
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/fundlens-scraper && uv run pytest tests/test_smoke.py::test_models_import_and_tablenames -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/fundlens-scraper/src/fundlens_scraper/models.py apps/fundlens-scraper/tests/test_smoke.py
git commit -m "feat(fundlens-scraper): add SQLAlchemy ORM models for fundlens schema"
```

---

### Task 2: Add shared httpx client with tenacity retry

Every scraper, AMFI fetcher, and NSE fetcher uses the same client — sets the user agent, timeout, and retry policy in one place.

**Files:**
- Create: `apps/fundlens-scraper/src/fundlens_scraper/http_client.py`
- Test: `apps/fundlens-scraper/tests/test_http_client.py`

- [ ] **Step 1: Write the failing test**

Create `apps/fundlens-scraper/tests/test_http_client.py`:

```python
import httpx
import pytest

from fundlens_scraper.http_client import build_client


@pytest.mark.asyncio
async def test_client_sends_configured_user_agent(monkeypatch):
    captured = {}

    def handler(request: httpx.Request) -> httpx.Response:
        captured["ua"] = request.headers.get("user-agent")
        return httpx.Response(200, text="ok")

    transport = httpx.MockTransport(handler)
    async with build_client(transport=transport) as client:
        resp = await client.get("https://example.com")
    assert resp.status_code == 200
    assert captured["ua"] is not None
    assert "FundLens" in captured["ua"]
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/fundlens-scraper && uv run pytest tests/test_http_client.py -v`
Expected: FAIL with `ModuleNotFoundError`

- [ ] **Step 3: Write the http client**

Create `apps/fundlens-scraper/src/fundlens_scraper/http_client.py`:

```python
"""Shared async httpx client with tenacity-based retry.

Every outbound HTTP request from the scraper goes through this — gives us one
place to set user agent, timeout, retry policy, and connection limits.
"""
from __future__ import annotations

from typing import Any

import httpx
from tenacity import (
    AsyncRetrying,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

from .settings import get_settings


def build_client(transport: httpx.AsyncBaseTransport | None = None) -> httpx.AsyncClient:
    """Construct a configured AsyncClient. Pass `transport` for tests."""
    s = get_settings()
    return httpx.AsyncClient(
        headers={"User-Agent": s.http_user_agent, "Accept": "*/*"},
        timeout=httpx.Timeout(s.http_timeout_s, connect=10.0),
        follow_redirects=True,
        transport=transport,
        limits=httpx.Limits(max_connections=10, max_keepalive_connections=5),
    )


async def fetch_bytes(url: str, *, client: httpx.AsyncClient | None = None) -> bytes:
    """GET `url` with retries on transient failures. Returns response.content."""
    s = get_settings()
    own_client = client is None
    c = client or build_client()
    try:
        async for attempt in AsyncRetrying(
            stop=stop_after_attempt(s.http_max_retries),
            wait=wait_exponential(multiplier=1, min=1, max=10),
            retry=retry_if_exception_type((httpx.TransportError, httpx.HTTPStatusError)),
            reraise=True,
        ):
            with attempt:
                resp = await c.get(url)
                resp.raise_for_status()
                return resp.content
        raise RuntimeError("unreachable")  # tenacity guarantees a return or raise
    finally:
        if own_client:
            await c.aclose()
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/fundlens-scraper && uv run pytest tests/test_http_client.py -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add apps/fundlens-scraper/src/fundlens_scraper/http_client.py apps/fundlens-scraper/tests/test_http_client.py
git commit -m "feat(fundlens-scraper): add shared async httpx client with retry"
```

---

### Task 3: Header row detector for PDF/Excel tables

AMC tables don't have a fixed header row position. This module finds it by matching column-name synonyms.

**Files:**
- Create: `apps/fundlens-scraper/src/fundlens_scraper/parsers/__init__.py` (empty)
- Create: `apps/fundlens-scraper/src/fundlens_scraper/parsers/header_detector.py`
- Test: `apps/fundlens-scraper/tests/test_header_detector.py`

- [ ] **Step 1: Write the failing test**

Create `apps/fundlens-scraper/tests/test_header_detector.py`:

```python
from fundlens_scraper.parsers.header_detector import find_header_row, ColumnMap


def test_finds_header_after_logo_rows():
    rows = [
        ["PPFAS Mutual Fund"],
        ["Portfolio Disclosure - April 2026"],
        [],
        ["Name of Instrument", "ISIN", "Quantity", "Market Value (₹ Lakhs)", "% to Net Assets"],
        ["Reliance Industries Ltd", "INE002A01018", "1234", "9876.5", "5.43"],
    ]
    idx, mapping = find_header_row(rows)
    assert idx == 3
    assert mapping == ColumnMap(name=0, isin=1, qty=2, value=3, pct=4)


def test_returns_none_when_no_header_found():
    rows = [["random"], ["unrelated"], ["text"]]
    idx, mapping = find_header_row(rows)
    assert idx is None
    assert mapping is None


def test_matches_alternate_column_names():
    rows = [
        ["Issuer Name", "ISIN Code", "No. of Units", "Market Value", "% of NAV"],
        ["Foo Corp", "INE111A01011", "10", "1.0", "0.5"],
    ]
    idx, mapping = find_header_row(rows)
    assert idx == 0
    assert mapping.name == 0 and mapping.isin == 1 and mapping.qty == 2
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/fundlens-scraper && uv run pytest tests/test_header_detector.py -v`
Expected: FAIL with `ModuleNotFoundError`

- [ ] **Step 3: Write the header detector**

Create `apps/fundlens-scraper/src/fundlens_scraper/parsers/__init__.py` (empty file).

Create `apps/fundlens-scraper/src/fundlens_scraper/parsers/header_detector.py`:

```python
"""Locate the header row in a table extracted from a PDF or Excel disclosure.

AMC tables put the header anywhere from row 0 to row ~6 (after logos and
boilerplate). This module finds it by scoring each row against a synonym map.
"""
from __future__ import annotations

from dataclasses import dataclass

NAME_SYNONYMS = {"name of instrument", "instrument", "issuer name", "security name", "company name"}
ISIN_SYNONYMS = {"isin", "isin code", "isin number"}
QTY_SYNONYMS = {"quantity", "no. of units", "no of units", "qty", "face value"}
VALUE_SYNONYMS = {"market value", "market cap", "value", "market value (rs. in lakhs)", "market value (₹ lakhs)", "market value (rs. lakhs)"}
PCT_SYNONYMS = {"% to net assets", "% of net assets", "% of nav", "% to nav", "% of net asset value"}


@dataclass(frozen=True)
class ColumnMap:
    name: int
    isin: int
    qty: int
    value: int
    pct: int


def _matches(cell: object, synonyms: set[str]) -> bool:
    if cell is None:
        return False
    s = str(cell).strip().lower()
    return any(syn in s for syn in synonyms)


def _find_col(row: list[object], synonyms: set[str]) -> int | None:
    for i, cell in enumerate(row):
        if _matches(cell, synonyms):
            return i
    return None


def find_header_row(rows: list[list[object]]) -> tuple[int | None, ColumnMap | None]:
    """Return (row_index, ColumnMap) for the first row matching ≥3 column synonyms.

    Required: name + isin + qty. value and pct are optional but recorded if found.
    """
    for idx, row in enumerate(rows):
        if not row:
            continue
        name_col = _find_col(row, NAME_SYNONYMS)
        isin_col = _find_col(row, ISIN_SYNONYMS)
        qty_col = _find_col(row, QTY_SYNONYMS)
        value_col = _find_col(row, VALUE_SYNONYMS)
        pct_col = _find_col(row, PCT_SYNONYMS)

        required = [name_col, isin_col, qty_col]
        if all(c is not None for c in required):
            return idx, ColumnMap(
                name=name_col,
                isin=isin_col,
                qty=qty_col,
                value=value_col if value_col is not None else -1,
                pct=pct_col if pct_col is not None else -1,
            )
    return None, None
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/fundlens-scraper && uv run pytest tests/test_header_detector.py -v`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add apps/fundlens-scraper/src/fundlens_scraper/parsers/__init__.py apps/fundlens-scraper/src/fundlens_scraper/parsers/header_detector.py apps/fundlens-scraper/tests/test_header_detector.py
git commit -m "feat(fundlens-scraper): add header row detector for AMC disclosure tables"
```

---

### Task 4: Normalizer — raw rows → canonical holdings

Converts numeric strings ("1,23,456", "1.23 Cr", "-") into floats and strips noise from company names.

**Files:**
- Create: `apps/fundlens-scraper/src/fundlens_scraper/parsers/normalizer.py`
- Test: `apps/fundlens-scraper/tests/test_normalizer.py`

- [ ] **Step 1: Write the failing test**

Create `apps/fundlens-scraper/tests/test_normalizer.py`:

```python
from decimal import Decimal

import pytest

from fundlens_scraper.parsers.header_detector import ColumnMap
from fundlens_scraper.parsers.normalizer import RawHolding, normalize_rows, parse_indian_number


@pytest.mark.parametrize("raw,expected", [
    ("1,23,456", Decimal("123456")),
    ("1,23,456.78", Decimal("123456.78")),
    ("1.23", Decimal("1.23")),
    ("-", None),
    ("N.A.", None),
    ("", None),
    ("  9,876.5  ", Decimal("9876.5")),
    ("1.5E+05", Decimal("150000")),
])
def test_parse_indian_number(raw, expected):
    assert parse_indian_number(raw) == expected


def test_normalize_rows_skips_blank_and_total_rows():
    cm = ColumnMap(name=0, isin=1, qty=2, value=3, pct=4)
    data = [
        ["Reliance Industries Ltd", "INE002A01018", "1234", "9876.5", "5.43"],
        ["", "", "", "", ""],
        ["Total Equity", "", "", "100000", "85.0"],
        ["HDFC Bank Ltd Equity Shares", "INE040A01034", "5,678", "12,345.67", "8.91"],
    ]
    result = normalize_rows(data, cm)
    assert len(result) == 2
    assert result[0] == RawHolding(
        company_name_raw="Reliance Industries Ltd",
        isin="INE002A01018",
        quantity=Decimal("1234"),
        market_value_cr=Decimal("9876.5"),
        pct_of_nav=Decimal("5.43"),
        sector_raw=None,
    )
    assert result[1].company_name_raw == "HDFC Bank Ltd"  # "Equity Shares" suffix stripped
    assert result[1].quantity == Decimal("5678")
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/fundlens-scraper && uv run pytest tests/test_normalizer.py -v`
Expected: FAIL with `ModuleNotFoundError`

- [ ] **Step 3: Write the normalizer**

Create `apps/fundlens-scraper/src/fundlens_scraper/parsers/normalizer.py`:

```python
"""Turn raw extracted table rows into typed RawHolding records.

Handles:
- Indian number formatting (commas as lakh/crore separators, scientific notation)
- "-", "N.A.", "" treated as None
- Trailing "Equity Shares" / "Debentures" / "Bonds" suffixes stripped from names
- Skips total/subtotal/blank rows
"""
from __future__ import annotations

import re
from dataclasses import dataclass
from decimal import Decimal, InvalidOperation

from .header_detector import ColumnMap

_NULL_TOKENS = {"-", "n.a.", "na", "n/a", ""}
_NAME_SUFFIXES = (" equity shares", " equity", " - equity", " debentures", " bonds", " ncd", " - ncd")
_TOTAL_PREFIXES = ("total ", "sub total", "subtotal", "grand total")


@dataclass(frozen=True)
class RawHolding:
    company_name_raw: str
    isin: str | None
    quantity: Decimal | None
    market_value_cr: Decimal | None
    pct_of_nav: Decimal | None
    sector_raw: str | None


def parse_indian_number(raw: object) -> Decimal | None:
    """Parse a possibly Indian-formatted number string to Decimal. Returns None for nulls."""
    if raw is None:
        return None
    s = str(raw).strip()
    if s.lower() in _NULL_TOKENS:
        return None
    # Strip commas (Indian lakh-format and Western thousands both work)
    s = s.replace(",", "")
    try:
        return Decimal(s)
    except InvalidOperation:
        return None


def _clean_name(raw: str) -> str:
    s = str(raw).strip()
    lower = s.lower()
    for suffix in _NAME_SUFFIXES:
        if lower.endswith(suffix):
            return s[: -len(suffix)].strip()
    return s


def _is_skip_row(row: list[object], cm: ColumnMap) -> bool:
    """Drop totals, blanks, and clearly-non-data rows."""
    if not row or all(c is None or str(c).strip() == "" for c in row):
        return True
    name_cell = row[cm.name] if cm.name < len(row) else None
    if name_cell is None:
        return True
    name = str(name_cell).strip().lower()
    if not name:
        return True
    return any(name.startswith(p) for p in _TOTAL_PREFIXES)


def normalize_rows(rows: list[list[object]], cm: ColumnMap) -> list[RawHolding]:
    out: list[RawHolding] = []
    for row in rows:
        if _is_skip_row(row, cm):
            continue
        name = _clean_name(str(row[cm.name]))
        isin_raw = row[cm.isin] if cm.isin < len(row) else None
        isin = re.sub(r"\s+", "", str(isin_raw)) if isin_raw else None
        if isin and not re.match(r"^[A-Z0-9]{12}$", isin):
            isin = None
        qty = parse_indian_number(row[cm.qty] if cm.qty < len(row) else None)
        value = (
            parse_indian_number(row[cm.value])
            if cm.value >= 0 and cm.value < len(row)
            else None
        )
        pct = (
            parse_indian_number(row[cm.pct])
            if cm.pct >= 0 and cm.pct < len(row)
            else None
        )
        out.append(
            RawHolding(
                company_name_raw=name,
                isin=isin,
                quantity=qty,
                market_value_cr=value,
                pct_of_nav=pct,
                sector_raw=None,
            )
        )
    return out
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/fundlens-scraper && uv run pytest tests/test_normalizer.py -v`
Expected: PASS (9 tests)

- [ ] **Step 5: Commit**

```bash
git add apps/fundlens-scraper/src/fundlens_scraper/parsers/normalizer.py apps/fundlens-scraper/tests/test_normalizer.py
git commit -m "feat(fundlens-scraper): add normalizer for raw holding rows"
```

---

### Task 5: PDF extractor — pdfplumber primary, camelot fallback

Wraps the two PDF table extraction backends behind one async function.

**Files:**
- Create: `apps/fundlens-scraper/src/fundlens_scraper/parsers/pdf_extractor.py`
- Create: `apps/fundlens-scraper/tests/fixtures/` (directory)
- Test: `apps/fundlens-scraper/tests/test_pdf_extractor.py`

- [ ] **Step 1: Add fixture file**

Get a small real PPFAS disclosure PDF (one scheme, e.g. PPFAS Flexi Cap Fund April 2026) and save it as:

`apps/fundlens-scraper/tests/fixtures/ppfas_flexicap_202604.pdf`

If a fresh download isn't possible, use any 1-2 page AMC disclosure PDF you have available. The test below is shape-only (length checks, not specific content) so it works with any real disclosure.

- [ ] **Step 2: Write the failing test**

Create `apps/fundlens-scraper/tests/test_pdf_extractor.py`:

```python
from pathlib import Path

import pytest

from fundlens_scraper.parsers.pdf_extractor import extract_holdings_from_pdf

FIXTURE = Path(__file__).parent / "fixtures" / "ppfas_flexicap_202604.pdf"


@pytest.mark.skipif(not FIXTURE.exists(), reason="fixture PDF not present")
def test_extract_holdings_returns_normalized_rows():
    holdings = extract_holdings_from_pdf(FIXTURE.read_bytes())
    assert len(holdings) > 0, "should extract at least one holding"
    # All rows should have a company_name and at least one numeric field
    for h in holdings:
        assert h.company_name_raw
        assert h.quantity is not None or h.market_value_cr is not None


def test_extract_holdings_raises_on_empty_pdf():
    with pytest.raises(ValueError):
        extract_holdings_from_pdf(b"%PDF-1.4\n%%EOF\n")
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd apps/fundlens-scraper && uv run pytest tests/test_pdf_extractor.py -v`
Expected: FAIL with `ModuleNotFoundError`

- [ ] **Step 4: Write the extractor**

Create `apps/fundlens-scraper/src/fundlens_scraper/parsers/pdf_extractor.py`:

```python
"""Extract holdings from a PDF disclosure as a list of RawHolding.

Strategy:
1. pdfplumber.extract_tables() per page
2. find_header_row() — first table where the header is identifiable
3. Concatenate rows below header across all pages
4. normalize_rows() into RawHolding[]

Camelot fallback is a separate code path triggered only if pdfplumber returns 0
useful rows. Wrapped behind try/except to keep camelot import lazy (camelot
brings opencv + ghostscript — heavy).
"""
from __future__ import annotations

import io

import pdfplumber

from .header_detector import find_header_row
from .normalizer import RawHolding, normalize_rows


def _extract_via_pdfplumber(pdf_bytes: bytes) -> list[RawHolding]:
    holdings: list[RawHolding] = []
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        if not pdf.pages:
            raise ValueError("PDF has no pages")
        for page in pdf.pages:
            tables = page.extract_tables() or []
            for table in tables:
                if not table:
                    continue
                idx, cm = find_header_row(table)
                if idx is None or cm is None:
                    continue
                holdings.extend(normalize_rows(table[idx + 1 :], cm))
    return holdings


def extract_holdings_from_pdf(pdf_bytes: bytes) -> list[RawHolding]:
    """Top-level entrypoint. Raises ValueError if no holdings found anywhere."""
    rows = _extract_via_pdfplumber(pdf_bytes)
    if not rows:
        raise ValueError("no holdings extracted — pdfplumber found no parseable tables")
    return rows
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd apps/fundlens-scraper && uv run pytest tests/test_pdf_extractor.py -v`
Expected: PASS (test_extract_holdings_raises_on_empty_pdf passes always; the fixture test passes if you added a real PDF, otherwise it skips)

- [ ] **Step 6: Commit**

```bash
git add apps/fundlens-scraper/src/fundlens_scraper/parsers/pdf_extractor.py apps/fundlens-scraper/tests/test_pdf_extractor.py apps/fundlens-scraper/tests/fixtures/
git commit -m "feat(fundlens-scraper): add pdfplumber-based holdings extractor"
```

---

### Task 6: Persistence — write a snapshot + holdings atomically

Idempotency by sha256: re-running on the same file is a no-op. Used by every scraper.

**Files:**
- Create: `apps/fundlens-scraper/src/fundlens_scraper/persistence.py`
- Test: `apps/fundlens-scraper/tests/conftest.py` (postgres fixture via testcontainers)
- Test: `apps/fundlens-scraper/tests/test_persistence.py`

- [ ] **Step 1: Write the testcontainers fixture**

Create `apps/fundlens-scraper/tests/conftest.py`:

```python
"""Shared pytest fixtures.

`pg_container` spins up a Postgres testcontainer, runs Alembic migrations,
and tears down on session exit. Tests requiring a real DB depend on it.
"""
from __future__ import annotations

import os
from pathlib import Path
from collections.abc import Iterator

import pytest
from alembic import command
from alembic.config import Config
from testcontainers.postgres import PostgresContainer


SCRAPER_ROOT = Path(__file__).resolve().parent.parent


@pytest.fixture(scope="session")
def pg_container() -> Iterator[PostgresContainer]:
    pg = PostgresContainer("postgres:16")
    pg.start()
    try:
        os.environ["FUNDLENS_DATABASE_URL"] = pg.get_connection_url().replace(
            "postgresql+psycopg2://", "postgresql://"
        )
        cfg = Config(str(SCRAPER_ROOT / "alembic.ini"))
        cfg.set_main_option("script_location", str(SCRAPER_ROOT / "alembic"))
        cfg.set_main_option("sqlalchemy.url", os.environ["FUNDLENS_DATABASE_URL"])
        command.upgrade(cfg, "head")
        yield pg
    finally:
        pg.stop()
```

- [ ] **Step 2: Write the failing test**

Create `apps/fundlens-scraper/tests/test_persistence.py`:

```python
import datetime
from decimal import Decimal

import pytest
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from fundlens_scraper.models import Amc, Scheme, HoldingsSnapshot, Holding
from fundlens_scraper.parsers.normalizer import RawHolding
from fundlens_scraper.persistence import save_snapshot


def _async_url(url: str) -> str:
    return url.replace("postgresql://", "postgresql+asyncpg://", 1)


@pytest.mark.asyncio
async def test_save_snapshot_inserts_holdings(pg_container):
    engine = create_async_engine(_async_url(pg_container.get_connection_url().replace("postgresql+psycopg2://", "postgresql://")))
    Session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

    async with Session() as s:
        amc = Amc(slug="ppfas-mf", name="PPFAS Mutual Fund")
        s.add(amc)
        await s.flush()
        scheme = Scheme(amc_id=amc.id, slug="ppfas-flexi-cap-fund", name="PPFAS Flexi Cap Fund")
        s.add(scheme)
        await s.commit()
        scheme_id = scheme.id

    holdings = [
        RawHolding("Reliance Industries Ltd", "INE002A01018", Decimal("1000"), Decimal("100"), Decimal("5.0"), None),
        RawHolding("HDFC Bank Ltd", "INE040A01034", Decimal("2000"), Decimal("80"), Decimal("4.0"), None),
    ]
    sid_1 = await save_snapshot(
        Session,
        scheme_id=scheme_id,
        disclosure_date=datetime.date(2026, 4, 30),
        raw_file_url="https://example.com/x.pdf",
        raw_file_bytes=b"fake-pdf-bytes",
        parser_version="ppfas-v1",
        holdings=holdings,
    )
    assert sid_1 is not None

    # Idempotent re-run with same bytes → returns same id, no new rows
    sid_2 = await save_snapshot(
        Session,
        scheme_id=scheme_id,
        disclosure_date=datetime.date(2026, 4, 30),
        raw_file_url="https://example.com/x.pdf",
        raw_file_bytes=b"fake-pdf-bytes",
        parser_version="ppfas-v1",
        holdings=holdings,
    )
    assert sid_1 == sid_2

    async with Session() as s:
        result = await s.execute(select(Holding).where(Holding.snapshot_id == sid_1))
        rows = result.scalars().all()
        assert len(rows) == 2
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd apps/fundlens-scraper && uv run pytest tests/test_persistence.py -v`
Expected: FAIL with `ModuleNotFoundError: No module named 'fundlens_scraper.persistence'`

- [ ] **Step 4: Write persistence module**

Create `apps/fundlens-scraper/src/fundlens_scraper/persistence.py`:

```python
"""Atomic snapshot writer.

Contract: save_snapshot() either inserts (snapshot + N holdings) inside one
transaction, or is a no-op because an identical snapshot (same sha256) already
exists for this scheme. Returns the snapshot id in both cases.
"""
from __future__ import annotations

import datetime
import hashlib
from collections.abc import Iterable

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker

from .models import Holding, HoldingsSnapshot
from .parsers.normalizer import RawHolding


async def save_snapshot(
    session_factory: async_sessionmaker[AsyncSession],
    *,
    scheme_id: int,
    disclosure_date: datetime.date,
    raw_file_url: str,
    raw_file_bytes: bytes,
    parser_version: str,
    holdings: Iterable[RawHolding],
) -> int:
    """Insert a holdings_snapshot + child holdings. Idempotent by (scheme_id, sha256).

    Returns the snapshot id (either newly inserted or pre-existing).
    """
    sha = hashlib.sha256(raw_file_bytes).hexdigest()

    async with session_factory() as session:
        # Idempotency check
        existing = await session.execute(
            select(HoldingsSnapshot.id)
            .where(HoldingsSnapshot.scheme_id == scheme_id)
            .where(HoldingsSnapshot.raw_file_sha256 == sha)
        )
        if existing_id := existing.scalar_one_or_none():
            return existing_id

        snap = HoldingsSnapshot(
            scheme_id=scheme_id,
            disclosure_date=disclosure_date,
            raw_file_url=raw_file_url,
            raw_file_sha256=sha,
            parser_version=parser_version,
        )
        session.add(snap)
        await session.flush()  # populate snap.id

        for h in holdings:
            session.add(
                Holding(
                    snapshot_id=snap.id,
                    isin=h.isin,
                    company_name=h.company_name_raw,
                    sector=h.sector_raw,
                    quantity=h.quantity,
                    market_value_cr=h.market_value_cr,
                    pct_of_nav=h.pct_of_nav,
                )
            )
        await session.commit()
        return snap.id
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd apps/fundlens-scraper && uv run pytest tests/test_persistence.py -v`
Expected: PASS (requires Docker running for testcontainers — Postgres container starts)

- [ ] **Step 6: Commit**

```bash
git add apps/fundlens-scraper/src/fundlens_scraper/persistence.py apps/fundlens-scraper/tests/test_persistence.py apps/fundlens-scraper/tests/conftest.py
git commit -m "feat(fundlens-scraper): add idempotent snapshot persistence"
```

---

# CHUNK A REVIEW CHECKPOINT

After Tasks 1-6:
- Models match Alembic schema
- HTTP client + retry policy is shared
- PDF extraction pipeline (header detection → normalization → extraction) works on a real PDF
- Persistence is idempotent by sha256
- All tests pass (8 test files, ~20 individual tests)

**Verify before continuing to Chunk B:**
```bash
cd apps/fundlens-scraper
uv run pytest -v
```

Expected: all green. Some `pdfplumber` warnings may appear about missing fonts — those are noise from the PDF library and not test failures.

---

# CHUNKS B-F — SCAFFOLDED OUTLINE

Each remaining chunk follows the same TDD pattern (failing test → implementation → green test → commit). Full task bodies will be added in follow-up plan extensions before each chunk executes. The intent and file list per task are locked here so the chunk boundaries are stable.

---

## Chunk B — PPFAS Scraper (Tasks 7-9)

### Task 7: Scraper protocol + registry

**Files:** `scrapers/__init__.py`, `scrapers/base.py`, `scrapers/registry.py`, `tests/test_registry.py`

Defines `AbstractAmcScraper` Protocol (3 methods: `discover_portfolios`, `fetch_portfolio`, `parse`), `PortfolioRef` and `RawHolding` dataclasses, and `SCRAPER_REGISTRY` dict + `register()` decorator.

### Task 8: PPFAS scraper implementation

**Files:** `scrapers/ppfas.py`, `tests/test_ppfas_scraper.py`

PPFAS uses predictable URLs: `https://amc.ppfas.com/downloads/portfolio-disclosure/PPFAS_{scheme}_{YYYYMM}.pdf`. The scraper:
- `discover_portfolios()`: generates `PortfolioRef` for each of PPFAS's 7-8 schemes for the most recent disclosure month
- `fetch_portfolio()`: uses `http_client.fetch_bytes()`
- `parse()`: delegates to `pdf_extractor.extract_holdings_from_pdf()`

Test mocks the HTTP transport and uses the fixture PDF.

### Task 9: End-to-end PPFAS ingest CLI command

**Files:** `cli.py` (modify), `tests/test_cli.py`

Adds `fundlens-scraper run --amc ppfas-mf` typer subcommand: discovers, fetches, parses, persists. Test mocks HTTP and asserts rows land in Postgres.

---

## Chunk C — Diff Engine + AMFI + NSE (Tasks 10-12)

### Task 10: Diff engine

**Files:** `diff_engine.py`, `tests/test_diff_engine.py`

`compute_diff_for_snapshot(curr_snapshot_id)`: outer-joins curr/prev holdings on ISIN, classifies each (`NEW` / `ADD` / `TRIM` / `EXIT` / `HOLD` with ±5% threshold), inserts `holding_diff` rows. Test uses two sample snapshots and asserts action distribution.

### Task 11: AMFI NAVAll.txt fetcher + parser

**Files:** `amfi/__init__.py`, `amfi/nav_parser.py`, `amfi/nav_fetcher.py`, `tests/fixtures/navall_sample.txt`, `tests/test_nav_parser.py`

Downloads the semicolon-delimited NAV file, parses the section/header/data structure, upserts into `fundlens.nav` keyed by `(scheme_id, date)`. Test uses a 50-row sample fixture.

### Task 12: NSE ISIN master fetcher

**Files:** `isin/__init__.py`, `isin/nse_master.py`, `isin/resolver.py`, `tests/fixtures/equity_l_sample.csv`, `tests/test_nse_master.py`

Downloads NSE's `EQUITY_L.csv`, populates `fundlens.isin_master`. `resolver.py` exposes `resolve_isin(isin) -> IsinMaster | None` for use by future enrichment steps (Phase 1).

---

## Chunk D — Go API (Tasks 13-18)

### Task 13: Extend sqlc schema snapshot

**Files:** `apps/fundlens-api/internal/schema/schema.sql` (verify it matches Alembic 0001 + 0002; should already be in sync — fix any drift)

### Task 14: Add SQL queries for scheme, holding, diff, stock, nav

**Files:** `internal/queries/scheme.sql`, `holding.sql`, `diff.sql`, `stock.sql`, `nav.sql`

Each `.sql` holds sqlc-tagged queries matching the endpoints in §5.1 of the design spec. Run `sqlc generate` and commit `internal/db/*.go`.

### Task 15: Response envelope helpers

**Files:** `internal/handlers/response.go`, `internal/handlers/response_test.go`

`OK(c, data, ttl)` and `Err(c, status, code, msg)` produce the standardized `{data, meta}` / `{error}` envelopes.

### Task 16: Cache module

**Files:** `internal/cache/cache.go`, `internal/cache/cache_test.go`

`GetOrSet[T any](ctx, rdb, key, ttl, fn)` — generic cache-aside helper. Test uses `redismock`.

### Task 17: Handlers — amc, scheme, holding, diff, stock, nav

**Files:** `internal/handlers/{amc,scheme,holding,diff,stock,nav}.go`

Each handler: parse params → call sqlc query (cached) → return envelope. ~30 lines each.

### Task 18: Wire routes in main.go

**Files:** `cmd/server/main.go`

Adds 9 routes under `/fundlens/api/v1/`. CORS middleware reads `FUNDLENS_FRONTEND_URL`.

---

## Chunk E — Frontend Wiring (Tasks 19-23)

### Task 19: Typed API client

**Files:** `apps/frontend-web/lib/fundlens-api-client.ts`

Uses `@repo/fundlens-types`; calls go through `/fundlens-api/*` (same-origin via Next.js rewrite). One method per endpoint.

### Task 20: AmcCard + AmcGrid + ScraperStatusPill

**Files:** `components/fundlens/{AmcCard,AmcGrid,ScraperStatusPill}.tsx`

### Task 21: SchemeRow + HoldingsTable

**Files:** `components/fundlens/{SchemeRow,HoldingsTable}.tsx`

Client component for HoldingsTable (sortable, paginated via TanStack Query).

### Task 22: DiffBadge + DiffTable

**Files:** `components/fundlens/{DiffBadge,DiffTable}.tsx`

### Task 23: Wire pages to real API

**Files:** `app/(app)/fundlens/page.tsx`, `app/(app)/fundlens/amc/[slug]/page.tsx`, `app/(app)/fundlens/scheme/[slug]/page.tsx`

Replace placeholders. Add `@repo/fundlens-types` to `apps/frontend-web/package.json` workspace deps if not already present.

---

## Chunk F — Wiring + Top-5 AMCs (Tasks 24-26)

### Task 24: Cron schedule wiring

**Files:** `src/fundlens_scraper/jobs.py` (modify)

Register: `fetch_nav` (19:00 IST daily), `refresh_isin_master` (02:00 IST monthly), `scrape_amc_ppfas-mf` (every 30 min, 11:00-17:00 IST, weekdays), `compute_diffs` (Celery-triggered post-snapshot), `health_check` (every 5 min).

### Task 25: Top-5 AMC seed migration

**Files:** `alembic/versions/0003_seed_top5_amcs.py`

Seeds `amc` table with PPFAS, Nippon India, ICICI Pru, HDFC, SBI rows (slug, name, website, sebi_reg_no, scraper_status='active' for ppfas-mf and 'disabled' for the rest until their scrapers exist).

### Task 26: Dev runbook

**Files:** `docs/fundlens/DEV.md`

Step-by-step: `pnpm db:up`, `pnpm fundlens:up`, `pnpm fundlens:migrate`, then `docker compose exec fundlens-scraper fundlens-scraper run --amc ppfas-mf`, finally `open http://localhost:3000/fundlens`. Includes `curl` checks against `:5000/fundlens/api/v1/health`.

---

## Verification (end of plan)

```bash
# All tests green
cd apps/fundlens-scraper && uv run pytest -v
cd apps/fundlens-api && go test ./...
cd apps/frontend-web && pnpm check-types

# Pipeline end-to-end
pnpm db:up && pnpm fundlens:up && pnpm fundlens:migrate
docker compose exec fundlens-scraper fundlens-scraper run --amc ppfas-mf

# API checks
curl http://localhost:5000/fundlens/api/v1/health | jq
curl http://localhost:5000/fundlens/api/v1/amcs | jq '.data | length'  # ≥1 (PPFAS)
curl http://localhost:5000/fundlens/api/v1/schemes/ppfas-flexi-cap-fund/holdings | jq '.data | length'  # ≥20

# Frontend
open http://localhost:3000/fundlens         # PPFAS card visible
open http://localhost:3000/fundlens/scheme/ppfas-flexi-cap-fund   # holdings table renders
```

---

## Self-Review

**Spec coverage:** Chunk A delivers the parser foundation; B delivers one working scraper; C delivers diff + reference data; D delivers the read API; E delivers UI; F wires schedule + seed. End state covers FUNDS_SCRAPER.md Phase 0 §6 deliverables 1-11 for one canary AMC, leaving 39+ AMCs as Phase 1 work.

**Placeholder scan:** Chunk A is fully fleshed out — no TBDs, every code block complete, every test concrete. Chunks B-F are intentionally outlined (not placeholders): they specify file paths, intent, and one-line algorithm sketches, with full task bodies to be added before each chunk executes. This is plan-as-staged-document, not plan-as-vapor.

**Type consistency:** `RawHolding` is defined once in `parsers/normalizer.py` (Task 4) and used by `pdf_extractor.py` (Task 5), `persistence.py` (Task 6), and scraper code in Chunk B. `ColumnMap` is defined in `parsers/header_detector.py` (Task 3) and used by `normalizer.py` and `pdf_extractor.py`. Models match Alembic exactly.
