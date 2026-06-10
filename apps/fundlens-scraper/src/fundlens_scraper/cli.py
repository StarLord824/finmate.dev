"""CLI entry point for fundlens-scraper.

Usage:
    fundlens-scraper migrate          # alembic upgrade head
    fundlens-scraper health           # one-shot DB ping
    fundlens-scraper run --amc ppfas-mf
"""
from __future__ import annotations

import asyncio
import subprocess

import typer

from .logging_config import configure_logging, get_logger
from .settings import get_settings

app = typer.Typer(help="FundLens scraper CLI")
log = get_logger("fundlens_scraper.cli")


@app.command()
def migrate() -> None:
    """Run alembic upgrade head against FUNDLENS_DATABASE_URL."""
    configure_logging(get_settings().log_level)
    subprocess.run(["alembic", "upgrade", "head"], check=True)


@app.command()
def health() -> None:
    """One-shot ping of the configured Postgres."""
    from .db import ping

    configure_logging(get_settings().log_level)
    ok = asyncio.run(ping())
    if ok:
        typer.echo("ok")
        raise typer.Exit(0)
    typer.echo("unreachable")
    raise typer.Exit(1)


def _get_session_factory():
    """Build the SQLAlchemy async session factory from current settings."""
    from .db import get_session_factory

    return get_session_factory()


@app.command()
def run(
    amc: str = typer.Option(..., "--amc", help="AMC slug (e.g. ppfas-mf)"),
    log_level: str = typer.Option("INFO", "--log-level"),
) -> None:
    """Discover, fetch, parse, and persist portfolio disclosures for one AMC."""
    configure_logging(log_level)
    asyncio.run(_run_async(amc))


async def _run_async(amc_slug: str) -> None:
    from .persistence import save_snapshot
    from .scrapers.registry import SCRAPER_REGISTRY

    if amc_slug not in SCRAPER_REGISTRY:
        log.error("unknown_amc", slug=amc_slug, known=list(SCRAPER_REGISTRY.keys()))
        raise typer.Exit(code=1)

    scraper_cls = SCRAPER_REGISTRY[amc_slug]
    scraper = scraper_cls()
    session_factory = _get_session_factory()

    log.info("discover.start", amc=amc_slug)
    refs = await scraper.discover_portfolios()
    log.info("discover.done", amc=amc_slug, count=len(refs))

    for ref in refs:
        log.info("fetch.start", scheme=ref.scheme_slug, url=ref.file_url)
        try:
            file_bytes = await scraper.fetch_portfolio(ref)
        except Exception as exc:
            log.warning("fetch.failed", scheme=ref.scheme_slug, error=str(exc))
            continue

        log.info("parse.start", scheme=ref.scheme_slug)
        try:
            holdings = scraper.parse(file_bytes, ref.file_ext)
        except Exception as exc:
            log.warning("parse.failed", scheme=ref.scheme_slug, error=str(exc))
            continue

        log.info("persist.start", scheme=ref.scheme_slug, holdings=len(holdings))
        scheme_id = await _resolve_scheme_id_from_db(session_factory, ref.scheme_slug)
        if scheme_id is None:
            log.error(
                "persist.scheme_not_found",
                scheme=ref.scheme_slug,
                hint="Run the seed migration to create AMC/scheme rows first",
            )
            continue  # skip this scheme, try the next one

        try:
            snapshot_id = await save_snapshot(
                session_factory,
                scheme_id=scheme_id,
                disclosure_date=ref.disclosure_date,
                raw_file_url=ref.file_url,
                raw_file_bytes=file_bytes,
                parser_version=scraper.parser_version,
                holdings=holdings,
            )
            log.info("persist.done", scheme=ref.scheme_slug, snapshot_id=snapshot_id)
        except Exception as exc:
            log.warning("persist.failed", scheme=ref.scheme_slug, error=str(exc))
            continue



async def _resolve_scheme_id_from_db(session_factory, scheme_slug: str) -> int | None:
    """Look up a scheme's DB id by slug. Returns None if not found."""
    from sqlalchemy import select
    from .models import Scheme as SchemeModel
    async with session_factory() as session:
        result = await session.execute(
            select(SchemeModel.id).where(SchemeModel.slug == scheme_slug)
        )
        return result.scalar_one_or_none()


if __name__ == "__main__":
    app()
