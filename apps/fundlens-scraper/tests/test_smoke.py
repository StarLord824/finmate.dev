"""Bootstrap-only smoke tests. Real coverage lands with the first scraper."""

from __future__ import annotations

from fundlens_scraper import __version__
from fundlens_scraper.settings import Settings


def test_version() -> None:
    assert __version__ == "0.0.1"


def test_settings_load_with_overrides(monkeypatch) -> None:  # type: ignore[no-untyped-def]
    monkeypatch.setenv("FUNDLENS_DATABASE_URL", "postgresql://test/test")
    monkeypatch.setenv("FUNDLENS_REDIS_URL", "redis://test:6379/1")
    s = Settings()  # type: ignore[call-arg]
    assert s.database_url == "postgresql://test/test"
    assert s.redis_url == "redis://test:6379/1"


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
