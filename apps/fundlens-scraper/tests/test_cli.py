"""Tests for the CLI run command.

Tests the `run` command end-to-end with mocked HTTP and mocked persistence.
Does NOT require Docker/testcontainers.
"""
import datetime
from decimal import Decimal
from unittest.mock import AsyncMock, MagicMock

import pytest
from typer.testing import CliRunner

from fundlens_scraper.cli import app, _run_async
from fundlens_scraper.parsers.normalizer import RawHolding
from fundlens_scraper.scrapers.base import PortfolioRef

runner = CliRunner()

FAKE_HOLDINGS = [
    RawHolding(
        "Reliance Industries Ltd",
        "INE002A01018",
        Decimal("1000"),
        Decimal("100"),
        Decimal("5.0"),
        None,
    ),
]

FAKE_REF = PortfolioRef(
    scheme_slug="ppfas-flexi-cap-fund",
    scheme_amfi_code=None,
    disclosure_date=datetime.date(2026, 4, 30),
    file_url="https://amc.ppfas.com/downloads/portfolio-disclosure/PPFAS_FlexiCap_202604.pdf",
    file_ext="pdf",
)


def test_run_command_exists():
    """The `run` subcommand is registered in the CLI."""
    result = runner.invoke(app, ["run", "--help"])
    assert result.exit_code == 0
    assert "amc" in result.output.lower()


@pytest.mark.asyncio
async def test_run_command_invokes_pipeline(monkeypatch):
    """run --amc ppfas-mf discovers, fetches, parses, and persists holdings."""
    # Mock scraper behaviour
    mock_scraper = MagicMock()
    mock_scraper.discover_portfolios = AsyncMock(return_value=[FAKE_REF])
    mock_scraper.fetch_portfolio = AsyncMock(return_value=b"fake-pdf")
    mock_scraper.parse = MagicMock(return_value=FAKE_HOLDINGS)

    # Mock registry lookup
    import fundlens_scraper.scrapers.registry as registry_mod
    monkeypatch.setitem(registry_mod.SCRAPER_REGISTRY, "ppfas-mf", lambda: mock_scraper)

    # Mock save_snapshot at the source module so the lazy import inside _run_async
    # picks up the mock (monkeypatching the source is the correct approach when
    # the name is imported lazily inside the function body).
    save_mock = AsyncMock(return_value=42)
    monkeypatch.setattr("fundlens_scraper.persistence.save_snapshot", save_mock)

    # Mock _resolve_scheme_id so it returns a valid int instead of raising
    monkeypatch.setattr("fundlens_scraper.cli._resolve_scheme_id", lambda slug: 1)

    # Mock _get_session_factory so no DB connection is needed
    monkeypatch.setattr(
        "fundlens_scraper.cli._get_session_factory",
        MagicMock(return_value=MagicMock()),
    )

    await _run_async("ppfas-mf")
    assert save_mock.called
    save_mock.assert_awaited_once()
