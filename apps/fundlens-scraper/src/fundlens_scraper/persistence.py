"""Atomic snapshot writer.

Contract: save_snapshot() either inserts (snapshot + N holdings) inside one
transaction, or is a no-op because an identical snapshot (same sha256) already
exists for this scheme. Returns the snapshot id in both cases.
"""
from __future__ import annotations

import datetime
import hashlib
from collections.abc import Iterable

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker

from .models import Holding, HoldingsSnapshot
from .parsers.normalizer import RawHolding


async def save_snapshot(
    session_factory: async_sessionmaker[AsyncSession],
    *,
    scheme_id: int,
    disclosure_date: datetime.date,
    raw_file_url: str,
    raw_file_bytes: bytes,
    parser_version: str,
    holdings: Iterable[RawHolding],
) -> int:
    """Insert a holdings_snapshot + child holdings. Idempotent by (scheme_id, sha256).

    Returns the snapshot id (either newly inserted or pre-existing).
    """
    sha = hashlib.sha256(raw_file_bytes).hexdigest()

    async with session_factory() as session:
        # Idempotency check
        existing = await session.execute(
            select(HoldingsSnapshot.id)
            .where(HoldingsSnapshot.scheme_id == scheme_id)
            .where(HoldingsSnapshot.raw_file_sha256 == sha)
        )
        if existing_id := existing.scalar_one_or_none():
            return existing_id

        snap = HoldingsSnapshot(
            scheme_id=scheme_id,
            disclosure_date=disclosure_date,
            raw_file_url=raw_file_url,
            raw_file_sha256=sha,
            parser_version=parser_version,
        )
        session.add(snap)
        await session.flush()  # populate snap.id

        for h in holdings:
            session.add(
                Holding(
                    snapshot_id=snap.id,
                    isin=h.isin,
                    company_name=h.company_name_raw,
                    sector=h.sector_raw,
                    quantity=h.quantity,
                    market_value_cr=h.market_value_cr,
                    pct_of_nav=h.pct_of_nav,
                )
            )
        await session.commit()
        return snap.id
