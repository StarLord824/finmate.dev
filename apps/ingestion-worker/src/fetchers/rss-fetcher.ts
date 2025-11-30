import Parser from "rss-parser";
import fs from "fs";
import path from "path";
import { logger } from "../utils/logger";
import { RawFeedItem } from "../types";

const parser = new Parser({
  headers: { "User-Agent": "FinMate-Ingestion/1.0 (+https://finmate.dev)" },
});

export async function fetchRss(feedUrl: string): Promise<RawFeedItem[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    logger.info({ feedTitle: feed.title, items: feed.items.length }, "fetched feed");
    return feed.items as RawFeedItem[];
  } catch (err) {
    logger.error({ err, feedUrl }, "fetchRss error");
    return [];
  }
}
