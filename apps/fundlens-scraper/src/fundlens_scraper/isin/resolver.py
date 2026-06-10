"""ISIN → NSE record resolver.

Wraps a parsed NseRecord list in a dict for O(1) lookups.
Used by the `refresh_isin_master` job (Task 24) to populate
fundlens.isin_master with ticker + company name per ISIN.
"""
from __future__ import annotations

from .nse_master import NseRecord


class IsinResolver:
    def __init__(self, records: list[NseRecord]) -> None:
        self._index: dict[str, NseRecord] = {r.isin.upper(): r for r in records}

    def lookup(self, isin: str) -> NseRecord | None:
        """Return the NseRecord for this ISIN, or None if not in master."""
        return self._index.get(isin.upper())
