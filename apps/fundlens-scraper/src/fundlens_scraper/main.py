"""Process entrypoint.

Runs three things in one process:
1. FastAPI app exposing /health (port FUNDLENS_HTTP_PORT, default 8001)
2. APScheduler with the cron job registry from jobs.py
3. Structured logging configured up front

Celery workers run as a separate process — see celery_app.py.
"""

from __future__ import annotations

import asyncio
import signal
from contextlib import asynccontextmanager
from typing import AsyncIterator

import uvicorn
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from fastapi import FastAPI

from .db import ping
from .jobs import register_jobs
from .logging_config import configure_logging, get_logger
from .settings import get_settings

log = get_logger("fundlens_scraper.main")
scheduler = AsyncIOScheduler()


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
    log.info("scheduler.start")
    register_jobs(scheduler)
    scheduler.start()
    try:
        yield
    finally:
        log.info("scheduler.shutdown")
        scheduler.shutdown(wait=False)


app = FastAPI(title="fundlens-scraper", lifespan=lifespan)


@app.get("/health")
async def health() -> dict[str, object]:
    db_ok = await ping()
    return {
        "service": "fundlens-scraper",
        "status": "ok" if db_ok else "degraded",
        "db": "ok" if db_ok else "unreachable",
        "scheduler": "running" if scheduler.running else "stopped",
        "jobs": len(scheduler.get_jobs()),
    }


def _install_signal_handlers(loop: asyncio.AbstractEventLoop) -> None:
    """Graceful shutdown on SIGTERM/SIGINT — only Unix; on Windows uvicorn handles it."""
    try:
        for sig in (signal.SIGTERM, signal.SIGINT):
            loop.add_signal_handler(sig, lambda: log.info("signal.received"))
    except NotImplementedError:
        # Windows: signal handlers via add_signal_handler are not supported
        pass


def run() -> None:
    settings = get_settings()
    configure_logging(settings.log_level)
    log.info("boot", port=settings.http_port)

    config = uvicorn.Config(
        app,
        host="0.0.0.0",  # noqa: S104 — container-bound
        port=settings.http_port,
        log_config=None,  # let structlog handle stdout
        access_log=False,
    )
    server = uvicorn.Server(config)

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    _install_signal_handlers(loop)
    loop.run_until_complete(server.serve())


if __name__ == "__main__":
    run()
