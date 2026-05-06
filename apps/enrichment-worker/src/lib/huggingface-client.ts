const HF_BASE = "https://api-inference.huggingface.co/models";

async function hfPost(model: string, inputs: string, retries = 1): Promise<any> {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) throw new Error("HUGGINGFACE_API_KEY not set");

  const res = await fetch(`${HF_BASE}/${model}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs }),
  });

  if (res.status === 503 && retries > 0) {
    // Model is loading — wait 10s and retry once
    await new Promise((r) => setTimeout(r, 10_000));
    return hfPost(model, inputs, retries - 1);
  }

  if (!res.ok) {
    throw new Error(`HuggingFace ${res.status}: ${await res.text()}`);
  }

  return res.json();
}

export async function hfSentiment(
  text: string
): Promise<Array<{ label: string; score: number }>> {
  const result = await hfPost("ProsusAI/finbert", text.slice(0, 2000));
  // FinBERT returns [[{label, score}, ...]] — unwrap outer array
  return Array.isArray(result[0]) ? result[0] : result;
}

export async function hfEmbed(text: string): Promise<number[]> {
  const result = await hfPost(
    "sentence-transformers/all-MiniLM-L6-v2",
    text.slice(0, 1000)
  );
  return result as number[];
}
