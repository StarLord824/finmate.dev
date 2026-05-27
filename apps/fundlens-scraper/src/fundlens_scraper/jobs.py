"""APScheduler job registry.

Bootstrap stub — concrete job functions (fetch_nav, refresh_isin_master,
scrape_amc_<slug>, compute_diffs, update_amc_aggregates) are added in
subsequent plan chunks.
"""

from __future__ import annotations

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

from .logging_config import get_logger

log = get_logger("fundlens_scraper.jobs")


async def heartbeat() -> None:
    """Placeholder job — every 5 minutes, just proves the scheduler is alive."""
    log.info("heartbeat")


def register_jobs(scheduler: AsyncIOScheduler) -> None:
    """Register all FundLens cron jobs.

    Real jobs land here once the scrapers, AMFI/NSE fetchers, and diff engine
    are implemented. For Bootstrap we register a single heartbeat so the
    /health endpoint can report job count > 0.
    """
    scheduler.add_job(
        heartbeat,
        trigger=CronTrigger(minute="*/5"),
        id="heartbeat",
        replace_existing=True,
    )
    log.info("jobs.registered", count=len(scheduler.get_jobs()))
