"""Tests for the scraper registry and base protocol."""
import datetime
from typing import ClassVar

import pytest

from fundlens_scraper.scrapers.base import AbstractAmcScraper, PortfolioRef, RawHolding
from fundlens_scraper.scrapers.registry import SCRAPER_REGISTRY, register


def test_register_and_lookup():
    """A registered scraper class is retrievable by slug."""

    class FakeScraper:
        slug: ClassVar[str] = "fake-mf"
        portfolio_index_url: ClassVar[str] = "https://example.com/portfolios"
        parser_version: ClassVar[str] = "fake-v1"

        async def discover_portfolios(self) -> list[PortfolioRef]:
            return []

        async def fetch_portfolio(self, ref: PortfolioRef) -> bytes:
            return b""

        def parse(self, file_bytes: bytes, file_ext: str) -> list[RawHolding]:
            return []

    register("fake-mf", FakeScraper)
    assert SCRAPER_REGISTRY["fake-mf"] is FakeScraper


def test_portfolio_ref_is_frozen():
    ref = PortfolioRef(
        scheme_slug="test-fund",
        scheme_amfi_code="123456",
        disclosure_date=datetime.date(2026, 4, 30),
        file_url="https://example.com/file.pdf",
        file_ext="pdf",
    )
    with pytest.raises(Exception):
        ref.scheme_slug = "changed"  # type: ignore[misc]
