"""Initial fundlens schema — amc, fund_manager, scheme, holdings_snapshot,
holding, holding_diff, isin_master, nav.

Revision ID: 0001
Revises:
Create Date: 2026-05-08
"""

from __future__ import annotations

from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("CREATE SCHEMA IF NOT EXISTS fundlens")

    op.execute(
        """
        CREATE TABLE fundlens.amc (
            id              BIGSERIAL PRIMARY KEY,
            slug            TEXT UNIQUE NOT NULL,
            name            TEXT NOT NULL,
            sebi_reg_no     TEXT,
            website         TEXT,
            logo_url        TEXT,
            total_aum_cr    NUMERIC(18,2),
            scheme_count    INT,
            scraper_status  TEXT NOT NULL DEFAULT 'active'
                CHECK (scraper_status IN ('active','broken','disabled')),
            last_scraped_at TIMESTAMPTZ,
            created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
            updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
        )
        """
    )

    op.execute(
        """
        CREATE TABLE fundlens.fund_manager (
            id          BIGSERIAL PRIMARY KEY,
            amc_id      BIGINT NOT NULL REFERENCES fundlens.amc(id) ON DELETE CASCADE,
            name        TEXT NOT NULL,
            since_date  DATE,
            bio         TEXT,
            photo_url   TEXT,
            created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
        )
        """
    )
    op.execute("CREATE INDEX fund_manager_amc_idx ON fundlens.fund_manager(amc_id)")

    op.execute(
        """
        CREATE TABLE fundlens.scheme (
            id              BIGSERIAL PRIMARY KEY,
            amc_id          BIGINT NOT NULL REFERENCES fundlens.amc(id) ON DELETE CASCADE,
            manager_id      BIGINT REFERENCES fundlens.fund_manager(id) ON DELETE SET NULL,
            amfi_code       TEXT UNIQUE,
            isin_growth     TEXT,
            isin_idcw       TEXT,
            name            TEXT NOT NULL,
            slug            TEXT UNIQUE NOT NULL,
            category        TEXT,
            sub_category    TEXT,
            benchmark       TEXT,
            aum_cr          NUMERIC(18,2),
            expense_ratio   NUMERIC(5,3),
            created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
            updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
        )
        """
    )
    op.execute("CREATE INDEX scheme_amc_idx ON fundlens.scheme(amc_id)")
    op.execute(
        "CREATE INDEX scheme_category_idx ON fundlens.scheme(category, sub_category)"
    )

    op.execute(
        """
        CREATE TABLE fundlens.holdings_snapshot (
            id                BIGSERIAL PRIMARY KEY,
            scheme_id         BIGINT NOT NULL REFERENCES fundlens.scheme(id) ON DELETE CASCADE,
            disclosure_date   DATE NOT NULL,
            aum_at_disclosure NUMERIC(18,2),
            raw_file_url      TEXT NOT NULL,
            raw_file_sha256   TEXT NOT NULL,
            parsed_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
            parser_version    TEXT NOT NULL,
            UNIQUE (scheme_id, disclosure_date)
        )
        """
    )
    op.execute(
        "CREATE UNIQUE INDEX snapshot_sha256_per_scheme_idx "
        "ON fundlens.holdings_snapshot(scheme_id, raw_file_sha256)"
    )

    op.execute(
        """
        CREATE TABLE fundlens.holding (
            id                BIGSERIAL PRIMARY KEY,
            snapshot_id       BIGINT NOT NULL REFERENCES fundlens.holdings_snapshot(id) ON DELETE CASCADE,
            isin              TEXT,
            ticker_nse        TEXT,
            ticker_bse        TEXT,
            company_name      TEXT NOT NULL,
            sector            TEXT,
            quantity          NUMERIC(20,4),
            market_value_cr   NUMERIC(18,2),
            pct_of_nav        NUMERIC(7,4)
        )
        """
    )
    op.execute("CREATE INDEX holding_snapshot_idx ON fundlens.holding(snapshot_id)")
    op.execute(
        "CREATE INDEX holding_isin_idx ON fundlens.holding(isin) WHERE isin IS NOT NULL"
    )

    op.execute(
        """
        CREATE TABLE fundlens.holding_diff (
            id                BIGSERIAL PRIMARY KEY,
            scheme_id         BIGINT NOT NULL REFERENCES fundlens.scheme(id) ON DELETE CASCADE,
            isin              TEXT NOT NULL,
            prev_snapshot_id  BIGINT REFERENCES fundlens.holdings_snapshot(id),
            curr_snapshot_id  BIGINT REFERENCES fundlens.holdings_snapshot(id),
            prev_qty          NUMERIC(20,4),
            curr_qty          NUMERIC(20,4),
            qty_delta         NUMERIC(20,4),
            prev_value_cr     NUMERIC(18,2),
            curr_value_cr     NUMERIC(18,2),
            action            TEXT NOT NULL
                CHECK (action IN ('NEW','ADD','TRIM','EXIT','HOLD')),
            created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
        )
        """
    )
    op.execute(
        "CREATE INDEX diff_scheme_idx ON fundlens.holding_diff(scheme_id, curr_snapshot_id)"
    )
    op.execute("CREATE INDEX diff_isin_idx ON fundlens.holding_diff(isin)")

    op.execute(
        """
        CREATE TABLE fundlens.isin_master (
            isin           TEXT PRIMARY KEY,
            ticker_nse     TEXT,
            ticker_bse     TEXT,
            company_name   TEXT NOT NULL,
            sector         TEXT,
            industry       TEXT,
            refreshed_at   TIMESTAMPTZ NOT NULL DEFAULT now()
        )
        """
    )

    op.execute(
        """
        CREATE TABLE fundlens.nav (
            id          BIGSERIAL PRIMARY KEY,
            scheme_id   BIGINT NOT NULL REFERENCES fundlens.scheme(id) ON DELETE CASCADE,
            date        DATE NOT NULL,
            nav         NUMERIC(12,4) NOT NULL,
            UNIQUE (scheme_id, date)
        )
        """
    )
    op.execute(
        "CREATE INDEX nav_scheme_date_idx ON fundlens.nav(scheme_id, date DESC)"
    )


def downgrade() -> None:
    # Drop in reverse dependency order
    op.execute("DROP TABLE IF EXISTS fundlens.nav")
    op.execute("DROP TABLE IF EXISTS fundlens.isin_master")
    op.execute("DROP TABLE IF EXISTS fundlens.holding_diff")
    op.execute("DROP TABLE IF EXISTS fundlens.holding")
    op.execute("DROP TABLE IF EXISTS fundlens.holdings_snapshot")
    op.execute("DROP TABLE IF EXISTS fundlens.scheme")
    op.execute("DROP TABLE IF EXISTS fundlens.fund_manager")
    op.execute("DROP TABLE IF EXISTS fundlens.amc")
    op.execute("DROP SCHEMA IF EXISTS fundlens CASCADE")
