"""Celery app for retryable jobs (e.g. diff computation triggered by a
new_snapshot event). Bootstrap stub — concrete tasks are added later.

Run with: celery -A fundlens_scraper.celery_app worker --loglevel=info
"""

from __future__ import annotations

from celery import Celery

from .settings import get_settings


def make_celery() -> Celery:
    settings = get_settings()
    celery = Celery(
        "fundlens_scraper",
        broker=settings.redis_url,
        backend=settings.redis_url,
    )
    celery.conf.update(
        task_serializer="json",
        accept_content=["json"],
        result_serializer="json",
        timezone="Asia/Kolkata",
        enable_utc=True,
        task_track_started=True,
        task_acks_late=True,
        worker_prefetch_multiplier=1,
    )
    return celery


app = make_celery()
