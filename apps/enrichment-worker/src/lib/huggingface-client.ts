const HF_MODELS = "https://router.huggingface.co/hf-inference/models";
const HF_PIPELINE = "https://router.huggingface.co/hf-inference/pipeline";

async function hfRequest(url: string, body: unknown, retries = 1): Promise<any> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) throw new Error("HUGGINGFACE_API_KEY not set");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.status === 503 && retries > 0) {
    await new Promise((r) => setTimeout(r, 10_000));
    return hfRequest(url, body, retries - 1);
  }

  if (!res.ok) {
    throw new Error(`HuggingFace ${res.status}: ${await res.text()}`);
  }

  return res.json();
}

export async function hfSentiment(
  text: string
): Promise<Array<{ label: string; score: number }>> {
  const url = `${HF_MODELS}/ProsusAI/finbert`;
  const result = await hfRequest(url, { inputs: text.slice(0, 2000) });
  // FinBERT returns [[{label, score}, ...]] — unwrap outer array
  return Array.isArray(result[0]) ? result[0] : result;
}

export async function hfEmbed(text: string): Promise<number[]> {
  // Use explicit feature-extraction pipeline — all-MiniLM-L6-v2 is registered
  // as sentence-similarity on /models, which requires a different input format.
  const url = `${HF_PIPELINE}/feature-extraction/sentence-transformers/all-MiniLM-L6-v2`;
  const result = await hfRequest(url, { inputs: text.slice(0, 1000) });
  // Returns number[] directly for single string input
  return result as number[];
}
