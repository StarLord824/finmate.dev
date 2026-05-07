import { RawFeedItem, Article } from "../types";
import { stripHtml, summarize } from "../utils/clean-html";
import { toISO } from "../utils/time";
import { fingerprintFor } from "./fingerprint";

export function normalizeFeedItem(item: RawFeedItem, sourceName: string, defaultTags: string[] = []): Article | null {
  const title = item.title?.trim();
  const link = item.link?.trim() ?? item.guid ?? null;
  if (!title || !link) return null;

  const publishedAt = toISO(item.isoDate ?? item.pubDate ?? item.pubdate ?? item.publishedAt) ?? new Date().toISOString();
  const content = stripHtml(item.content ?? item["content:encoded"] ?? item.contentSnippet ?? "");
  const summary = summarize(content || item.contentSnippet || item.description || "", 400);
  const author = (item.creator || item.author || item['dc:creator']) ?? null;
  const imageUrl =
    (item.enclosure?.url) ||
    (item as any)["media:content"]?.url ||
    (item as any)["media:content"]?.$?.url ||
    (item as any)["media:thumbnail"]?.url ||
    (item as any)["media:thumbnail"]?.$?.url ||
    item.image ||
    null;

  const fingerprint = fingerprintFor(title, link);

  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const TICKER_RE = /^[A-Z]{1,5}$/;

  const rawTags = Array.isArray(item.categories)
    ? item.categories.map(c => (typeof c === "string" ? c : (c as any)?._ ?? (c as any)?.name ?? "")).filter(Boolean)
    : defaultTags ?? [];

  const tags = rawTags
    .map(t => t.trim())
    .filter(t => t.length > 1 && t.length <= 60)
    .filter(t => !UUID_RE.test(t) && !TICKER_RE.test(t))
    .map(t => t.toLowerCase());

  return {
    title,
    link,
    summary,
    content: content || null,
    author,
    publishedAt,
    imageUrl,
    source: sourceName,
    tags,
    fingerprint
  };
}
