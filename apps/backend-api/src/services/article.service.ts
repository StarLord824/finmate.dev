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
}) {
  const { limit, before, tags, sources } = options;
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

  const items = await prisma.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return items;
}

export async function searchArticles(query: string, limit = 20) {
  // simple ILIKE search on title, summary, content
  const q = `%${query}%`;
  const items = await prisma.$queryRawUnsafe(
    `SELECT * FROM "Article" WHERE title ILIKE $1 OR summary ILIKE $1 OR content ILIKE $1 ORDER BY "publishedAt" DESC LIMIT $2`,
    q,
    limit
  );
  return items;
}
