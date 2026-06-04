"""Diff engine — computes month-over-month position changes.

Produces DiffRow records by outer-joining previous and current holdings on ISIN,
then classifying each position change using a ±5% noise threshold.

These DiffRow records are written to fundlens.holding_diff by the Celery task
(wired in jobs.py, Task 24). The engine itself is a pure function — no DB I/O.
"""
from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal
from typing import Literal

Action = Literal["NEW", "ADD", "TRIM", "EXIT", "HOLD"]

_ADD_THRESHOLD = Decimal("1.05")   # +5%
_TRIM_THRESHOLD = Decimal("0.95")  # -5%


@dataclass(frozen=True)
class DiffRow:
    isin: str
    prev_qty: Decimal | None
    curr_qty: Decimal | None
    qty_delta: Decimal | None
    prev_value_cr: Decimal | None
    curr_value_cr: Decimal | None
    action: Action  # NEW | ADD | TRIM | EXIT | HOLD


def classify_action(
    prev_qty: Decimal | None,
    curr_qty: Decimal | None,
) -> Action:
    """Classify a position change into one of five actions."""
    if prev_qty is None and curr_qty is None:
        return "HOLD"  # both quantities missing — data quality gap, treat as no change
    if prev_qty is None:
        return "NEW"
    if curr_qty is None:
        return "EXIT"
    if curr_qty > prev_qty * _ADD_THRESHOLD:
        return "ADD"
    if curr_qty < prev_qty * _TRIM_THRESHOLD:
        return "TRIM"
    return "HOLD"


def compute_diffs(
    prev_holdings: dict[str, tuple[Decimal | None, Decimal | None]],
    curr_holdings: dict[str, tuple[Decimal | None, Decimal | None]],
) -> list[DiffRow]:
    """Outer-join prev and curr on ISIN and classify each position.

    Args:
        prev_holdings: dict mapping ISIN → (quantity, market_value_cr) for the
                       previous snapshot. Pass {} when no previous snapshot exists.
        curr_holdings: dict mapping ISIN → (quantity, market_value_cr) for the
                       current snapshot.

    Returns:
        List of DiffRow — one per ISIN that appears in either snapshot.
    """
    all_isins = set(prev_holdings) | set(curr_holdings)
    rows: list[DiffRow] = []

    for isin in all_isins:
        prev_qty, prev_val = prev_holdings.get(isin, (None, None))
        curr_qty, curr_val = curr_holdings.get(isin, (None, None))
        qty_delta = (curr_qty - prev_qty) if (curr_qty is not None and prev_qty is not None) else None
        action = classify_action(prev_qty, curr_qty)
        rows.append(
            DiffRow(
                isin=isin,
                prev_qty=prev_qty,
                curr_qty=curr_qty,
                qty_delta=qty_delta,
                prev_value_cr=prev_val,
                curr_value_cr=curr_val,
                action=action,
            )
        )
    return rows
