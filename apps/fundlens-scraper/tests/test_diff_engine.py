"""Tests for the diff engine.

Pure-function tests — no DB required.
"""
from decimal import Decimal

import pytest

from fundlens_scraper.diff_engine import (
    DiffRow,
    classify_action,
    compute_diffs,
)


@pytest.mark.parametrize("prev_qty,curr_qty,expected", [
    (None, Decimal("100"), "NEW"),
    (Decimal("100"), None, "EXIT"),
    (Decimal("100"), Decimal("110"), "ADD"),   # +10% > 5% threshold
    (Decimal("100"), Decimal("88"), "TRIM"),   # -12% < -5% threshold
    (Decimal("100"), Decimal("103"), "HOLD"),  # +3% within ±5%
    (Decimal("100"), Decimal("97"), "HOLD"),   # -3% within ±5%
    (Decimal("100"), Decimal("105"), "HOLD"),  # exactly +5% → boundary is HOLD
    (Decimal("100"), Decimal("95"), "HOLD"),   # exactly -5% → boundary is HOLD
    (None, None, "HOLD"),                      # both quantities missing — data quality gap, not a new position
])
def test_classify_action(prev_qty, curr_qty, expected):
    assert classify_action(prev_qty, curr_qty) == expected


def test_compute_diffs_first_snapshot_all_new():
    """When there is no previous snapshot, all holdings are NEW."""
    curr = {
        "INE002A01018": (Decimal("1000"), Decimal("100.0")),
        "INE040A01034": (Decimal("2000"), Decimal("80.0")),
    }
    diffs = compute_diffs(prev_holdings={}, curr_holdings=curr)
    assert len(diffs) == 2
    assert all(d.action == "NEW" for d in diffs)
    assert all(d.prev_qty is None for d in diffs)


def test_compute_diffs_exit_detected():
    """Holdings in prev but not in curr are EXIT."""
    prev = {"INE002A01018": (Decimal("1000"), Decimal("100.0"))}
    curr = {"INE040A01034": (Decimal("500"), Decimal("50.0"))}
    diffs = compute_diffs(prev_holdings=prev, curr_holdings=curr)
    assert len(diffs) == 2
    exit_diff = next(d for d in diffs if d.isin == "INE002A01018")
    assert exit_diff.action == "EXIT"
    assert exit_diff.curr_qty is None
    new_diff = next(d for d in diffs if d.isin == "INE040A01034")
    assert new_diff.action == "NEW"


def test_compute_diffs_mixed_actions():
    """A realistic portfolio diff with all action types."""
    prev = {
        "ISIN_HOLD": (Decimal("100"), Decimal("10.0")),
        "ISIN_ADD":  (Decimal("100"), Decimal("10.0")),
        "ISIN_TRIM": (Decimal("100"), Decimal("10.0")),
        "ISIN_EXIT": (Decimal("100"), Decimal("10.0")),
    }
    curr = {
        "ISIN_HOLD": (Decimal("102"), Decimal("10.2")),   # +2% → HOLD
        "ISIN_ADD":  (Decimal("120"), Decimal("12.0")),   # +20% → ADD
        "ISIN_TRIM": (Decimal("80"),  Decimal("8.0")),    # -20% → TRIM
        "ISIN_NEW":  (Decimal("50"),  Decimal("5.0")),    # new → NEW
        # ISIN_EXIT absent → EXIT
    }
    diffs = compute_diffs(prev, curr)
    by_isin = {d.isin: d for d in diffs}

    assert by_isin["ISIN_HOLD"].action == "HOLD"
    assert by_isin["ISIN_ADD"].action == "ADD"
    assert by_isin["ISIN_TRIM"].action == "TRIM"
    assert by_isin["ISIN_EXIT"].action == "EXIT"
    assert by_isin["ISIN_NEW"].action == "NEW"
