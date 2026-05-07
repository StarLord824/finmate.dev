import { hfEmbed } from "../lib/huggingface-client";
import { logger } from "../lib/logger";

export async function getEmbedding(
  title: string,
  summary: string
): Promise<number[] | null> {
  try {
    const input = `${title} ${summary}`.slice(0, 1000);
    return await hfEmbed(input);
  } catch (err) {
    logger.warn({ err }, "Embedding failed — skipping (will be null)");
    return null;
  }
}
