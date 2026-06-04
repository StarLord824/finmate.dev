"""Parse AMFI NAVAll.txt feed into NavRecord objects.

Format (semicolon-delimited, ~20k rows):
  Scheme Code;ISIN Div Payout/IDCW;ISIN Div Reinvestment;Scheme Name;NAV;Repurchase;Sale;Date

Section headers (AMC names, scheme-type groups) have fewer than 8 semicolons
and a non-numeric first token — they are skipped.
"""
from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal, InvalidOperation


@dataclass(frozen=True)
class NavRecord:
    scheme_code: str
    isin_growth: str | None   # None when column is "-" or empty
    isin_idcw: str | None
    scheme_name: str
    nav: Decimal | None
    date_str: str


def _parse_isin(raw: str) -> str | None:
    s = raw.strip()
    return None if s in ("-", "") else s


def _parse_nav(raw: str) -> Decimal | None:
    s = raw.strip()
    if not s or s in ("N.A.", "-"):
        return None
    try:
        return Decimal(s)
    except InvalidOperation:
        return None


def parse_nav_text(text: str) -> list[NavRecord]:
    """Parse the full NAVAll.txt content into a list of NavRecord objects."""
    if not text.strip():
        return []

    records: list[NavRecord] = []
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        parts = line.split(";")
        if len(parts) != 8:
            continue  # header, section, or AMC-name row
        scheme_code = parts[0].strip()
        if not scheme_code.isdigit():
            continue  # column header row
        records.append(
            NavRecord(
                scheme_code=scheme_code,
                isin_growth=_parse_isin(parts[2]),   # col[2] = ISIN Div Reinvestment = growth
                isin_idcw=_parse_isin(parts[1]),     # col[1] = ISIN Div Payout/IDCW
                scheme_name=parts[3].strip(),
                nav=_parse_nav(parts[4]),
                date_str=parts[7].strip(),
            )
        )
    return records
