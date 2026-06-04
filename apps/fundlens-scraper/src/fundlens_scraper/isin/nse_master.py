"""Parse NSE EQUITY_L.csv into NseRecord objects.

NSE publishes the ISIN master at:
  https://archives.nseindia.com/content/equities/EQUITY_L.csv

Columns: SYMBOL,NAME OF COMPANY,SERIES,DATE OF LISTING,PAID UP VALUE,
         MARKET LOT,ISIN NUMBER,FACE VALUE
"""
from __future__ import annotations

import csv
import io
from dataclasses import dataclass


@dataclass(frozen=True)
class NseRecord:
    isin: str
    ticker_nse: str
    company_name: str


def parse_equity_csv(text: str) -> list[NseRecord]:
    """Parse the full EQUITY_L.csv content into NseRecord objects."""
    if not text.strip():
        return []

    records: list[NseRecord] = []
    reader = csv.DictReader(io.StringIO(text))
    for row in reader:
        isin = row.get("ISIN NUMBER", "").strip()
        ticker = row.get("SYMBOL", "").strip()
        name = row.get("NAME OF COMPANY", "").strip()
        if not isin:
            continue
        records.append(NseRecord(isin=isin, ticker_nse=ticker, company_name=name))
    return records
