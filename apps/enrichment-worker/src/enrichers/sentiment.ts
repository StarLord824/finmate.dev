import { hfSentiment } from "../lib/huggingface-client";

export async function getSentiment(
  title: string,
  summary: string
): Promise<{ sentiment: string; sentimentScore: number }> {
  const input = `${title}. ${summary}`.slice(0, 2000);
  const results = await hfSentiment(input);
  if (!results.length) return { sentiment: "neutral", sentimentScore: 0 };

  // Pick label with highest confidence score
  const top = results.reduce(
    (best, curr) => (curr.score > best.score ? curr : best)
  );

  return {
    sentiment: top.label.toLowerCase(), // "positive" | "negative" | "neutral"
    sentimentScore: top.score,
  };
}
