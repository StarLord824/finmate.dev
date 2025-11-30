import fs from "fs";
import path from "path";
import { CronJob } from "cron";
import { fetchRss } from "./fetchers/rss-fetcher";
import { normalizeFeedItem } from "./processors/normalize";
import { isValidArticle } from "./processors/validate";
import { upsertArticle } from "./db/write-article";
import { logger } from "./utils/logger";

type SourceCfg = {
  name: string;
  type: string;
  url: string;
  tags?: string[];
  active?: boolean;
  schedule?: string;
};

export async function startScheduler() {
  const cfgPath = path.join(__dirname, "../config/ingestion-sources.json");
  const raw = fs.readFileSync(cfgPath, "utf-8");
  const json = JSON.parse(raw) as { sources: SourceCfg[] };

  for (const src of json.sources) {
    if (!src.active) continue;
    const cronExpr = src.schedule ?? "*/15 * * * *"; // default
    logger.info({ source: src.name, cronExpr }, "scheduling source");

    const job = new CronJob(cronExpr, async () => {
      logger.info({ source: src.name }, "cron triggered");
      try {
        if (src.type === "rss") {
          const items = await fetchRss(src.url);
          let inserted = 0;
          for (const item of items) {
            const norm = normalizeFeedItem(item as any, src.name, src.tags ?? []);
            if (!isValidArticle(norm)) continue;
            const res = await upsertArticle(norm);
            if (res.inserted) inserted++;
          }
          logger.info({ source: src.name, fetched: items.length, inserted }, "cron run complete");
        } else {
          logger.warn({ source: src.name, type: src.type }, "unknown source type");
        }
      } catch (err) {
        logger.error({ err, source: src.name }, "cron job failed");
      }
    }, null, true, undefined, null, true);

    job.start();
  }
}
