from decimal import Decimal

import pytest

from fundlens_scraper.parsers.header_detector import ColumnMap
from fundlens_scraper.parsers.normalizer import RawHolding, normalize_rows, parse_indian_number


@pytest.mark.parametrize("raw,expected", [
    ("1,23,456", Decimal("123456")),
    ("1,23,456.78", Decimal("123456.78")),
    ("1.23", Decimal("1.23")),
    ("-", None),
    ("N.A.", None),
    ("", None),
    ("  9,876.5  ", Decimal("9876.5")),
    ("1.5E+05", Decimal("150000")),
])
def test_parse_indian_number(raw, expected):
    assert parse_indian_number(raw) == expected


def test_normalize_rows_skips_blank_and_total_rows():
    cm = ColumnMap(name=0, isin=1, qty=2, value=3, pct=4)
    data = [
        ["Reliance Industries Ltd", "INE002A01018", "1234", "9876.5", "5.43"],
        ["", "", "", "", ""],
        ["Total Equity", "", "", "100000", "85.0"],
        ["HDFC Bank Ltd Equity Shares", "INE040A01034", "5,678", "12,345.67", "8.91"],
    ]
    result = normalize_rows(data, cm)
    assert len(result) == 2
    assert result[0] == RawHolding(
        company_name_raw="Reliance Industries Ltd",
        isin="INE002A01018",
        quantity=Decimal("1234"),
        market_value_cr=Decimal("9876.5"),
        pct_of_nav=Decimal("5.43"),
        sector_raw=None,
    )
    assert result[1].company_name_raw == "HDFC Bank Ltd"  # "Equity Shares" suffix stripped
    assert result[1].quantity == Decimal("5678")


def test_normalize_uppercases_lowercase_isin():
    cm = ColumnMap(name=0, isin=1, qty=2, value=-1, pct=-1)
    data = [["Foo Corp", "ine002a01018", "100"]]
    result = normalize_rows(data, cm)
    assert len(result) == 1
    assert result[0].isin == "INE002A01018"


def test_normalize_strips_whitespace_inside_isin():
    cm = ColumnMap(name=0, isin=1, qty=2, value=-1, pct=-1)
    data = [["Foo Corp", "INE 002 A01018", "100"]]
    result = normalize_rows(data, cm)
    assert len(result) == 1
    assert result[0].isin == "INE002A01018"
