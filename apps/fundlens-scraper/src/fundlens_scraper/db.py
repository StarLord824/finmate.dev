"""SQLAlchemy 2.0 async engine + session factory.

All DB writes for the fundlens schema happen through this single engine.
The Alembic migrations use a sync driver (handled in alembic/env.py); this
module is the application-side runtime async client.
"""

from __future__ import annotations

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from .settings import get_settings

_engine: AsyncEngine | None = None
_session_factory: async_sessionmaker[AsyncSession] | None = None


def _async_url(url: str) -> str:
    """Coerce a postgres:// URL to the asyncpg driver form."""
    if url.startswith("postgres://"):
        url = "postgresql://" + url[len("postgres://") :]
    if "+asyncpg" not in url and url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    return url


def get_engine() -> AsyncEngine:
    global _engine
    if _engine is None:
        settings = get_settings()
        _engine = create_async_engine(
            _async_url(settings.database_url),
            pool_size=5,
            max_overflow=5,
            pool_pre_ping=True,
        )
    return _engine


def get_session_factory() -> async_sessionmaker[AsyncSession]:
    global _session_factory
    if _session_factory is None:
        _session_factory = async_sessionmaker(
            bind=get_engine(),
            expire_on_commit=False,
            class_=AsyncSession,
        )
    return _session_factory


@asynccontextmanager
async def session_scope() -> AsyncIterator[AsyncSession]:
    """Async context manager that opens a session and commits or rolls back."""
    factory = get_session_factory()
    async with factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise


async def ping() -> bool:
    """Lightweight liveness check used by the /health endpoint."""
    engine = get_engine()
    try:
        async with engine.connect() as conn:
            await conn.exec_driver_sql("SELECT 1")
        return True
    except Exception:
        return False
