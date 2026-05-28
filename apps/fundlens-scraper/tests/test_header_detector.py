from fundlens_scraper.parsers.header_detector import find_header_row, ColumnMap


def test_finds_header_after_logo_rows():
    rows = [
        ["PPFAS Mutual Fund"],
        ["Portfolio Disclosure - April 2026"],
        [],
        ["Name of Instrument", "ISIN", "Quantity", "Market Value (₹ Lakhs)", "% to Net Assets"],
        ["Reliance Industries Ltd", "INE002A01018", "1234", "9876.5", "5.43"],
    ]
    idx, mapping = find_header_row(rows)
    assert idx == 3
    assert mapping == ColumnMap(name=0, isin=1, qty=2, value=3, pct=4)


def test_returns_none_when_no_header_found():
    rows = [["random"], ["unrelated"], ["text"]]
    idx, mapping = find_header_row(rows)
    assert idx is None
    assert mapping is None


def test_matches_alternate_column_names():
    rows = [
        ["Issuer Name", "ISIN Code", "No. of Units", "Market Value", "% of NAV"],
        ["Foo Corp", "INE111A01011", "10", "1.0", "0.5"],
    ]
    idx, mapping = find_header_row(rows)
    assert idx == 0
    assert mapping.name == 0 and mapping.isin == 1 and mapping.qty == 2
