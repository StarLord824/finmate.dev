"""Turn raw extracted table rows into typed RawHolding records.

Handles:
- Indian number formatting (commas as lakh/crore separators, scientific notation)
- "-", "N.A.", "" treated as None
- Trailing "Equity Shares" / "Debentures" / "Bonds" suffixes stripped from names
- Skips total/subtotal/blank rows
"""
from __future__ import annotations

import re
from dataclasses import dataclass
from decimal import Decimal, InvalidOperation

from .header_detector import ColumnMap

_NULL_TOKENS = {"-", "n.a.", "na", "n/a", ""}
_NAME_SUFFIXES = tuple(sorted(
    (" equity shares", " equity", " - equity", " debentures", " bonds", " ncd", " - ncd"),
    key=len,
    reverse=True,
))
_TOTAL_PREFIXES = ("total ", "sub total", "subtotal", "grand total")


@dataclass(frozen=True)
class RawHolding:
    company_name_raw: str
    isin: str | None
    quantity: Decimal | None
    market_value_cr: Decimal | None
    pct_of_nav: Decimal | None
    sector_raw: str | None


def parse_indian_number(raw: object) -> Decimal | None:
    """Parse a possibly Indian-formatted number string to Decimal. Returns None for nulls."""
    if raw is None:
        return None
    s = str(raw).strip()
    if s.lower() in _NULL_TOKENS:
        return None
    # Strip commas (Indian lakh-format and Western thousands both work)
    s = s.replace(",", "")
    try:
        return Decimal(s)
    except InvalidOperation:
        return None


def _clean_name(raw: str) -> str:
    s = str(raw).strip()
    lower = s.lower()
    for suffix in _NAME_SUFFIXES:
        if lower.endswith(suffix):
            return s[: -len(suffix)].strip()
    return s


def _is_skip_row(row: list[object], cm: ColumnMap) -> bool:
    """Drop totals, blanks, and clearly-non-data rows."""
    if not row or all(c is None or str(c).strip() == "" for c in row):
        return True
    name_cell = row[cm.name] if cm.name < len(row) else None
    if name_cell is None:
        return True
    name = str(name_cell).strip().lower()
    if not name:
        return True
    return any(name.startswith(p) for p in _TOTAL_PREFIXES)


def normalize_rows(rows: list[list[object]], cm: ColumnMap) -> list[RawHolding]:
    out: list[RawHolding] = []
    for row in rows:
        if _is_skip_row(row, cm):
            continue
        name = _clean_name(str(row[cm.name]))
        isin_raw = row[cm.isin] if cm.isin < len(row) else None
        isin = re.sub(r"\s+", "", str(isin_raw)).upper() if isin_raw else None
        if isin and not re.match(r"^[A-Z0-9]{12}$", isin):
            isin = None
        qty = parse_indian_number(row[cm.qty] if cm.qty < len(row) else None)
        value = (
            parse_indian_number(row[cm.value])
            if cm.value >= 0 and cm.value < len(row)
            else None
        )
        pct = (
            parse_indian_number(row[cm.pct])
            if cm.pct >= 0 and cm.pct < len(row)
            else None
        )
        out.append(
            RawHolding(
                company_name_raw=name,
                isin=isin,
                quantity=qty,
                market_value_cr=value,
                pct_of_nav=pct,
                sector_raw=None,
            )
        )
    return out
