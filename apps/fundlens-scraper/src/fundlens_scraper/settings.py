"""Pydantic-settings — single source of truth for env-driven config.

All FundLens-specific env vars are prefixed FUNDLENS_ to keep them clearly
namespaced inside the shared finmate.dev .env.
"""

from __future__ import annotations

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="FUNDLENS_",
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    database_url: str = Field(
        ...,
        description="Postgres connection string for fundlens writer role. "
        "Use postgresql:// (sync) — async driver added by db.py.",
    )
    redis_url: str = Field(
        default="redis://localhost:6379/0",
        description="Redis broker for Celery + general cache",
    )
    log_level: str = Field(default="INFO")
    http_port: int = Field(default=8001, description="Health endpoint port")

    amfi_nav_url: str = Field(
        default="https://www.amfiindia.com/spages/NAVAll.txt",
        description="AMFI daily NAV feed",
    )
    nse_isin_url: str = Field(
        default="https://archives.nseindia.com/content/equities/EQUITY_L.csv",
        description="NSE equity ISIN master CSV",
    )
    http_user_agent: str = Field(
        default="FundLens/0.0.1 (+contact@finmate.dev)",
        description="UA string sent to AMC sites and AMFI/NSE",
    )
    http_timeout_s: float = Field(default=30.0)
    http_max_retries: int = Field(default=4)

    raw_file_bucket: str | None = Field(
        default=None,
        description="Optional S3-compatible bucket URL for archiving raw PDFs",
    )
    raw_file_bucket_key: str | None = None
    raw_file_bucket_secret: str | None = None


_settings: Settings | None = None


def get_settings() -> Settings:
    """Lazy, cached settings accessor."""
    global _settings
    if _settings is None:
        _settings = Settings()  # type: ignore[call-arg]
    return _settings
