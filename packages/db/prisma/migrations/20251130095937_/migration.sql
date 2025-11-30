-- CreateTable
CREATE TABLE "public"."Article" (
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

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Source" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "schedule" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_link_key" ON "public"."Article"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Article_fingerprint_key" ON "public"."Article"("fingerprint");

-- CreateIndex
CREATE INDEX "Article_publishedAt_idx" ON "public"."Article"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Source_name_key" ON "public"."Source"("name");
