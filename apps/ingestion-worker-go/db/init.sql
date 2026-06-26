-- init.sql: Creates the necessary tables for the ingestion worker to run independently

CREATE TABLE IF NOT EXISTS "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "author" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "ingestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "summary" TEXT,
    "content" TEXT,
    "imageUrl" TEXT,
    "fingerprint" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sentiment" TEXT,
    "sentimentScore" DOUBLE PRECISION,
    "aiSummary" TEXT,
    "aiTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "enrichStatus" TEXT NOT NULL DEFAULT 'pending',
    "enrichedAt" TIMESTAMP(3),

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- Unique constraints to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS "Article_link_key" ON "Article"("link");
CREATE UNIQUE INDEX IF NOT EXISTS "Article_fingerprint_key" ON "Article"("fingerprint");

-- Index for querying by publication date
CREATE INDEX IF NOT EXISTS "Article_publishedAt_idx" ON "Article"("publishedAt");
