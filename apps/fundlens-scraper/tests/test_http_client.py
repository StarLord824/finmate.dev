import httpx
import pytest

from fundlens_scraper.http_client import build_client


@pytest.mark.asyncio
async def test_client_sends_configured_user_agent(monkeypatch):
    monkeypatch.setenv("FUNDLENS_DATABASE_URL", "postgresql://test/test")
    import fundlens_scraper.settings as settings_mod
    monkeypatch.setattr(settings_mod, "_settings", None)

    captured = {}

    def handler(request: httpx.Request) -> httpx.Response:
        captured["ua"] = request.headers.get("user-agent")
        return httpx.Response(200, text="ok")

    transport = httpx.MockTransport(handler)
    async with build_client(transport=transport) as client:
        resp = await client.get("https://example.com")
    assert resp.status_code == 200
    assert captured["ua"] is not None
    assert "FundLens" in captured["ua"]
