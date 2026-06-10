import datetime
from decimal import Decimal

import pytest
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from fundlens_scraper.models import Amc, Scheme, HoldingsSnapshot, Holding
from fundlens_scraper.parsers.normalizer import RawHolding
from fundlens_scraper.persistence import save_snapshot


def _async_url(url: str) -> str:
    return url.replace("postgresql://", "postgresql+asyncpg://", 1)


@pytest.mark.asyncio
async def test_save_snapshot_inserts_holdings(pg_container, clean_db):
    engine = create_async_engine(
        _async_url(
            pg_container.get_connection_url().replace("postgresql+psycopg2://", "postgresql://")
        )
    )
    try:
        Session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

        async with Session() as s:
            amc = Amc(slug="ppfas-mf", name="PPFAS Mutual Fund")
            s.add(amc)
            await s.flush()
            scheme = Scheme(amc_id=amc.id, slug="ppfas-flexi-cap-fund", name="PPFAS Flexi Cap Fund")
            s.add(scheme)
            await s.commit()
            scheme_id = scheme.id

        holdings = [
            RawHolding("Reliance Industries Ltd", "INE002A01018", Decimal("1000"), Decimal("100"), Decimal("5.0"), None),
            RawHolding("HDFC Bank Ltd", "INE040A01034", Decimal("2000"), Decimal("80"), Decimal("4.0"), None),
        ]
        sid_1 = await save_snapshot(
            Session,
            scheme_id=scheme_id,
            disclosure_date=datetime.date(2026, 4, 30),
            raw_file_url="https://example.com/x.pdf",
            raw_file_bytes=b"fake-pdf-bytes",
            parser_version="ppfas-v1",
            holdings=holdings,
        )
        assert sid_1 is not None

        # Idempotent re-run with same bytes → returns same id, no new rows
        sid_2 = await save_snapshot(
            Session,
            scheme_id=scheme_id,
            disclosure_date=datetime.date(2026, 4, 30),
            raw_file_url="https://example.com/x.pdf",
            raw_file_bytes=b"fake-pdf-bytes",
            parser_version="ppfas-v1",
            holdings=holdings,
        )
        assert sid_1 == sid_2

        async with Session() as s:
            result = await s.execute(select(Holding).where(Holding.snapshot_id == sid_1))
            rows = result.scalars().all()
            assert len(rows) == 2
    finally:
        await engine.dispose()
