"""Typer CLI — manual operational levers.

Usage:
    fundlens-scraper migrate          # alembic upgrade head
    fundlens-scraper health           # one-shot DB ping
    fundlens-scraper run --amc sbi-mf # (later) trigger one AMC scraper synchronously
"""

from __future__ import annotations

import asyncio
import subprocess

import typer

from .db import ping
from .logging_config import configure_logging
from .settings import get_settings

app = typer.Typer(help="FundLens scraper operational CLI")


@app.command()
def migrate() -> None:
    """Run alembic upgrade head against FUNDLENS_DATABASE_URL."""
    configure_logging(get_settings().log_level)
    subprocess.run(["alembic", "upgrade", "head"], check=True)


@app.command()
def health() -> None:
    """One-shot ping of the configured Postgres."""
    configure_logging(get_settings().log_level)
    ok = asyncio.run(ping())
    if ok:
        typer.echo("ok")
        raise typer.Exit(0)
    typer.echo("unreachable")
    raise typer.Exit(1)


@app.command()
def run(
    amc: str = typer.Option(..., help="AMC slug to scrape (e.g. sbi-mf)"),
) -> None:
    """Run one AMC scraper synchronously — stub until scrapers exist."""
    configure_logging(get_settings().log_level)
    typer.echo(f"scraper for {amc} is not implemented yet")
    raise typer.Exit(2)


if __name__ == "__main__":
    app()
