import fs from "fs";
import path from "path";
import { fetchRss } from "./fetchers/rss-fetcher";
import { normalizeFeedItem } from "./processors/normalize";
import { isValidArticle } from "./processors/validate";
import { upsertArticle } from "./db/write-article";

async function runOnce() {
  const cfgPath = path.join(__dirname, "../config/ingestion-sources.json");
  const json = JSON.parse(fs.readFileSync(cfgPath, "utf-8"));
  const src = json.sources[0]; // test first source
  const items = await fetchRss(src.url);
  let inserted = 0;
  for (const item of items) {
    const norm = normalizeFeedItem(item as any, src.name, src.tags ?? []);
    if (!isValidArticle(norm)) continue;
    const res = await upsertArticle(norm);
    if (res.inserted) inserted++;
  }
  console.log(`fetched ${items.length} items, inserted ${inserted}`);
  process.exit(0);
}

runOnce();
