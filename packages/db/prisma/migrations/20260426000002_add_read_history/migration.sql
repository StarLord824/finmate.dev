-- CreateTable
CREATE TABLE "ReadHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readTime" INTEGER,

    CONSTRAINT "ReadHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex: compound unique so re-reading an article upserts, not duplicates
CREATE UNIQUE INDEX "ReadHistory_userId_articleId_key" ON "ReadHistory"("userId", "articleId");

-- CreateIndex: covering index for the paginated history query (userId + readAt DESC)
CREATE INDEX "ReadHistory_userId_readAt_idx" ON "ReadHistory"("userId", "readAt" DESC);

-- AddForeignKey
ALTER TABLE "ReadHistory" ADD CONSTRAINT "ReadHistory_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadHistory" ADD CONSTRAINT "ReadHistory_articleId_fkey"
    FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
