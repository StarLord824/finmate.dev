from __future__ import annotations

import os
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Override sqlalchemy.url from environment
db_url = os.environ.get("FUNDLENS_DATABASE_URL")
if db_url is None:
    raise RuntimeError("FUNDLENS_DATABASE_URL is not set; refusing to run migrations")
# Alembic uses sync psycopg v3 driver
sync_url = (
    db_url.replace("+asyncpg", "")
    .replace("postgresql+asyncpg", "postgresql")
    .replace("postgresql://", "postgresql+psycopg://")
    .replace("postgres://", "postgresql+psycopg://")
)
config.set_main_option("sqlalchemy.url", sync_url)

# No declarative target_metadata — we write migrations by hand for the fundlens schema
target_metadata = None


def include_object(_object, _name, type_, _reflected, _compare_to):  # noqa: ANN001
    # Only manage the fundlens schema
    if type_ == "table" and getattr(_object, "schema", None) != "fundlens":
        return False
    return True


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        include_schemas=True,
        include_object=include_object,
        version_table_schema="fundlens",
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        # Ensure schema exists before alembic_version table is created
        connection.exec_driver_sql("CREATE SCHEMA IF NOT EXISTS fundlens")
        connection.commit()

        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            include_schemas=True,
            include_object=include_object,
            version_table_schema="fundlens",
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
