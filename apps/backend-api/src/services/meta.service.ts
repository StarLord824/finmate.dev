// src/services/meta.service.ts
import prisma from "@repo/db/prismaClient";

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
  const uniqueTags = Array.from(new Set(allTags));

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
