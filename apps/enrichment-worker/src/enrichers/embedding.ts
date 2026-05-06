import { hfEmbed } from "../lib/huggingface-client";

export async function getEmbedding(
  title: string,
  summary: string
): Promise<number[]> {
  const input = `${title} ${summary}`.slice(0, 1000);
  return hfEmbed(input);
}
