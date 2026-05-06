# AI Enrichment Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enrich every ingested article with FinBERT sentiment, Groq-generated summary + tags, and HuggingFace vector embedding — stored in Postgres and exposed via the feed API.

**Architecture:** New `apps/enrichment-worker` app drains a Redis queue (`enrichment:queue`). The ingestion worker pushes article IDs after new inserts. The enrichment worker runs HuggingFace and Groq calls per article, writes results back to Postgres. Rate limited to 1 article/2s to stay within free tier limits.

**Tech Stack:** Groq SDK (`groq-sdk`), HuggingFace Inference API (fetch), OpenRouter (fetch fallback), ioredis, pgvector Postgres extension, Prisma `$executeRaw` for vector writes.

---

## File Map

**New files:**
- `apps/enrichment-worker/package.json`
- `apps/enrichment-worker/tsconfig.json`
- `apps/enrichment-worker/.env`
- `apps/enrichment-worker/src/index.ts`
- `apps/enrichment-worker/src/queue-consumer.ts`
- `apps/enrichment-worker/src/lib/logger.ts`
- `apps/enrichment-worker/src/lib/huggingface-client.ts`
- `apps/enrichment-worker/src/lib/groq-client.ts`
- `apps/enrichment-worker/src/lib/openrouter-client.ts`
- `apps/enrichment-worker/src/enrichers/sentiment.ts`
- `apps/enrichment-worker/src/enrichers/embedding.ts`
- `apps/enrichment-worker/src/enrichers/summarize.ts`
- `apps/enrichment-worker/src/enrichers/fallback.ts`
- `apps/enrichment-worker/src/db/update-article.ts`

**Modified files:**
- `packages/db/prisma/schema.prisma` — new Article fields
- `packages/db/prisma/migrations/<new>/migration.sql` — pgvector + new columns
- `apps/ingestion-worker/src/db/write-article.ts` — push to enrichment queue
- `apps/backend-api/src/services/article.service.ts` — sentiment filter in getArticles
- `apps/backend-api/src/services/feed.service.ts` — pass sentiment param
- `apps/backend-api/src/routes/feed.ts` — accept sentiment query param
- `package.json` (root) — dev:enrichment + dev:all update
- `.env.example` — new API keys
- `apps/enrichment-worker/.env`, `apps/backend-api/.env`, `apps/ingestion-worker/.env` — new keys

---

## Task 1: Database Schema + Migration

**Files:**
- Modify: `packages/db/prisma/schema.prisma`
- Create: `packages/db/prisma/migrations/<timestamp>_ai_enrichment/migration.sql`

- [ ] **Step 1: Add new fields to Article model in schema.prisma**

Open `packages/db/prisma/schema.prisma`. Add these fields to the `Article` model after the `updatedAt` line (before `readHistory`):

```prisma
  sentiment      String?
  sentimentScore Float?
  aiSummary      String?                      @db.Text
  aiTags         String[]                     @default([])
  embedding      Unsupported("vector(384)")?
  enrichStatus   String                       @default("pending")
  enrichedAt     DateTime?
```

