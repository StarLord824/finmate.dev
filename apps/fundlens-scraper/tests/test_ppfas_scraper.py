"""Tests for the PPFAS scraper.

Uses httpx.MockTransport to avoid real network calls.
"""
import datetime
from pathlib import Path

import httpx
import pytest

from fundlens_scraper.scrapers.ppfas import PpfasScraper
from fundlens_scraper.scrapers.base import PortfolioRef
from fundlens_scraper.scrapers.registry import SCRAPER_REGISTRY

FIXTURE_PDF = Path(__file__).parent / "fixtures" / "ppfas_flexicap_202604.pdf"


def test_ppfas_registered():
    """PpfasScraper is in the registry under 'ppfas-mf'."""
    assert "ppfas-mf" in SCRAPER_REGISTRY
    assert SCRAPER_REGISTRY["ppfas-mf"] is PpfasScraper


@pytest.mark.asyncio
async def test_discover_portfolios_returns_refs_for_current_month(monkeypatch):
    """discover_portfolios returns PortfolioRef objects for each PPFAS scheme."""
    scraper = PpfasScraper()
    refs = await scraper.discover_portfolios(_today=datetime.date(2026, 5, 10))

    assert len(refs) >= 1
    for ref in refs:
        assert isinstance(ref, PortfolioRef)
        assert ref.file_ext == "pdf"
        assert "ppfas" in ref.file_url.lower()
        assert ref.disclosure_date == datetime.date(2026, 4, 30)  # last month end


@pytest.mark.asyncio
async def test_fetch_portfolio_uses_http_client(monkeypatch):
    """fetch_portfolio makes a GET request to the file_url."""
    captured_urls: list[str] = []

    def handler(request: httpx.Request) -> httpx.Response:
        captured_urls.append(str(request.url))
        return httpx.Response(200, content=b"fake-pdf-content")

    transport = httpx.MockTransport(handler)

    monkeypatch.setenv("FUNDLENS_DATABASE_URL", "postgresql://test/test")
    import fundlens_scraper.settings as settings_mod
    monkeypatch.setattr(settings_mod, "_settings", None)

    scraper = PpfasScraper()
    ref = PortfolioRef(
        scheme_slug="ppfas-flexi-cap-fund",
        scheme_amfi_code=None,
        disclosure_date=datetime.date(2026, 4, 30),
        file_url="https://amc.ppfas.com/downloads/portfolio-disclosure/PPFAS_FlexiCap_202604.pdf",
        file_ext="pdf",
    )
    result = await scraper.fetch_portfolio(ref, transport=transport)
    assert result == b"fake-pdf-content"
    assert len(captured_urls) == 1
    assert "ppfas.com" in captured_urls[0]


@pytest.mark.skipif(not FIXTURE_PDF.exists(), reason="fixture PDF not present")
def test_parse_returns_holdings():
    """parse() extracts holdings from a real PPFAS PDF."""
    scraper = PpfasScraper()
    holdings = scraper.parse(FIXTURE_PDF.read_bytes(), "pdf")
    assert len(holdings) > 0
    for h in holdings:
        assert h.company_name_raw
