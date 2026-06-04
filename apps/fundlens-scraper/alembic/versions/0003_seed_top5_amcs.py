"""Seed the top-5 AMCs and their scraper status.

Seeds amc rows for:
  - ppfas-mf (scraper_status='active' — Phase 0 canary)
  - nippon-india-mf, icici-prudential-mf, hdfc-mf, sbi-mf (status='disabled'
    until their scrapers are implemented in Phase 1)

Also seeds the PPFAS schemes so the CLI run command can resolve scheme IDs.

Revision ID: 0003
Revises: 0002
Create Date: 2026-05-28
"""
from __future__ import annotations

from typing import Sequence, Union

from alembic import op

revision: str = "0003"
down_revision: Union[str, None] = "0002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

_AMC_INSERT = """
INSERT INTO fundlens.amc (slug, name, website, scraper_status)
VALUES
  ('ppfas-mf',             'PPFAS Mutual Fund',               'https://amc.ppfas.com',              'active'),
  ('nippon-india-mf',      'Nippon India Mutual Fund',         'https://mf.nipponindiaim.com',        'disabled'),
  ('icici-prudential-mf',  'ICICI Prudential Mutual Fund',     'https://www.icicipruamt.com',          'disabled'),
  ('hdfc-mf',              'HDFC Mutual Fund',                 'https://www.hdfcfund.com',             'disabled'),
  ('sbi-mf',               'SBI Mutual Fund',                  'https://www.sbimf.com',               'disabled')
ON CONFLICT (slug) DO NOTHING;
"""

_PPFAS_SCHEMES_INSERT = """
INSERT INTO fundlens.scheme (amc_id, slug, name, category)
SELECT
    a.id,
    s.slug,
    s.name,
    'Equity'
FROM fundlens.amc a
CROSS JOIN (VALUES
    ('ppfas-flexi-cap-fund',               'PPFAS Flexi Cap Fund'),
    ('ppfas-tax-saver-fund',               'PPFAS Tax Saver Fund'),
    ('ppfas-liquid-fund',                  'PPFAS Liquid Fund'),
    ('ppfas-overnight-fund',               'PPFAS Overnight Fund'),
    ('ppfas-conservative-hybrid-fund',     'PPFAS Conservative Hybrid Fund'),
    ('ppfas-arbitrage-fund',               'PPFAS Arbitrage Fund'),
    ('ppfas-dynamic-asset-allocation-fund','PPFAS Dynamic Asset Allocation Fund')
) AS s(slug, name)
WHERE a.slug = 'ppfas-mf'
ON CONFLICT (slug) DO NOTHING;
"""


def upgrade() -> None:
    op.execute(_AMC_INSERT)
    op.execute(_PPFAS_SCHEMES_INSERT)


def downgrade() -> None:
    op.execute("DELETE FROM fundlens.scheme WHERE slug LIKE 'ppfas-%'")
    op.execute(
        "DELETE FROM fundlens.amc WHERE slug IN "
        "('ppfas-mf','nippon-india-mf','icici-prudential-mf','hdfc-mf','sbi-mf')"
    )