- [ ] **Step 2: Create migration file (create-only, don't apply yet)**

```bash
cd packages/db
pnpm prisma migrate dev --create-only --name ai_enrichment
```

Expected: Prisma creates `prisma/migrations/<timestamp>_ai_enrichment/migration.sql` and prints the path.

- [ ] **Step 3: Edit the generated migration SQL**

Open the new migration file. Prepend the pgvector extension and add the vector column at the end. The file should look like this (Prisma generates the standard columns; you add the two lines marked with `-- ADD`):

```sql
-- ADD: enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Prisma generates these automatically (do not remove):
ALTER TABLE "Article" ADD COLUMN "sentiment" TEXT;
ALTER TABLE "Article" ADD COLUMN "sentimentScore" DOUBLE PRECISION;
ALTER TABLE "Article" ADD COLUMN "aiSummary" TEXT;
ALTER TABLE "Article" ADD COLUMN "aiTags" TEXT[] NOT NULL DEFAULT '{}';
ALTER TABLE "Article" ADD COLUMN "enrichStatus" TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE "Article" ADD COLUMN "enrichedAt" TIMESTAMP(3);

-- ADD: vector column (Prisma Unsupported type — must be added manually)
ALTER TABLE "Article" ADD COLUMN "embedding" vector(384);
```

- [ ] **Step 4: Apply the migration**

Run from repo root:
```bash
pnpm --filter @repo/db migrate
```

When prompted for migration name, press Enter (name already set).

Expected output:
```
Applying migration `<timestamp>_ai_enrichment`
Your database is now in sync with your schema.
```

- [ ] **Step 5: Regenerate Prisma client**

```bash
pnpm --filter @repo/db build
```

Expected: `✔ Generated Prisma Client`

- [ ] **Step 6: Commit**

```bash
git add packages/db/prisma/schema.prisma packages/db/prisma/migrations/
git commit -m "feat(db): add AI enrichment fields and pgvector extension"
```

---

## Task 2: Environment Variables

**Files:**
- Modify: `.env.example`
- Modify: `apps/enrichment-worker/.env` (created in Task 3, add keys then)
- Modify: `apps/backend-api/.env`
- Modify: `apps/ingestion-worker/.env`

- [ ] **Step 1: Add keys to .env.example**

Open `.env.example` and add after the existing `OPENROUTER_API_KEY` line:

```bash
# HuggingFace Inference API (sentiment + embeddings)
HUGGINGFACE_API_KEY=hf_your_key_here

# Groq (LLM summarization + tag extraction)
GROQ_API_KEY=gsk_your_key_here
```

- [ ] **Step 2: Add keys to apps/backend-api/.env and apps/ingestion-worker/.env**

Add to the bottom of each file:
```bash
HUGGINGFACE_API_KEY=hf_your_actual_key
GROQ_API_KEY=gsk_your_actual_key
```

- [ ] **Step 3: Commit**

```bash
git add .env.example apps/backend-api/.env apps/ingestion-worker/.env
git commit -m "chore: add HuggingFace and Groq env var placeholders"
```

---

## Task 3: Enrichment Worker Scaffold

**Files:**
- Create: `apps/enrichment-worker/package.json`
- Create: `apps/enrichment-worker/tsconfig.json`
- Create: `apps/enrichment-worker/.env`

- [ ] **Step 1: Create package.json**

Create `apps/enrichment-worker/package.json`:

```json
{
  "name": "enrichment-worker",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc -b",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@repo/db": "workspace:*",
    "groq-sdk": "^0.9.0",
    "ioredis": "^5.4.1",
    "pino": "^9.6.0",
    "pino-pretty": "^13.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "@types/node": "^20.0.0",
    "ts-node-dev": "^2.0.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

Create `apps/enrichment-worker/tsconfig.json`:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

- [ ] **Step 3: Create .env**

Create `apps/enrichment-worker/.env`:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/finmate"
DIRECT_URL="postgresql://postgres:password@localhost:5432/finmate"
REDIS_URL="redis://localhost:6379"
HUGGINGFACE_API_KEY=hf_your_actual_key
GROQ_API_KEY=gsk_your_actual_key
OPENROUTER_API_KEY=sk-or-your_actual_key
LOG_LEVEL="info"
```

- [ ] **Step 4: Install dependencies**

Run from repo root:
```bash
pnpm install
```

Expected: pnpm resolves the new workspace package without errors.

- [ ] **Step 5: Commit**

```bash
git add apps/enrichment-worker/package.json apps/enrichment-worker/tsconfig.json apps/enrichment-worker/.env
git commit -m "feat(enrichment-worker): scaffold new app"
```

---

## Task 4: Logger + API Clients

**Files:**
- Create: `apps/enrichment-worker/src/lib/logger.ts`
- Create: `apps/enrichment-worker/src/lib/huggingface-client.ts`
- Create: `apps/enrichment-worker/src/lib/groq-client.ts`
- Create: `apps/enrichment-worker/src/lib/openrouter-client.ts`

- [ ] **Step 1: Create logger**

Create `apps/enrichment-worker/src/lib/logger.ts`:

```typescript
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty", options: { colorize: true } }
      : undefined,
});
```

- [ ] **Step 2: Create HuggingFace client**

Create `apps/enrichment-worker/src/lib/huggingface-client.ts`:

```typescript
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
```

- [ ] **Step 3: Create Groq client**

Create `apps/enrichment-worker/src/lib/groq-client.ts`:

```typescript
import Groq from "groq-sdk";

let _client: Groq | null = null;

export function getGroq(): Groq {
  if (!_client) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY not set");
    _client = new Groq({ apiKey });
  }
  return _client;
}
```

- [ ] **Step 4: Create OpenRouter client**

Create `apps/enrichment-worker/src/lib/openrouter-client.ts`:

```typescript
export async function openRouterChat(
  systemPrompt: string,
  userPrompt: string,
  model = "meta-llama/llama-3.1-8b-instruct:free"
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY not set");

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenRouter ${res.status}: ${await res.text()}`);
  }

  const json = await res.json() as any;
  return json.choices[0].message.content as string;
}
```

- [ ] **Step 5: Commit**

```bash
git add apps/enrichment-worker/src/
git commit -m "feat(enrichment-worker): add logger and API clients"
```

---

## Task 5: Enrichers

**Files:**
- Create: `apps/enrichment-worker/src/enrichers/sentiment.ts`
- Create: `apps/enrichment-worker/src/enrichers/embedding.ts`
- Create: `apps/enrichment-worker/src/enrichers/fallback.ts`
- Create: `apps/enrichment-worker/src/enrichers/summarize.ts`

- [ ] **Step 1: Create sentiment enricher**

Create `apps/enrichment-worker/src/enrichers/sentiment.ts`:

```typescript
import { hfSentiment } from "../lib/huggingface-client";

