"""Create read/write roles for the fundlens schema.

Idempotent — checks for existence first so dev-bootstrap and prod-bootstrap
both apply cleanly.

Revision ID: 0002
Revises: 0001
Create Date: 2026-05-08
"""

from __future__ import annotations

from typing import Sequence, Union

from alembic import op

revision: str = "0002"
down_revision: Union[str, None] = "0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create roles without passwords; passwords set out-of-band via cloud secret manager.
    # In local dev these roles are unused — the Python service connects with the same
    # superuser the rest of the monorepo uses.
    op.execute(
        """
        DO $$
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'fundlens_read') THEN
                CREATE ROLE fundlens_read;
            END IF;
            IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'fundlens_write') THEN
                CREATE ROLE fundlens_write;
            END IF;
        END
        $$
        """
    )
    op.execute("GRANT USAGE ON SCHEMA fundlens TO fundlens_read, fundlens_write")
    op.execute("GRANT SELECT ON ALL TABLES IN SCHEMA fundlens TO fundlens_read")
    op.execute(
        "ALTER DEFAULT PRIVILEGES IN SCHEMA fundlens "
        "GRANT SELECT ON TABLES TO fundlens_read"
    )
    op.execute(
        "GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA fundlens "
        "TO fundlens_write"
    )
    op.execute(
        "ALTER DEFAULT PRIVILEGES IN SCHEMA fundlens "
        "GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO fundlens_write"
    )
    op.execute(
        "GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA fundlens "
        "TO fundlens_write"
    )
    op.execute(
        "ALTER DEFAULT PRIVILEGES IN SCHEMA fundlens "
        "GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO fundlens_write"
    )


def downgrade() -> None:
    # Privileges are revoked when roles are dropped. Skip if roles are still in use.
    op.execute("DROP ROLE IF EXISTS fundlens_read")
    op.execute("DROP ROLE IF EXISTS fundlens_write")
