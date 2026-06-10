"""Tests for the NSE ISIN master parser."""
from pathlib import Path

import pytest

from fundlens_scraper.isin.nse_master import NseRecord, parse_equity_csv
from fundlens_scraper.isin.resolver import IsinResolver

FIXTURE = Path(__file__).parent / "fixtures" / "equity_l_sample.csv"


def test_parse_equity_csv_returns_records():
    text = FIXTURE.read_text(encoding="utf-8")
    records = parse_equity_csv(text)
    assert len(records) == 5
    isins = {r.isin for r in records}
    assert "INE002A01018" in isins
    assert "INE040A01034" in isins


def test_parse_equity_csv_record_fields():
    text = FIXTURE.read_text(encoding="utf-8")
    records = parse_equity_csv(text)
    reliance = next(r for r in records if r.isin == "INE002A01018")
    assert reliance.ticker_nse == "RELIANCE"
    assert reliance.company_name == "Reliance Industries Limited"


def test_parse_equity_csv_empty():
    records = parse_equity_csv("")
    assert records == []


def test_resolver_lookup_known_isin():
    text = FIXTURE.read_text(encoding="utf-8")
    records = parse_equity_csv(text)
    resolver = IsinResolver(records)
    result = resolver.lookup("INE040A01034")
    assert result is not None
    assert result.ticker_nse == "HDFCBANK"


def test_resolver_lookup_unknown_isin():
    resolver = IsinResolver([])
    assert resolver.lookup("INE999Z99999") is None
