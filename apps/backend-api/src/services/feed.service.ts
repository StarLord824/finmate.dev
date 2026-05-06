// src/services/feed.service.ts
import { getArticles } from "./article.service";
import { computeScore } from "../utils/ranking";
import { logger } from "../utils/logger";
import prisma from "@repo/db/prismaClient";

/**
 * GetFeed: fetches articles, computes score, sorts by score, returns top N
 * options:
 *  - limit
 *  - before (ISO)
 *  - tags
 *  - sources
 *  - preferredTags (from user)
 */
export async function getFeed(options: {
  limit?: number;
  before?: string | null;
  tags?: string[] | null;
  sources?: string[] | null;
  preferredTags?: string[] | null;
  sentiment?: string | null;
}) {
  const limit = options.limit ?? 20;
  const raw = await getArticles({
    limit: Math.max(200, limit * 5), // fetch a buffer to re-rank
    before: options.before ?? null,
    tags: options.tags ?? null,
    sources: options.sources ?? null,
    sentiment: options.sentiment ?? null,
  });

  // Score & sort
  const scored = raw.map((a: any) => {
    const score = computeScore(a.publishedAt.toISOString?.() ?? a.publishedAt, a.tags ?? [], options.preferredTags ?? []);
    return { article: a, score };
  });

  scored.sort((x, y) => y.score - x.score);

  const selected = scored.slice(0, limit).map(s => s.article);

  return selected;
}

/**
 * Get related articles for a given article, scored by tag overlap and recency,
 * with source diversity (max 1 per source).
 */
export async function getRelatedArticles(
  articleId: string,
  tags: string[],
  limit = 5
) {
  if (!tags.length) return [];

  // Fetch a wider pool: any article sharing at least one tag, excluding self,
  // from the last 7 days to keep results fresh.
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const pool = await prisma.article.findMany({
    where: {
      id: { not: articleId },
      tags: { hasSome: tags },
      publishedAt: { gte: since },
    },
    select: {
      id: true,
      title: true,
      link: true,
      source: true,
      publishedAt: true,
      summary: true,
      imageUrl: true,
      tags: true,
    },
    orderBy: { publishedAt: "desc" },
    take: 50, // over-fetch for scoring
  });

  // Score each article: tag overlap count drives relevance; publishedAt drives recency.
  const scored = pool.map((a) => {
    const overlap = a.tags.filter((t) => tags.includes(t)).length;
    const ageHours =
      (Date.now() - new Date(a.publishedAt).getTime()) / (1000 * 60 * 60);
    const recency = Math.exp(-ageHours / 48); // 48h half-life
    return { ...a, score: overlap * 0.7 + recency * 0.3 };
  });

  scored.sort((a, b) => b.score - a.score);

  // Pick top-scoring articles with source diversity: max 1 per source.
  const seen = new Set<string>();
  const results = [];
  for (const a of scored) {
    if (seen.has(a.source)) continue;
    seen.add(a.source);
    results.push(a);
    if (results.length >= limit) break;
  }

  return results;
}

