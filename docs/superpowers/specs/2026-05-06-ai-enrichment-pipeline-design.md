# AI Enrichment Pipeline — Design Spec

**Goal:** Enrich every ingested article with FinBERT sentiment, an LLM-generated summary, AI-extracted topic tags, and a vector embedding — stored back in Postgres and used as the foundation for semantic search and personalization.

**Approach:** New dedicated `apps/enrichment-worker` app. Ingestion worker pushes article IDs to a Redis queue after save. Enrichment worker drains the queue asynchronously, runs AI calls in parallel per article, writes results back. Fully isolated from ingestion.

**Sub-project order:**
1. This spec — AI Enrichment Pipeline (foundation)
2. Semantic Search — pgvector similarity search (depends on embeddings from this spec)
3. Personalization + Feed Enhancement (depends on embeddings + ReadHistory)

---

## 1. Database Schema Changes

### New fields on `Article`

```prisma
sentiment      String?                      // "positive" | "negative" | "neutral"
sentimentScore Float?                       // FinBERT confidence 0.0–1.0
aiSummary      String?   @db.Text           // Groq-generated 2-3 sentence summary
aiTags         String[]  @default([])       // Groq-extracted topic entities (3-8 tags)
embedding      Unsupported("vector(384)")?  // HuggingFace all-MiniLM-L6-v2, 384 dims
enrichStatus   String    @default("pending") // "pending" | "done" | "failed"
enrichedAt     DateTime?
```

### Migration steps

1. Enable `pgvector` extension: `CREATE EXTENSION IF NOT EXISTS vector;`
2. Add new columns via Prisma migration
3. Vector column requires raw SQL in migration (Prisma `Unsupported` type)
4. All vector queries use `prisma.$queryRaw` — Prisma does not support vector operators natively

---

## 2. Ingestion Worker Change

**File:** `apps/ingestion-worker/src/db/write-article.ts`

After a successful article upsert, push the article ID to the enrichment queue:

```typescript
await redis.rpush("enrichment:queue", article.id);
```

Only push on new inserts (not updates to existing articles). The `write-article.ts` function already returns whether the article was newly created — use that flag.

---

## 3. Enrichment Worker App

### File Structure

```
apps/enrichment-worker/
  src/
    index.ts              — boot: connect DB + Redis, start queue loop
    queue-consumer.ts     — BLPOP loop, orchestrates enrichment per article
    enrichers/
      sentiment.ts        — HuggingFace FinBERT (ProsusAI/finbert)
      embedding.ts        — HuggingFace sentence-transformers/all-MiniLM-L6-v2
      summarize.ts        — Groq llama-3.1-8b-instant (summary + tags, JSON)
      fallback.ts         — OpenRouter meta-llama/llama-3.1-8b-instruct:free fallback
    lib/
      groq-client.ts      — Groq SDK wrapper, exposes typed chat completion
      openrouter-client.ts — fetch-based OpenRouter client
      huggingface-client.ts — fetch-based HuggingFace Inference API client
    db/
      update-article.ts   — single UPDATE writing all enrichment fields at once
  package.json
  tsconfig.json
  .env
```

### Queue Consumer Loop (`queue-consumer.ts`)

```
loop forever:
  id = BLPOP enrichment:queue 5   // blocks up to 5s, then retries
  if no id: continue

  article = fetch from DB by id
  if not found: continue

  mark enrichStatus = "processing"

  run in parallel:
    [sentiment, score]  = sentiment(article.title + " " + article.content)
    [embedding]         = embed(article.title + " " + article.summary)
    [aiSummary, aiTags] = summarize(article.title, article.content)  // Groq, with OpenRouter fallback

  write all results to DB in one UPDATE
  mark enrichStatus = "done", enrichedAt = now()

  on any error:
    mark enrichStatus = "failed"
    log error with article id
    do NOT crash the loop
```

### Enricher Details

