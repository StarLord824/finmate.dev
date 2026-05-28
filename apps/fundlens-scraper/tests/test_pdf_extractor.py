from pathlib import Path

import pytest

from fundlens_scraper.parsers.pdf_extractor import extract_holdings_from_pdf

FIXTURE = Path(__file__).parent / "fixtures" / "ppfas_flexicap_202604.pdf"


@pytest.mark.skipif(not FIXTURE.exists(), reason="fixture PDF not present")
def test_extract_holdings_returns_normalized_rows():
    holdings = extract_holdings_from_pdf(FIXTURE.read_bytes())
    assert len(holdings) > 0, "should extract at least one holding"
    for h in holdings:
        assert h.company_name_raw
        assert h.quantity is not None or h.market_value_cr is not None


def test_extract_holdings_raises_on_empty_bytes():
    with pytest.raises(ValueError, match="empty PDF bytes"):
        extract_holdings_from_pdf(b"")


def test_extract_holdings_raises_on_no_tables_pdf():
    with pytest.raises(ValueError):
        extract_holdings_from_pdf(b"%PDF-1.4\n%%EOF\n")
