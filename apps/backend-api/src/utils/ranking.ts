// src/utils/ranking.ts
/**
 * score = recencyScore + preferenceBoost
 * recencyScore: 0..1 based on hours since published (exponential decay)
 * preferenceBoost: add fixed boost if article contains any preferred tags
 */

export function recencyScore(publishedAtIso: string) {
  const published = new Date(publishedAtIso).getTime();
  const now = Date.now();
  const hours = Math.max((now - published) / (1000 * 60 * 60), 0);
  // exponential decay with half-life ~24h
  const halfLife = 24;
  const score = Math.exp(-Math.LN2 * (hours / halfLife));
  return score; // 0..1
}

export function preferenceBoost(tags: string[] = [], preferred: string[] = []) {
  if (!tags || !tags.length || !preferred || !preferred.length) return 0;
  for (const t of tags) {
    if (preferred.includes(t.toLowerCase())) return 0.25; // fixed boost
  }
  return 0;
}

/**
 * final score composite
 */
export function computeScore(publishedAtIso: string, tags: string[] | null, preferredTags: string[] = []) {
  return recencyScore(publishedAtIso) * 0.8 + preferenceBoost(tags ?? [], preferredTags.map(t => t.toLowerCase())) * 0.2;
}
