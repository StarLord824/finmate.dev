"""Shared async httpx client with tenacity-based retry.

Every outbound HTTP request from the scraper goes through this — gives us one
place to set user agent, timeout, retry policy, and connection limits.
"""
from __future__ import annotations

import httpx
from tenacity import (
    AsyncRetrying,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

from .settings import get_settings


def build_client(transport: httpx.AsyncBaseTransport | None = None) -> httpx.AsyncClient:
    """Construct a configured AsyncClient. Pass `transport` for tests."""
    s = get_settings()
    return httpx.AsyncClient(
        headers={"User-Agent": s.http_user_agent, "Accept": "*/*"},
        timeout=httpx.Timeout(s.http_timeout_s, connect=10.0),
        follow_redirects=True,
        transport=transport,
        limits=httpx.Limits(max_connections=10, max_keepalive_connections=5),
    )


async def fetch_bytes(
    url: str,
    *,
    client: httpx.AsyncClient | None = None,
    max_retries: int | None = None,
) -> bytes:
    """GET `url` with retries on transient failures. Returns response.content."""
    retries = max_retries if max_retries is not None else get_settings().http_max_retries
    own_client = client is None
    c = client or build_client()
    try:
        async for attempt in AsyncRetrying(
            stop=stop_after_attempt(retries),
            wait=wait_exponential(multiplier=1, min=1, max=10),
            retry=retry_if_exception_type((httpx.TransportError, httpx.HTTPStatusError)),
            reraise=True,
        ):
            with attempt:
                resp = await c.get(url)
                resp.raise_for_status()
                return resp.content
        raise RuntimeError("unreachable")  # tenacity guarantees a return or raise
    finally:
        if own_client:
            await c.aclose()
