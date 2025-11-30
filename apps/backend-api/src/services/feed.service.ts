// src/services/feed.service.ts
import { getArticles } from "./article.service";
import { computeScore } from "../utils/ranking";
import { logger } from "../utils/logger";

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
}) {
  const limit = options.limit ?? 20;
  const raw = await getArticles({
    limit: Math.max(200, limit * 5), // fetch a buffer to re-rank
    before: options.before ?? null,
    tags: options.tags ?? null,
    sources: options.sources ?? null,
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
