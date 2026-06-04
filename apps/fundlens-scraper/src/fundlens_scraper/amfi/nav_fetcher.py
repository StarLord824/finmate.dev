"""Fetch the AMFI NAVAll.txt feed and return parsed NavRecord objects.

Called by the APScheduler `fetch_nav` job (Task 24).
"""
from __future__ import annotations

from .nav_parser import NavRecord, parse_nav_text
from ..http_client import fetch_bytes
from ..settings import get_settings


async def fetch_nav() -> list[NavRecord]:
    """Download NAVAll.txt and return parsed records."""
    settings = get_settings()
    raw_bytes = await fetch_bytes(settings.amfi_nav_url)
    text = raw_bytes.decode("utf-8", errors="replace")
    return parse_nav_text(text)
