"""Central registry mapping AMC slug → scraper class.

Usage:
    from fundlens_scraper.scrapers.registry import SCRAPER_REGISTRY, register

    @register("sbi-mf")
    class SbiMfScraper: ...

Or imperatively:
    register("sbi-mf", SbiMfScraper)
"""
from __future__ import annotations

from typing import Any

SCRAPER_REGISTRY: dict[str, Any] = {}


def register(slug: str, cls: Any | None = None) -> Any:
    """Register a scraper class. Can be used as a decorator or called directly."""
    if cls is None:
        # decorator form: @register("slug")
        def decorator(c: Any) -> Any:
            SCRAPER_REGISTRY[slug] = c
            return c
        return decorator
    SCRAPER_REGISTRY[slug] = cls
    return cls
