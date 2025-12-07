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
 * Get all active news sources
 * Returns array of source objects
 */
export async function getSources(): Promise<Array<{
  id: string;
  name: string;
  url: string;
  logo?: string;
}>> {
  const sources = await prisma.source.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      name: true,
      url: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return sources.map((source) => ({
    id: source.id,
    name: source.name,
    url: source.url,
    logo: undefined, // Add logo field to Source model if needed
  }));
}
