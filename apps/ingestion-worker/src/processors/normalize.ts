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
  const imageUrl = (item.enclosure && item.enclosure.url) || item.image || null;

  const fingerprint = fingerprintFor(title, link);

  const tags = Array.isArray(item.categories) ? item.categories.map(String) : defaultTags ?? [];

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
