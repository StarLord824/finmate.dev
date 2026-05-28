"""PPFAS Mutual Fund scraper — Tier 1 (predictable URL pattern).

Disclosure URL pattern:
  https://amc.ppfas.com/downloads/portfolio-disclosure/PPFAS_{SchemeKey}_{YYYYMM}.pdf

Scheme keys are stable slugs maintained here. PPFAS has 7-8 schemes; the list
changes rarely (new fund launch ~once per year).
"""
from __future__ import annotations

import calendar
import datetime
from typing import ClassVar

import httpx

from ..http_client import build_client, fetch_bytes
from ..parsers.normalizer import RawHolding
from ..parsers.pdf_extractor import extract_holdings_from_pdf
from .base import PortfolioRef
from .registry import register

_BASE_URL = "https://amc.ppfas.com/downloads/portfolio-disclosure"

# Mapping of scheme_slug → URL key used by PPFAS in their disclosure filenames.
_SCHEMES: dict[str, str] = {
    "ppfas-flexi-cap-fund": "FlexiCap",
    "ppfas-tax-saver-fund": "TaxSaver",
    "ppfas-liquid-fund": "Liquid",
    "ppfas-overnight-fund": "Overnight",
    "ppfas-conservative-hybrid-fund": "ConservativeHybrid",
    "ppfas-arbitrage-fund": "Arbitrage",
    "ppfas-dynamic-asset-allocation-fund": "DynamicAssetAllocation",
}


@register("ppfas-mf")
class PpfasScraper:
    slug: ClassVar[str] = "ppfas-mf"
    portfolio_index_url: ClassVar[str] = _BASE_URL
    parser_version: ClassVar[str] = "ppfas-v1"

    async def discover_portfolios(
        self, *, _today: datetime.date | None = None
    ) -> list[PortfolioRef]:
        """Generate PortfolioRef for each scheme for the most recent disclosure month.

        `_today` is an optional override for the current date — used in tests to
        make the output deterministic without monkeypatching datetime.
        """
        today = _today if _today is not None else datetime.date.today()
        # Disclosures are for the previous month
        if today.month == 1:
            disc_year, disc_month = today.year - 1, 12
        else:
            disc_year, disc_month = today.year, today.month - 1
        # Last day of disclosure month
        last_day = calendar.monthrange(disc_year, disc_month)[1]
        disclosure_date = datetime.date(disc_year, disc_month, last_day)
        yyyymm = f"{disc_year}{disc_month:02d}"

        refs = []
        for scheme_slug, url_key in _SCHEMES.items():
            file_url = f"{_BASE_URL}/PPFAS_{url_key}_{yyyymm}.pdf"
            refs.append(
                PortfolioRef(
                    scheme_slug=scheme_slug,
                    scheme_amfi_code=None,
                    disclosure_date=disclosure_date,
                    file_url=file_url,
                    file_ext="pdf",
                )
            )
        return refs

    async def fetch_portfolio(
        self, ref: PortfolioRef, *, transport: httpx.AsyncBaseTransport | None = None
    ) -> bytes:
        """Fetch the disclosure PDF bytes. `transport` allows test injection."""
        async with build_client(transport=transport) as client:
            return await fetch_bytes(ref.file_url, client=client)

    def parse(self, file_bytes: bytes, file_ext: str) -> list[RawHolding]:
        """Parse a PPFAS PDF disclosure into RawHolding records."""
        if file_ext != "pdf":
            raise ValueError(f"PpfasScraper only handles PDF; got {file_ext!r}")
        return extract_holdings_from_pdf(file_bytes)
