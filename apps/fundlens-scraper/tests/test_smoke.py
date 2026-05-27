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
