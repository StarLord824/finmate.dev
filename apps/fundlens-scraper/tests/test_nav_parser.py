"""Tests for the AMFI NAVAll.txt parser."""
from decimal import Decimal
from pathlib import Path

import pytest

from fundlens_scraper.amfi.nav_parser import NavRecord, parse_nav_text

FIXTURE = Path(__file__).parent / "fixtures" / "navall_sample.txt"


def test_parse_nav_text_extracts_records():
    text = FIXTURE.read_text(encoding="utf-8")
    records = parse_nav_text(text)

    assert len(records) == 3
    codes = {r.scheme_code for r in records}
    assert "120503" in codes
    assert "120504" in codes
    assert "119551" in codes


def test_parse_nav_text_record_fields():
    text = FIXTURE.read_text(encoding="utf-8")
    records = parse_nav_text(text)
    first = next(r for r in records if r.scheme_code == "120503")

    assert first.scheme_name == "Parag Parikh Flexi Cap Fund - Regular Plan - Growth Option"
    assert first.nav == Decimal("68.5432")
    assert first.isin_growth == "INE0GROW..."   # col[2] = reinvestment = growth
    assert first.isin_idcw == "INE0IDCW..."     # col[1] = payout = IDCW
    assert first.date_str == "04-Jun-2026"


def test_parse_nav_text_skips_header_and_section_rows():
    """Header line and section/AMC name lines are not returned as records."""
    text = FIXTURE.read_text(encoding="utf-8")
    records = parse_nav_text(text)
    # All records must have a numeric scheme_code
    for r in records:
        assert r.scheme_code.isdigit()


def test_parse_nav_text_empty_input():
    records = parse_nav_text("")
    assert records == []
