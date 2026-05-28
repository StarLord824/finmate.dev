"""SQLAlchemy 2.0 declarative models for the fundlens schema.

These mirror the Alembic-managed DDL in alembic/versions/0001_initial_schema.py.
The Alembic migrations are the source of truth — this file MUST be kept in sync
when columns change.
"""
from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import (
    BigInteger,
    CheckConstraint,
    Date,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    Numeric,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

SCHEMA = "fundlens"


class Base(DeclarativeBase):
    pass


class Amc(Base):
    __tablename__ = "amc"
    __table_args__ = {"schema": SCHEMA}

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    slug: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    sebi_reg_no: Mapped[str | None] = mapped_column(Text)
    website: Mapped[str | None] = mapped_column(Text)
    logo_url: Mapped[str | None] = mapped_column(Text)
    total_aum_cr: Mapped[Decimal | None] = mapped_column(Numeric(18, 2))
    scheme_count: Mapped[int | None] = mapped_column(Integer)
    scraper_status: Mapped[str] = mapped_column(Text, nullable=False, server_default="active")
    last_scraped_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class FundManager(Base):
    __tablename__ = "fund_manager"
    __table_args__ = (Index("fund_manager_amc_idx", "amc_id"), {"schema": SCHEMA})

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    amc_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.amc.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    since_date: Mapped[date | None] = mapped_column(Date)
    bio: Mapped[str | None] = mapped_column(Text)
    photo_url: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class Scheme(Base):
    __tablename__ = "scheme"
    __table_args__ = (
        Index("scheme_amc_idx", "amc_id"),
        Index("scheme_category_idx", "category", "sub_category"),
        {"schema": SCHEMA},
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    amc_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.amc.id", ondelete="CASCADE"), nullable=False)
    manager_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.fund_manager.id", ondelete="SET NULL"))
    amfi_code: Mapped[str | None] = mapped_column(Text, unique=True)
    isin_growth: Mapped[str | None] = mapped_column(Text)
    isin_idcw: Mapped[str | None] = mapped_column(Text)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    slug: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    category: Mapped[str | None] = mapped_column(Text)
    sub_category: Mapped[str | None] = mapped_column(Text)
    benchmark: Mapped[str | None] = mapped_column(Text)
    aum_cr: Mapped[Decimal | None] = mapped_column(Numeric(18, 2))
    expense_ratio: Mapped[Decimal | None] = mapped_column(Numeric(5, 3))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class HoldingsSnapshot(Base):
    __tablename__ = "holdings_snapshot"
    __table_args__ = (
        UniqueConstraint("scheme_id", "disclosure_date", name="holdings_snapshot_scheme_id_disclosure_date_key"),
        Index("snapshot_sha256_per_scheme_idx", "scheme_id", "raw_file_sha256", unique=True),
        {"schema": SCHEMA},
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    scheme_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.scheme.id", ondelete="CASCADE"), nullable=False)
    disclosure_date: Mapped[date] = mapped_column(Date, nullable=False)
    aum_at_disclosure: Mapped[Decimal | None] = mapped_column(Numeric(18, 2))
    raw_file_url: Mapped[str] = mapped_column(Text, nullable=False)
    raw_file_sha256: Mapped[str] = mapped_column(Text, nullable=False)
    parsed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    parser_version: Mapped[str] = mapped_column(Text, nullable=False)


class Holding(Base):
    __tablename__ = "holding"
    __table_args__ = (
        Index("holding_snapshot_idx", "snapshot_id"),
        Index("holding_isin_idx", "isin", postgresql_where="isin IS NOT NULL"),
        {"schema": SCHEMA},
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    snapshot_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.holdings_snapshot.id", ondelete="CASCADE"), nullable=False)
    isin: Mapped[str | None] = mapped_column(Text)
    ticker_nse: Mapped[str | None] = mapped_column(Text)
    ticker_bse: Mapped[str | None] = mapped_column(Text)
    company_name: Mapped[str] = mapped_column(Text, nullable=False)
    sector: Mapped[str | None] = mapped_column(Text)
    quantity: Mapped[Decimal | None] = mapped_column(Numeric(20, 4))
    market_value_cr: Mapped[Decimal | None] = mapped_column(Numeric(18, 2))
    pct_of_nav: Mapped[Decimal | None] = mapped_column(Numeric(7, 4))


class HoldingDiff(Base):
    __tablename__ = "holding_diff"
    __table_args__ = (
        CheckConstraint("action IN ('NEW','ADD','TRIM','EXIT','HOLD')", name="holding_diff_action_check"),
        Index("diff_scheme_idx", "scheme_id", "curr_snapshot_id"),
        Index("diff_isin_idx", "isin"),
        {"schema": SCHEMA},
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    scheme_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.scheme.id", ondelete="CASCADE"), nullable=False)
    isin: Mapped[str] = mapped_column(Text, nullable=False)
    prev_snapshot_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.holdings_snapshot.id"))
    curr_snapshot_id: Mapped[int | None] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.holdings_snapshot.id"))
    prev_qty: Mapped[Decimal | None] = mapped_column(Numeric(20, 4))
    curr_qty: Mapped[Decimal | None] = mapped_column(Numeric(20, 4))
    qty_delta: Mapped[Decimal | None] = mapped_column(Numeric(20, 4))
    prev_value_cr: Mapped[Decimal | None] = mapped_column(Numeric(18, 2))
    curr_value_cr: Mapped[Decimal | None] = mapped_column(Numeric(18, 2))
    action: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class IsinMaster(Base):
    __tablename__ = "isin_master"
    __table_args__ = {"schema": SCHEMA}

    isin: Mapped[str] = mapped_column(Text, primary_key=True)
    ticker_nse: Mapped[str | None] = mapped_column(Text)
    ticker_bse: Mapped[str | None] = mapped_column(Text)
    company_name: Mapped[str] = mapped_column(Text, nullable=False)
    sector: Mapped[str | None] = mapped_column(Text)
    industry: Mapped[str | None] = mapped_column(Text)
    refreshed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class Nav(Base):
    __tablename__ = "nav"
    __table_args__ = (
        UniqueConstraint("scheme_id", "date", name="nav_scheme_id_date_key"),
        Index("nav_scheme_date_idx", "scheme_id", "date"),
        {"schema": SCHEMA},
    )

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    scheme_id: Mapped[int] = mapped_column(BigInteger, ForeignKey(f"{SCHEMA}.scheme.id", ondelete="CASCADE"), nullable=False)
    date: Mapped[date] = mapped_column(Date, nullable=False)
    nav: Mapped[Decimal] = mapped_column(Numeric(12, 4), nullable=False)
