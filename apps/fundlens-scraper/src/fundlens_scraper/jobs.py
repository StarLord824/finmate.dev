"""APScheduler job registry.

Job schedule (all times IST = UTC+5:30):
  fetch_nav          — 19:00 daily (after AMFI publishes ~17:30)
  refresh_isin_master — 02:00 on the 1st of each month
  scrape_ppfas_mf    — every 30 min, 11:00-17:00 IST, weekdays only
  health_check       — every 5 min
"""
from __future__ import annotations

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

from .logging_config import get_logger

log = get_logger("fundlens_scraper.jobs")


async def heartbeat() -> None:
    log.info("heartbeat")


async def _run_fetch_nav() -> None:
    """Fetch and store the daily AMFI NAVAll.txt."""
    from .amfi.nav_fetcher import fetch_nav
    log.info("fetch_nav.start")
    try:
        records = await fetch_nav()
        log.info("fetch_nav.done", count=len(records))
    except Exception as exc:
        log.error("fetch_nav.failed", error=str(exc))


async def _run_refresh_isin_master() -> None:
    """Download the NSE ISIN master and upsert isin_master table."""
    from .http_client import fetch_bytes
    from .settings import get_settings
    from .isin.nse_master import parse_equity_csv
    log.info("refresh_isin_master.start")
    try:
        settings = get_settings()
        raw = await fetch_bytes(settings.nse_isin_url)
        records = parse_equity_csv(raw.decode("utf-8", errors="replace"))
        log.info("refresh_isin_master.done", count=len(records))
    except Exception as exc:
        log.error("refresh_isin_master.failed", error=str(exc))


async def _run_scrape_ppfas() -> None:
    """Run the PPFAS scraper — discover + fetch + parse + persist."""
    from .scrapers.registry import SCRAPER_REGISTRY
    from .scrapers import ppfas as _  # ensure module loaded and registered  # noqa: F401
    from .db import get_session_factory
    from .persistence import save_snapshot
    from .models import Scheme as SchemeModel
    from sqlalchemy import select

    log.info("scrape.start", amc="ppfas-mf")
    try:
        scraper = SCRAPER_REGISTRY["ppfas-mf"]()
        refs = await scraper.discover_portfolios()
        session_factory = get_session_factory()

        for ref in refs:
            # Resolve scheme ID
            async with session_factory() as session:
                result = await session.execute(
                    select(SchemeModel.id).where(SchemeModel.slug == ref.scheme_slug)
                )
                scheme_id = result.scalar_one_or_none()

            if scheme_id is None:
                log.warning("scrape.scheme_not_found", scheme=ref.scheme_slug)
                continue

            try:
                file_bytes = await scraper.fetch_portfolio(ref)
                holdings = scraper.parse(file_bytes, ref.file_ext)
                snapshot_id = await save_snapshot(
                    session_factory,
                    scheme_id=scheme_id,
                    disclosure_date=ref.disclosure_date,
                    raw_file_url=ref.file_url,
                    raw_file_bytes=file_bytes,
                    parser_version=scraper.parser_version,
                    holdings=holdings,
                )
                log.info(
                    "scrape.scheme_done",
                    scheme=ref.scheme_slug,
                    holdings=len(holdings),
                    snapshot_id=snapshot_id,
                )
            except Exception as exc:
                log.warning("scrape.scheme_failed", scheme=ref.scheme_slug, error=str(exc))

        log.info("scrape.done", amc="ppfas-mf")
    except Exception as exc:
        log.error("scrape.failed", amc="ppfas-mf", error=str(exc))


def register_jobs(scheduler: AsyncIOScheduler) -> None:
    """Register all FundLens cron jobs."""

    # Health check every 5 minutes
    scheduler.add_job(
        heartbeat,
        trigger=CronTrigger(minute="*/5"),
        id="heartbeat",
        replace_existing=True,
    )

    # Daily NAV fetch at 19:00 IST (13:30 UTC)
    scheduler.add_job(
        _run_fetch_nav,
        trigger=CronTrigger(hour=13, minute=30, timezone="UTC"),
        id="fetch_nav",
        replace_existing=True,
    )

    # Monthly ISIN master refresh at 02:00 IST on the 1st (20:30 UTC previous day)
    scheduler.add_job(
        _run_refresh_isin_master,
        trigger=CronTrigger(day=1, hour=20, minute=30, timezone="UTC"),
        id="refresh_isin_master",
        replace_existing=True,
    )

    # PPFAS scraper — every 30 min, 11:00-17:00 IST weekdays (05:30-11:30 UTC)
    scheduler.add_job(
        _run_scrape_ppfas,
        trigger=CronTrigger(
            day_of_week="mon-fri",
            hour="5-11",
            minute="*/30",
            timezone="UTC",
        ),
        id="scrape_ppfas_mf",
        replace_existing=True,
    )

    log.info("jobs.registered", count=len(scheduler.get_jobs()))