export async function getSentiment(
  title: string,
  summary: string
): Promise<{ sentiment: string; sentimentScore: number }> {
  const input = `${title}. ${summary}`.slice(0, 2000);
  const results = await hfSentiment(input);

  // Pick label with highest confidence score
  const top = results.reduce(
    (best, curr) => (curr.score > best.score ? curr : best),
    results[0]
  );

  return {
    sentiment: top.label.toLowerCase(), // "positive" | "negative" | "neutral"
    sentimentScore: top.score,
  };
}
```

- [ ] **Step 2: Create embedding enricher**

Create `apps/enrichment-worker/src/enrichers/embedding.ts`:

```typescript
import { hfEmbed } from "../lib/huggingface-client";

export async function getEmbedding(
  title: string,
  summary: string
): Promise<number[]> {
  const input = `${title} ${summary}`.slice(0, 1000);
  return hfEmbed(input);
}
```

- [ ] **Step 3: Create OpenRouter fallback**

Create `apps/enrichment-worker/src/enrichers/fallback.ts`:

```typescript
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
```

- [ ] **Step 4: Create Groq summarize enricher**

Create `apps/enrichment-worker/src/enrichers/summarize.ts`:

```typescript
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
      // JSON parse failed — loop retries once, then falls through
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
```

- [ ] **Step 5: Commit**

```bash
git add apps/enrichment-worker/src/enrichers/
git commit -m "feat(enrichment-worker): add sentiment, embedding, summarize enrichers"
```

---

## Task 6: DB Update Helper + Queue Consumer

**Files:**
- Create: `apps/enrichment-worker/src/db/update-article.ts`
- Create: `apps/enrichment-worker/src/queue-consumer.ts`

- [ ] **Step 1: Create DB update helper**

Create `apps/enrichment-worker/src/db/update-article.ts`:

```typescript
import prisma from "@repo/db/prismaClient";

