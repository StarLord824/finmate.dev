-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- AlterTable
ALTER TABLE "public"."Article" ADD COLUMN     "aiSummary" TEXT,
ADD COLUMN     "aiTags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "embedding" vector(384),
ADD COLUMN     "enrichStatus" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "enrichedAt" TIMESTAMP(3),
ADD COLUMN     "sentiment" TEXT,
ADD COLUMN     "sentimentScore" DOUBLE PRECISION;
