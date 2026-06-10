"""Locate the header row in a table extracted from a PDF or Excel disclosure.

AMC tables put the header anywhere from row 0 to row ~6 (after logos and
boilerplate). This module finds it by scoring each row against a synonym map.
"""
from __future__ import annotations

from dataclasses import dataclass

NAME_SYNONYMS = {"name of instrument", "instrument", "issuer name", "security name", "company name"}
ISIN_SYNONYMS = {"isin", "isin code", "isin number"}
QTY_SYNONYMS = {"quantity", "no. of units", "no of units", "qty"}
VALUE_SYNONYMS = {"market value", "market cap", "market value (rs. in lakhs)", "market value (₹ lakhs)", "market value (rs. lakhs)"}
PCT_SYNONYMS = {"% to net assets", "% of net assets", "% of nav", "% to nav", "% of net asset value"}


@dataclass(frozen=True)
class ColumnMap:
    name: int
    isin: int
    qty: int
    value: int
    pct: int


def _matches(cell: object, synonyms: set[str]) -> bool:
    if cell is None:
        return False
    s = str(cell).strip().lower()
    return any(syn in s for syn in synonyms)


def _find_col(row: list[object], synonyms: set[str]) -> int | None:
    for i, cell in enumerate(row):
        if _matches(cell, synonyms):
            return i
    return None


def find_header_row(rows: list[list[object]]) -> tuple[int | None, ColumnMap | None]:
    """Return (row_index, ColumnMap) for the first row matching ≥3 column synonyms.

    Required: name + isin + qty. value and pct are optional but recorded if found.
    """
    for idx, row in enumerate(rows):
        if not row:
            continue
        name_col = _find_col(row, NAME_SYNONYMS)
        isin_col = _find_col(row, ISIN_SYNONYMS)
        qty_col = _find_col(row, QTY_SYNONYMS)
        value_col = _find_col(row, VALUE_SYNONYMS)
        pct_col = _find_col(row, PCT_SYNONYMS)

        required = [name_col, isin_col, qty_col]
        if all(c is not None for c in required):
            return idx, ColumnMap(
                name=name_col,
                isin=isin_col,
                qty=qty_col,
                value=value_col if value_col is not None else -1,
                pct=pct_col if pct_col is not None else -1,
            )
    return None, None