export interface EnrichmentResult {
  sentiment: string | null;
  sentimentScore: number | null;
  aiSummary: string | null;
  aiTags: string[];
  embedding: number[] | null;
}

export async function markProcessing(id: string): Promise<void> {
  await prisma.article.update({
    where: { id },
    data: { enrichStatus: "processing" },
  });
}

export async function saveEnrichment(
  id: string,
  result: EnrichmentResult
): Promise<void> {
  if (result.embedding && result.embedding.length === 384) {
    // vector column requires raw SQL — Prisma doesn't support vector operators
    const vectorLiteral = `[${result.embedding.join(",")}]`;
    await prisma.$executeRaw`
      UPDATE "Article"
      SET
        "sentiment"      = ${result.sentiment},
        "sentimentScore" = ${result.sentimentScore},
        "aiSummary"      = ${result.aiSummary},
        "aiTags"         = ${result.aiTags},
        "embedding"      = ${vectorLiteral}::vector,
        "enrichStatus"   = 'done',
        "enrichedAt"     = NOW()
      WHERE id = ${id}
    `;
  } else {
    // no embedding — use Prisma ORM (won't touch vector column)
    await prisma.article.update({
      where: { id },
      data: {
        sentiment: result.sentiment,
        sentimentScore: result.sentimentScore,
        aiSummary: result.aiSummary,
        aiTags: result.aiTags,
        enrichStatus: "done",
        enrichedAt: new Date(),
      },
    });
  }
}

export async function markFailed(id: string): Promise<void> {
  await prisma.article.update({
    where: { id },
    data: { enrichStatus: "failed" },
  });
}
```

- [ ] **Step 2: Create queue consumer**

Create `apps/enrichment-worker/src/queue-consumer.ts`:

```typescript
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
```

- [ ] **Step 3: Commit**

```bash
git add apps/enrichment-worker/src/db/ apps/enrichment-worker/src/queue-consumer.ts
git commit -m "feat(enrichment-worker): add DB update helper and queue consumer"
```

---

## Task 7: Worker Entry Point

**Files:**
- Create: `apps/enrichment-worker/src/index.ts`

- [ ] **Step 1: Create index.ts**

Create `apps/enrichment-worker/src/index.ts`:

```typescript
import "dotenv/config";
import Redis from "ioredis";
import prisma from "@repo/db/prismaClient";
import { startConsumer } from "./queue-consumer";
import { logger } from "./lib/logger";

async function main() {
  logger.info("Enrichment worker booting");

  const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";
  const redis = new Redis(redisUrl);

  redis.on("error", (err) => logger.error({ err }, "Redis error"));

  await prisma.$connect();
  logger.info("DB connected — starting queue consumer");

  await startConsumer(redis);
}

main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});

process.on("SIGINT", async () => {
  logger.info("SIGINT — shutting down");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM — shutting down");
  await prisma.$disconnect();
  process.exit(0);
});
```

- [ ] **Step 2: Verify the worker boots**

Make sure Docker is running (`pnpm db:up`), then:

```bash
pnpm --filter enrichment-worker dev
```

Expected output:
```
[INFO] Enrichment worker booting
[INFO] DB connected — starting queue consumer
[INFO] Enrichment queue consumer started
```

The consumer will then block waiting for queue items (no output — that's correct).

- [ ] **Step 3: Commit**

```bash
git add apps/enrichment-worker/src/index.ts
git commit -m "feat(enrichment-worker): add entry point, worker boots successfully"
```

---

## Task 8: Wire Ingestion Worker to Queue

**Files:**
- Modify: `apps/ingestion-worker/src/db/write-article.ts`

- [ ] **Step 1: Push new article IDs to enrichment queue**

Open `apps/ingestion-worker/src/db/write-article.ts`. After the `redis.publish("feed:new-article", ...)` call (line ~37), add one line:

```typescript
    // Notify SSE clients about the new article
    const redis = getRedis();
    await redis.publish(
      "feed:new-article",
      JSON.stringify({
        id: inserted.id,
        title: inserted.title,
        source: inserted.source,
        publishedAt: inserted.publishedAt.toISOString(),
      })
    );

    // Queue article for AI enrichment (sentiment, summary, tags, embedding)
    await redis.rpush("enrichment:queue", inserted.id);