**`sentiment.ts` — HuggingFace FinBERT**
- Endpoint: `https://api-inference.huggingface.co/models/ProsusAI/finbert`
- Input: `article.title + ". " + article.summary` (truncated to 512 tokens)
- Output: array of `{ label, score }` — pick highest score label, normalize to lowercase
- Auth: `Authorization: Bearer ${HUGGINGFACE_API_KEY}`
- On 503 (model loading): retry once after 10s, then throw

**`embedding.ts` — HuggingFace Embeddings**
- Endpoint: `https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2`
- Input: `article.title + " " + article.aiSummary` (or raw summary if aiSummary not yet available — sequential call after summarize)
- Output: `number[]` of length 384
- Same auth header

**`summarize.ts` — Groq (primary)**
- Model: `llama-3.1-8b-instant`
- Single call returns both summary and tags as JSON:

```
System: You are a financial news analyst. Return valid JSON only, no markdown.
User: Summarize this article in 2-3 sentences and extract 3-8 topic tags.

Title: {title}
Content: {content truncated to 2000 chars}

Return: {"summary": "...", "tags": ["tag1", "tag2", ...]}
```

- Parse JSON response; if parse fails, retry once
- On 429: delegate to `fallback.ts`

**`fallback.ts` — OpenRouter (fallback)**
- Same prompt as `summarize.ts`
- Model: `meta-llama/llama-3.1-8b-instruct:free`
- Endpoint: `https://openrouter.ai/api/v1/chat/completions`
- Auth: `Authorization: Bearer ${OPENROUTER_API_KEY}`
- On failure: log and return `{ summary: null, tags: [] }` — never throw

### Rate Limit Budget (free tiers)

| Provider | Limit | Usage per article | Daily capacity |
|---|---|---|---|
| Groq | ~14,400 req/day | 1 call (summary+tags) | 14,400 articles/day |
| HuggingFace | ~1,000 req/day | 2 calls (sentiment + embedding) | 500 articles/day |
| OpenRouter free | varies | fallback only | buffer |

**Queue drain rate:** 1 article every 2 seconds = 43,200 articles/day theoretical max. HuggingFace is the binding constraint at ~500/day. Add a 2s delay between articles to stay safe.

---

## 4. Environment Variables

Add to `.env.example`, `packages/db/.env`, `apps/enrichment-worker/.env`, `apps/backend-api/.env`:

```bash
HUGGINGFACE_API_KEY=hf_...
GROQ_API_KEY=gsk_...
# OPENROUTER_API_KEY already exists in root .env
```

---

## 5. Package Dependencies

```json
// apps/enrichment-worker/package.json dependencies
{
  "groq-sdk": "^0.9.0",
  "ioredis": "^5.4.1",
  "@repo/db": "workspace:*",
  "pino": "^9.6.0",
  "dotenv": "^16.0.0"
}
```

---

## 6. Backend API Changes

### Feed endpoint — expose new fields

`GET /feed` response articles include: `sentiment`, `sentimentScore`, `aiSummary` (shown instead of truncated summary when available), `aiTags` (merged with raw `tags`).

### Feed endpoint — sentiment filter

`GET /feed?sentiment=positive` filters articles where `sentiment = 'positive'`. Supported values: `positive`, `negative`, `neutral`. No value = no filter (existing behaviour).

### Display logic

Frontend shows `aiSummary` when `enrichStatus = "done"`, falls back to `summary` otherwise. Sentiment badge shown on cards only when `enrichStatus = "done"`.

---

## 7. Root `pnpm dev` Script Update

Add `dev:enrichment` script and include in `dev:all`:

```json
// root package.json
"dev:enrichment": "pnpm --filter enrichment-worker dev",
"dev:all": "concurrently ... \"pnpm dev:enrichment\""
```

---

## 8. Out of Scope (covered in subsequent specs)

- pgvector similarity search (Sub-project 2)
- Personalized feed ranking, "For You" tab, interest profile (Sub-project 3)
- Arena features
- Frontend UI for sentiment badges and filter (implemented alongside or after this pipeline is working)
