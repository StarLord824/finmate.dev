-- Add functional GIN index for full-text search on Article
-- Uses English text search config across title, summary, and content.
-- to_tsvector is evaluated at query time; the index lets PostgreSQL avoid a full scan.
CREATE INDEX IF NOT EXISTS "Article_search_gin_idx"
  ON "Article"
  USING GIN (
    to_tsvector(
      'english',
      coalesce(title, '') || ' ' || coalesce(summary, '') || ' ' || coalesce(content, '')
    )
  );
