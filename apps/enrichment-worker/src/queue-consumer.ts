import Redis from "ioredis";
import prisma from "@repo/db/prismaClient";
import { getSentiment } from "./enrichers/sentiment";
import { getEmbedding } from "./enrichers/embedding";
import { summarizeArticle } from "./enrichers/summarize";
import { markProcessing, saveEnrichment, markFailed } from "./db/update-article";
import { logger } from "./lib/logger";

const QUEUE_KEY = "enrichment:queue";
const DRAIN_DELAY_MS = 2000; // 1 article/2s — respects HuggingFace free tier

export async function startConsumer(redis: Redis): Promise<never> {
  logger.info("Enrichment queue consumer started");

  while (true) {
    try {
      // BLPOP blocks up to 5s waiting for an item, returns [queueName, id] or null
      const result = await redis.blpop(QUEUE_KEY, 5);
      if (!result) continue;

      const articleId = result[1];
      await processArticle(articleId);

      await new Promise((r) => setTimeout(r, DRAIN_DELAY_MS));
    } catch (err) {
      logger.error({ err }, "Consumer loop unexpected error — backing off 5s");
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

async function processArticle(id: string): Promise<void> {
  const article = await prisma.article.findUnique({
    where: { id },
    select: { id: true, title: true, summary: true, content: true },
  });

  if (!article) {
    logger.warn({ id }, "Article not found, skipping");
    return;
  }

  await markProcessing(id);

  try {
    const title = article.title;
    const content = article.content ?? article.summary ?? "";
    const summary = article.summary ?? "";

    // Summarize first — embedding uses aiSummary for better quality
    const { aiSummary, aiTags } = await summarizeArticle(title, content);

    // Sentiment + embedding in parallel (independent of each other)
    const [sentimentResult, embedding] = await Promise.all([
      getSentiment(title, summary),
      getEmbedding(title, aiSummary ?? summary),
    ]);

    await saveEnrichment(id, {
      sentiment: sentimentResult.sentiment,
      sentimentScore: sentimentResult.sentimentScore,
      aiSummary,
      aiTags,
      embedding,
    });

    logger.info({ id, sentiment: sentimentResult.sentiment, tags: aiTags }, "Article enriched");
  } catch (err) {
    logger.error({ err, id }, "Enrichment failed — marking article as failed");
    await markFailed(id);
  }
}