```

Only the `rpush` line is new. It sits inside the `if (!existing)` branch, so it only runs for newly inserted articles, not duplicates.

- [ ] **Step 2: Manually test the queue push**

With Docker running and the enrichment worker running in one terminal, trigger ingestion in another:

```bash
pnpm --filter ingestion-worker run-once
```

In the enrichment worker terminal, within ~2s you should see:
```
[INFO] Article enriched { id: "...", sentiment: "positive", tags: [...] }
```

- [ ] **Step 3: Commit**

```bash
git add apps/ingestion-worker/src/db/write-article.ts
git commit -m "feat(ingestion-worker): push new article IDs to enrichment queue"
```

---

## Task 9: Backend API — Sentiment Filter + New Fields

**Files:**
- Modify: `apps/backend-api/src/services/article.service.ts`
- Modify: `apps/backend-api/src/services/feed.service.ts`
- Modify: `apps/backend-api/src/routes/feed.ts`

- [ ] **Step 1: Add sentiment filter to getArticles**

Open `apps/backend-api/src/services/article.service.ts`. Update the `getArticles` function signature and where clause:

```typescript
export async function getArticles(options: {
  limit: number;
  before?: string | null;
  tags?: string[] | null;
  sources?: string[] | null;
  sentiment?: string | null;   // ADD
}) {
  const { limit, before, tags, sources, sentiment } = options;  // ADD sentiment
  const where: any = {};

  if (before) {
    where.publishedAt = { lt: new Date(before) };
  }

  if (sources && sources.length) {
    where.source = { in: sources };
  }

  if (tags && tags.length) {
    where.tags = { hasSome: tags };
  }

  // ADD: sentiment filter
  if (sentiment && ["positive", "negative", "neutral"].includes(sentiment)) {
    where.sentiment = sentiment;
  }

  const items = await prisma.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return items;
}
```

- [ ] **Step 2: Pass sentiment through feed service**

Open `apps/backend-api/src/services/feed.service.ts`. Update `getFeed`:

```typescript
export async function getFeed(options: {
  limit?: number;
  before?: string | null;
  tags?: string[] | null;
  sources?: string[] | null;
  preferredTags?: string[] | null;
  sentiment?: string | null;   // ADD
}) {
  const limit = options.limit ?? 20;
  const raw = await getArticles({
    limit: Math.max(200, limit * 5),
    before: options.before ?? null,
    tags: options.tags ?? null,
    sources: options.sources ?? null,
    sentiment: options.sentiment ?? null,   // ADD
  });
  // rest of function unchanged
```

- [ ] **Step 3: Accept sentiment query param in feed route**

Open `apps/backend-api/src/routes/feed.ts`. Add sentiment parsing:

```typescript
router.get("/", async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(String(req.query.limit || "20")), 100);
    const before = req.query.after ? String(req.query.after) : undefined;
    const tags = req.query.tags ? String(req.query.tags).split(",").map(s => s.trim()).filter(Boolean) : undefined;
    const sources = req.query.sources ? String(req.query.sources).split(",").map(s => s.trim()).filter(Boolean) : undefined;
    const preferredTags = req.query.preferredTags ? String(req.query.preferredTags).split(",").map(s => s.trim().toLowerCase()).filter(Boolean) : undefined;
    // ADD:
    const sentiment = req.query.sentiment ? String(req.query.sentiment) : undefined;

    const items = await getFeed({
      limit,
      before,
      tags: tags ?? null,
      sources: sources ?? null,
      preferredTags: preferredTags ?? null,
      sentiment: sentiment ?? null,   // ADD
    });
    res.json({ data: items });
  } catch (err) {
    next(err);
  }
});
```

- [ ] **Step 4: Verify sentiment filter works**

Start the backend (`pnpm dev:backend`). After some articles are enriched, test:

```bash
curl "http://localhost:4000/feed?sentiment=positive&limit=5"
```

Expected: JSON array where every article has `"sentiment": "positive"`.

```bash
curl "http://localhost:4000/feed?limit=3"
```

Expected: articles include `sentiment`, `sentimentScore`, `aiSummary`, `aiTags` fields.

- [ ] **Step 5: Commit**

```bash
git add apps/backend-api/src/services/article.service.ts apps/backend-api/src/services/feed.service.ts apps/backend-api/src/routes/feed.ts
git commit -m "feat(api): expose enrichment fields and add sentiment filter to feed"
```

---

## Task 10: Root Scripts + Final Wiring

**Files:**
- Modify: `package.json` (root)

- [ ] **Step 1: Add dev:enrichment script and update dev:all**

Open root `package.json`. Update the `scripts` section:

```json
"scripts": {
  "build": "turbo run build",
  "dev": "turbo run dev",
  "dev:all": "concurrently \"pnpm db:up\" \"pnpm dev:backend\" \"pnpm dev:worker\" \"pnpm dev:enrichment\" \"pnpm dev:frontend\" --names \"DB,API,WORKER,ENRICH,WEB\" --prefix-colors \"blue,green,yellow,magenta,cyan\"",
  "dev:backend": "pnpm --filter backend-api dev",
  "dev:worker": "pnpm --filter ingestion-worker dev",
  "dev:enrichment": "pnpm --filter enrichment-worker dev",
  "dev:frontend": "pnpm --filter frontend-web dev",
  "db:up": "docker compose up -d",
  "db:down": "docker compose down",
  "db:logs": "docker compose logs -f postgres",
  "lint": "turbo run lint",
  "format": "prettier --write \"**/*.{ts,tsx,md}\"",
  "check-types": "turbo run check-types"
}
```

- [ ] **Step 2: Run full stack end-to-end test**

```bash
pnpm db:up
pnpm dev:all
```

In a second terminal, trigger ingestion:

```bash
pnpm --filter ingestion-worker run-once
```

Watch the ENRICH log column — within 2–3s per article you should see enrichment results. After ~30s, verify in the DB:

```bash
docker exec -it finmate-postgres psql -U postgres -d finmate -c "SELECT id, sentiment, \"enrichStatus\", \"aiTags\" FROM \"Article\" WHERE \"enrichStatus\" = 'done' LIMIT 5;"
```

Expected: rows with `sentiment` values and `aiTags` arrays.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "feat: add enrichment worker to dev:all and root scripts"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Schema: new Article fields + pgvector migration (Task 1)
- ✅ HuggingFace sentiment (Task 5: sentiment.ts) + embedding (Task 5: embedding.ts)
- ✅ Groq summarize + JSON tag extraction (Task 5: summarize.ts)
- ✅ OpenRouter fallback on 429 or parse failure (Task 5: fallback.ts)
- ✅ Redis queue consumer loop with BLPOP (Task 6: queue-consumer.ts)
- ✅ 2s drain delay for rate limiting (Task 6: DRAIN_DELAY_MS)
- ✅ 503 retry with 10s wait for HF model loading (Task 4: huggingface-client.ts)
- ✅ Ingestion worker queue push (Task 8)
- ✅ Only push on new inserts, not duplicates (Task 8: inside `if (!existing)` branch)
- ✅ Backend sentiment filter (Task 9)
- ✅ New fields in feed response (Task 9 — Prisma returns all columns by default)
- ✅ Env vars in all .env files (Task 2 + Task 3)
- ✅ dev:enrichment + dev:all update (Task 10)
