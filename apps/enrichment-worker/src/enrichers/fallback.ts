import { openRouterChat } from "../lib/openrouter-client";
import { logger } from "../lib/logger";

const SYSTEM = "You are a financial news analyst. Return valid JSON only, no markdown.";

export async function fallbackSummarize(
  title: string,
  content: string
): Promise<{ aiSummary: string | null; aiTags: string[] }> {
  try {
    const user = `Summarize this article in 2-3 sentences and extract 3-8 topic tags.\n\nTitle: ${title}\nContent: ${content.slice(0, 2000)}\n\nReturn: {"summary": "...", "tags": ["tag1", "tag2", ...]}`;
    const raw = await openRouterChat(SYSTEM, user);
    const parsed = JSON.parse(raw) as any;
    return {
      aiSummary: typeof parsed.summary === "string" ? parsed.summary : null,
      aiTags: Array.isArray(parsed.tags)
        ? parsed.tags.map(String).slice(0, 8)
        : [],
    };
  } catch (err) {
    logger.warn({ err }, "OpenRouter fallback failed — returning nulls");
    return { aiSummary: null, aiTags: [] };
  }
}
