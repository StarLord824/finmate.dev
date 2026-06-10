# syntax=docker/dockerfile:1.7
FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1

# System deps needed for pdfplumber/camelot (ghostscript), psycopg, and TLS
RUN apt-get update && apt-get install -y --no-install-recommends \
      build-essential \
      ghostscript \
      libpq-dev \
      curl \
      ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install deps first for layer caching
COPY pyproject.toml ./
RUN pip install --upgrade pip && \
    pip install -e ".[dev]"

# Copy source
COPY alembic.ini ./
COPY alembic ./alembic
COPY src ./src
COPY tests ./tests

EXPOSE 8001

# Default to scheduler + HTTP /health on :8001
CMD ["python", "-m", "fundlens_scraper.main"]
