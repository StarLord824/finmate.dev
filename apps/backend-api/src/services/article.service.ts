// src/services/article.service.ts
import prisma from "@repo/db/prismaClient";
import { logger } from "../utils/logger";

export async function getArticleById(id: string) {
  return prisma.article.findUnique({ where: { id } });
}

export async function getArticles(options: {
  limit: number;
  before?: string | null; // ISO timestamp: return publishedAt < before
  tags?: string[] | null;
  sources?: string[] | null;
  sentiment?: string | null;
}) {
  const { limit, before, tags, sources, sentiment } = options;
  const where: any = {};

  if (before) {
    where.publishedAt = { lt: new Date(before) };
  }

  if (sources && sources.length) {
    where.source = { in: sources };
  }

  if (tags && tags.length) {
    // tags is stored as string[] in Prisma
    where.tags = { hasSome: tags }; // Prisma hasSome operator
  }

  if (sentiment && ["positive", "negative", "neutral"].includes(sentiment)) {
    where.sentiment = sentiment;
  }

  const items = await prisma.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return items;
}

export async function searchArticles(query: string, limit = 20) {
  if (!query || query.trim().length < 2) return [];

  const sanitized = query.trim();
  const limitNum = Math.min(Math.max(1, limit), 100);

  // plainto_tsquery handles multi-word queries without special operator syntax.
  // The GIN index on to_tsvector makes this fast even on large tables.
  const results = await prisma.$queryRaw<
    Array<{
      id: string;
      title: string;
      link: string;
      source: string;
      author: string | null;
      publishedAt: Date;
      summary: string | null;
      imageUrl: string | null;
      tags: string[];
      rank: number;
    }>
  >`
    SELECT
      id,
      title,
      link,
      source,
      author,
      "publishedAt",
      summary,
      "imageUrl",
      tags,
      ts_rank(
        to_tsvector('english', coalesce(title,'') || ' ' || coalesce(summary,'') || ' ' || coalesce(content,'')),
        plainto_tsquery('english', ${sanitized})
      ) AS rank
    FROM "Article"
    WHERE to_tsvector('english', coalesce(title,'') || ' ' || coalesce(summary,'') || ' ' || coalesce(content,''))
      @@ plainto_tsquery('english', ${sanitized})
    ORDER BY rank DESC, "publishedAt" DESC
    LIMIT ${limitNum}
  `;

  return results;
}

