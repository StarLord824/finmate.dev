import { getGroq } from "../lib/groq-client";
import { fallbackSummarize } from "./fallback";
import { logger } from "../lib/logger";

const SYSTEM = "You are a financial news analyst. Return valid JSON only, no markdown.";

function buildPrompt(title: string, content: string): string {
  return `Summarize this article in 2-3 sentences and extract 3-8 topic tags.\n\nTitle: ${title}\nContent: ${content.slice(0, 2000)}\n\nReturn: {"summary": "...", "tags": ["tag1", "tag2", ...]}`;
}

function parseResponse(
  raw: string
): { aiSummary: string; aiTags: string[] } | null {
  try {
    const parsed = JSON.parse(raw) as any;
    if (typeof parsed.summary === "string" && Array.isArray(parsed.tags)) {
      return {
        aiSummary: parsed.summary,
        aiTags: parsed.tags.map(String).slice(0, 8),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function summarizeArticle(
  title: string,
  content: string
): Promise<{ aiSummary: string | null; aiTags: string[] }> {
  const groq = getGroq();
  const prompt = buildPrompt(title, content);

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: prompt },
        ],
        temperature: 0.1,
      });

      const raw = completion.choices[0]?.message?.content ?? "";
      const parsed = parseResponse(raw);
      if (parsed) return parsed;
      logger.warn({ attempt }, "Groq response parse failed, retrying");
    } catch (err: any) {
      if (err?.status === 429) {
        logger.warn("Groq rate limit (429) — delegating to OpenRouter");
        return fallbackSummarize(title, content);
      }
      if (attempt === 1) {
        logger.warn({ err }, "Groq failed twice — delegating to OpenRouter");
        return fallbackSummarize(title, content);
      }
    }
  }

  return fallbackSummarize(title, content);
}
