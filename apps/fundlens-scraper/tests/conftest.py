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


@pytest.fixture(autouse=False)
def clean_db(pg_container):
    """Truncate all fundlens tables after each test to prevent state leakage.

    Opt-in via `clean_db` parameter — only tests that modify DB data need this.
    """
    yield
    import psycopg
    url = pg_container.get_connection_url().replace("postgresql+psycopg2://", "postgresql://")
    with psycopg.connect(url) as conn:
        conn.execute(
            "TRUNCATE fundlens.nav, fundlens.holding_diff, fundlens.holding, "
            "fundlens.holdings_snapshot, fundlens.scheme, fundlens.fund_manager, "
            "fundlens.isin_master, fundlens.amc RESTART IDENTITY CASCADE"
        )
        conn.commit()
