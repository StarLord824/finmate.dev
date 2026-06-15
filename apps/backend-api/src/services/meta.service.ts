// src/services/meta.service.ts
import prisma from "@repo/db/prismaClient";
import { getMarketQuotes } from "./market.service";

/**
 * Get all unique categories from articles
 * Returns array of category strings
 */
export async function getCategories(): Promise<string[]> {
  // Get all unique tags from articles
  const articles = await prisma.article.findMany({
    select: {
      tags: true,
    },
  });

  // Flatten and deduplicate tags
  const allTags = articles.flatMap((article) => article.tags);
  
  // Filter out UUIDs that might have accidentally been saved as tags
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  const uniqueTags = Array.from(new Set(allTags)).filter(tag => !UUID_RE.test(tag));

  // Sort alphabetically
  return uniqueTags.sort();
}

/**
 * Get all unique sources from articles
 * Returns array of source objects
 */
export async function getSources(): Promise<Array<{
  id: string;
  name: string;
  url: string;
  logo?: string;
}>> {
  // Get unique sources from articles
  const articles = await prisma.article.findMany({
    select: {
      source: true,
    },
    distinct: ['source'],
    orderBy: {
      source: 'asc',
    },
  });

  // Map to source objects
  return articles.map((article, index) => ({
    id: `source-${index}`,
    name: article.source,
    url: '#', // We don't have URLs in articles, could be added later
    logo: undefined,
  }));
}

/**
 * Get trending tags over a rolling time window
 * Uses unnest to count tag occurrences across recent articles
 */
export async function getTrending(hours = 24, topN = 12) {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);

  const rows = await prisma.$queryRaw<Array<{ tag: string; count: bigint }>>`
    SELECT tag, COUNT(*) AS count
    FROM "Article", unnest(tags) AS tag
    WHERE "publishedAt" >= ${since}
    GROUP BY tag
    ORDER BY count DESC
    LIMIT ${topN}
  `;

  return rows.map((r) => ({ tag: r.tag, count: Number(r.count) }));
}

/**
 * Get live market quotes — delegates to market service
 */
export async function getMarketData(): Promise<Array<{
  label: string; symbol: string; category: string; price: number; change: number; changePercent: number;
}>> {
  return getMarketQuotes();
}

