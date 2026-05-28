"""Abstract protocol and dataclasses for AMC scrapers.

Every AMC scraper implements AbstractAmcScraper. The Protocol allows duck-typing
without inheritance — just implement the three methods and the class attributes.
"""
from __future__ import annotations

import datetime
from dataclasses import dataclass
from typing import Protocol, runtime_checkable

from ..parsers.normalizer import RawHolding  # re-exported for scraper convenience


@dataclass(frozen=True)
class PortfolioRef:
    """Identifies a single disclosure file to be fetched and parsed."""

    scheme_slug: str
    scheme_amfi_code: str | None
    disclosure_date: datetime.date
    file_url: str
    file_ext: str  # 'pdf' | 'xlsx' | 'xls'


@runtime_checkable
class AbstractAmcScraper(Protocol):
    slug: str
    portfolio_index_url: str
    parser_version: str

    async def discover_portfolios(self) -> list[PortfolioRef]: ...
    async def fetch_portfolio(self, ref: PortfolioRef) -> bytes: ...
    def parse(self, file_bytes: bytes, file_ext: str) -> list[RawHolding]: ...
