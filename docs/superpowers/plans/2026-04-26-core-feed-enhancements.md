# Core Feed Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reading history + read-time tracking, full-text search, trending topics widget, live feed refresh via SSE, smarter related articles, and real market data to the FinMate feed.

**Architecture:** Six independent feature slices, each following the same DB → backend service → backend route → frontend path. All use the existing Express + Prisma + Next.js + React Query stack. Live feed uses the Redis instance already running in the codebase. No new infrastructure required.

**Tech Stack:** PostgreSQL (full-text via functional GIN index + `to_tsvector`), Prisma ORM, Express 5, ioredis (already in `apps/backend-api`), Server-Sent Events (native Node.js), React Query v5, Next.js 15 App Router, Tailwind CSS 4

---

## File Map

### New Files

| File | Purpose |
|---|---|
| `apps/backend-api/src/services/history.service.ts` | Read history CRUD — save reads, fetch paginated history |
| `apps/backend-api/src/services/market.service.ts` | Fetch Yahoo Finance quotes + Redis 60s cache |
| `apps/backend-api/src/routes/history.ts` | `POST /user/history`, `GET /user/history` |
| `apps/backend-api/src/routes/live.ts` | `GET /feed/live` — SSE new-article stream |
| `apps/frontend-web/hooks/useReadTracker.ts` | Mount/unmount timer → fires POST /user/history |
| `apps/frontend-web/hooks/useLiveFeed.ts` | Opens EventSource, tracks unseen article count |
| `apps/frontend-web/components/TrendingTopics.tsx` | Horizontal trending tag chips |
| `apps/frontend-web/components/MarketBar.tsx` | Live S&P / Nasdaq / BTC bar |
| `apps/frontend-web/app/history/page.tsx` | Reading history page |

### Modified Files

| File | What Changes |
|---|---|
| `packages/db/prisma/schema.prisma` | Add `ReadHistory` model |
| `apps/backend-api/src/app.ts` | Mount `/user/history`, `/feed/live` routes |
| `apps/backend-api/src/services/article.service.ts` | Replace ILIKE with `to_tsvector` full-text query |
| `apps/backend-api/src/services/feed.service.ts` | Related articles: tag-overlap scoring + source diversity |
| `apps/backend-api/src/services/meta.service.ts` | Add `getTrending()` and `getMarketData()` |
| `apps/backend-api/src/routes/meta.ts` | Add `GET /meta/trending`, `GET /meta/market` |
| `apps/ingestion-worker/src/processors/persist.ts` | Publish `feed:new-article` event to Redis after insert |
| `apps/frontend-web/lib/api-client.ts` | Add `recordRead`, `getHistory`, `getTrending`, `getMarket` |
| `apps/frontend-web/app/page.tsx` | Add live refresh banner + `<TrendingTopics>` |
| `apps/frontend-web/app/article/[id]/page.tsx` | Mount `useReadTracker` |
| `apps/frontend-web/components/FiltersPanel.tsx` | Replace hardcoded market values with `<MarketBar>` |

---

## Task 1: ReadHistory Prisma Model

**Files:**
- Modify: `packages/db/prisma/schema.prisma`

- [ ] **Step 1: Add ReadHistory model to schema**

Open `packages/db/prisma/schema.prisma`. Add after the `Verification` model:

```prisma
model ReadHistory {
  id        String   @id @default(uuid())
  userId    String
  articleId String
  readAt    DateTime @default(now())
  readTime  Int?     // seconds spent reading, null if user bounced

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  article Article @relation(fields: [articleId], references: [id], onDelete: Cascade)

  @@unique([userId, articleId])
  @@index([userId, readAt(sort: Desc)])
}
```

Also add the reverse relations. In the `User` model add:
```prisma
  readHistory ReadHistory[]
```

In the `Article` model add:
```prisma
  readHistory ReadHistory[]
```

- [ ] **Step 2: Create and run migration**

```bash
pnpm --filter @repo/db migrate
```

When prompted for a migration name enter: `add_read_history`

Expected output: `Your database is now in sync with your schema.`

- [ ] **Step 3: Verify generated client has ReadHistory**

```bash
grep -r "readHistory" packages/db/src/generated/client/index.js | head -5
```

Expected: lines referencing `readHistory` delegate method.

- [ ] **Step 4: Commit**

```bash
git add packages/db/prisma/schema.prisma packages/db/prisma/migrations/
git commit -m "feat(db): add ReadHistory model with userId/articleId unique constraint"
```

---

## Task 2: Full-Text Search — PostgreSQL GIN Index Migration

**Files:**
- Create: `packages/db/prisma/migrations/<timestamp>_article_fulltext_index/migration.sql` (Prisma creates the folder; you edit the SQL file)

- [ ] **Step 1: Create an empty migration**

```bash
pnpm --filter @repo/db exec prisma migrate dev --create-only --name article_fulltext_index
```

Expected: Prisma prints the path of the new migration file, e.g.
`packages/db/prisma/migrations/20260426120000_article_fulltext_index/migration.sql`

- [ ] **Step 2: Write the migration SQL**

Open the generated `migration.sql` file. Replace its contents (it may be empty or have a comment) with:

```sql
-- Add functional GIN index for full-text search on Article
-- Uses English text search config across title, summary, and content.
-- to_tsvector is evaluated at query time; the index lets PostgreSQL avoid a full scan.
CREATE INDEX IF NOT EXISTS "Article_search_gin_idx"
  ON "Article"
  USING GIN (
    to_tsvector(
      'english',
      coalesce(title, '') || ' ' || coalesce(summary, '') || ' ' || coalesce(content, '')
    )
  );
```

- [ ] **Step 3: Apply the migration**

```bash
pnpm --filter @repo/db migrate
```

When prompted for migration name, press Enter (name was already set in step 1).
Expected: `Your database is now in sync with your schema.`

- [ ] **Step 4: Verify the index exists in PostgreSQL**

```bash
pnpm db:up   # ensure Docker DB is running
docker exec -it $(docker ps --filter name=postgres -q) psql -U postgres -d finmate \
  -c "\d \"Article\""
```

Expected output includes a line like:
`"Article_search_gin_idx" gin (to_tsvector(...))`

- [ ] **Step 5: Commit**

```bash
git add packages/db/prisma/migrations/
git commit -m "feat(db): add GIN index for full-text search on Article title/summary/content"
```

---

## Task 3: Replace ILIKE Search with Full-Text Search

**Files:**
- Modify: `apps/backend-api/src/services/article.service.ts`

- [ ] **Step 1: Open the search service and locate the current implementation**

Open `apps/backend-api/src/services/article.service.ts`. Find the `searchArticles` function (around line 41). It currently uses `$queryRawUnsafe` with ILIKE. Replace the entire function body:

```typescript
export async function searchArticles(query: string, limit = 20) {
  if (!query || query.trim().length < 2) return [];

  const sanitized = query.trim();
  const limitNum = Math.min(Math.max(1, limit), 100);

  // plainto_tsquery handles multi-word queries without special operator syntax.
  // The GIN index on to_tsvector makes this fast even on large tables.
  const results = await prisma.$queryRaw<
    Array<{
      id: string;
      title: string;
      link: string;
      source: string;
      author: string | null;
      publishedAt: Date;
      summary: string | null;
      imageUrl: string | null;
      tags: string[];
      rank: number;
    }>
  >`
    SELECT
      id,
      title,
      link,
      source,
      author,
      "publishedAt",
      summary,
      "imageUrl",
      tags,
      ts_rank(
        to_tsvector('english', coalesce(title,'') || ' ' || coalesce(summary,'') || ' ' || coalesce(content,'')),
        plainto_tsquery('english', ${sanitized})
      ) AS rank
    FROM "Article"
    WHERE to_tsvector('english', coalesce(title,'') || ' ' || coalesce(summary,'') || ' ' || coalesce(content,''))
      @@ plainto_tsquery('english', ${sanitized})
    ORDER BY rank DESC, "publishedAt" DESC
    LIMIT ${limitNum}
  `;

  return results;
}
```

- [ ] **Step 2: Test manually**

Start the backend:
```bash
pnpm dev:backend
```

Run a search with a finance term:
```bash
curl "http://localhost:4000/search?q=inflation&limit=5"
```

Expected: JSON array of articles with `rank` field, ordered by relevance. Articles with "inflation" in title should rank higher than those with it only in content.

Try a nonsense query to verify empty result:
```bash
curl "http://localhost:4000/search?q=xyzzyfinance&limit=5"
```

Expected: `[]`

- [ ] **Step 3: Commit**

```bash
git add apps/backend-api/src/services/article.service.ts
git commit -m "feat(search): replace ILIKE scan with PostgreSQL full-text search using GIN index"
```

---

## Task 4: Read History Backend — Service + Routes

**Files:**
- Create: `apps/backend-api/src/services/history.service.ts`
- Create: `apps/backend-api/src/routes/history.ts`
- Modify: `apps/backend-api/src/app.ts`

- [ ] **Step 1: Create history service**

Create `apps/backend-api/src/services/history.service.ts`:

```typescript
import prisma from "@repo/db";

export async function recordRead(
  userId: string,
  articleId: string,
  readTime?: number
) {
  // upsert: if user re-reads, update readAt and readTime
  return prisma.readHistory.upsert({
    where: { userId_articleId: { userId, articleId } },
    create: { userId, articleId, readTime: readTime ?? null },
    update: { readAt: new Date(), readTime: readTime ?? null },
  });
}

export async function getReadHistory(
  userId: string,
  cursor?: string,
  limit = 20
) {
  const take = Math.min(Math.max(1, limit), 50);

  const items = await prisma.readHistory.findMany({
    where: { userId },
    orderBy: { readAt: "desc" },
    take: take + 1,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    include: {
      article: {
        select: {
          id: true,
          title: true,
          link: true,
          source: true,
          publishedAt: true,
          summary: true,
          imageUrl: true,
          tags: true,
        },
      },
    },
  });

  const hasMore = items.length > take;
  const data = hasMore ? items.slice(0, take) : items;

  return {
    items: data,
    nextCursor: hasMore ? data[data.length - 1].id : null,
  };
}

export async function getReadArticleIds(userId: string): Promise<string[]> {
  const rows = await prisma.readHistory.findMany({
    where: { userId },
    select: { articleId: true },
  });
  return rows.map((r) => r.articleId);
}
```

- [ ] **Step 2: Create history route**

Create `apps/backend-api/src/routes/history.ts`:

```typescript
import { Router } from "express";
import { requireAuthMiddleware } from "../middleware/auth.js";
import { recordRead, getReadHistory } from "../services/history.service.js";

const router = Router();

// POST /user/history  { articleId, readTime? }
router.post("/", requireAuthMiddleware, async (req, res, next) => {
  try {
    const { articleId, readTime } = req.body as {
      articleId: string;
      readTime?: number;
    };

    if (!articleId || typeof articleId !== "string") {
      return res.status(400).json({ error: "articleId is required" });
    }

    const entry = await recordRead(
      req.user!.id,
      articleId,
      typeof readTime === "number" ? Math.round(readTime) : undefined
    );

    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

// GET /user/history?cursor=&limit=
router.get("/", requireAuthMiddleware, async (req, res, next) => {
  try {
    const cursor = typeof req.query.cursor === "string" ? req.query.cursor : undefined;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await getReadHistory(req.user!.id, cursor, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
```

- [ ] **Step 3: Check auth middleware export name**

Open `apps/backend-api/src/middleware/auth.ts`. Find what the middleware requiring authentication is exported as. If it is exported as `authMiddleware` (not `requireAuthMiddleware`), update the import in the route file above to match, e.g.:

```typescript
import { authMiddleware as requireAuthMiddleware } from "../middleware/auth.js";
```

- [ ] **Step 4: Mount history routes in app.ts**

Open `apps/backend-api/src/app.ts`. Find where other user routes are registered (e.g., the line `app.use("/user", userRouter)`). Add below it:

```typescript
import historyRouter from "./routes/history.js";
// ...
app.use("/user/history", historyRouter);
```

Make sure this import is at the top of the file with the other route imports.

- [ ] **Step 5: Smoke test**

```bash
pnpm dev:backend
```

Record a read (replace TOKEN with a valid session cookie from the browser):
```bash
curl -X POST http://localhost:4000/user/history \
  -H "Content-Type: application/json" \
  -H "Cookie: finmate.session_token=TOKEN" \
  -d '{"articleId":"<any-article-id-from-db>","readTime":47}'
```

Expected: `201` with the ReadHistory record JSON.

Fetch history:
```bash
curl http://localhost:4000/user/history \
  -H "Cookie: finmate.session_token=TOKEN"
```

Expected: `{ items: [...], nextCursor: null }` with the article nested.

- [ ] **Step 6: Commit**

```bash
git add apps/backend-api/src/services/history.service.ts \
        apps/backend-api/src/routes/history.ts \
        apps/backend-api/src/app.ts
git commit -m "feat(history): add read history service and POST/GET /user/history endpoints"
```

---

## Task 5: useReadTracker Hook + Article Page Integration

**Files:**
- Create: `apps/frontend-web/hooks/useReadTracker.ts`
- Modify: `apps/frontend-web/app/article/[id]/page.tsx`
- Modify: `apps/frontend-web/lib/api-client.ts`

- [ ] **Step 1: Add recordRead to api-client**

Open `apps/frontend-web/lib/api-client.ts`. Add to the client object:

```typescript
recordRead: async (articleId: string, readTime?: number) => {
  return fetchApi("/user/history", {
    method: "POST",
    body: JSON.stringify({ articleId, readTime }),
  });
},

getHistory: async (cursor?: string, limit = 20) => {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", cursor);
  return fetchApi<{
    items: Array<{
      id: string;
      readAt: string;
      readTime: number | null;
      article: {
        id: string;
        title: string;
        link: string;
        source: string;
        publishedAt: string;
        summary: string | null;
        imageUrl: string | null;
        tags: string[];
      };
    }>;
    nextCursor: string | null;
  }>(`/user/history?${params}`);
},
```

> **Note:** `fetchApi` is whatever the existing wrapper function is called in this file. Check the top of `lib/api-client.ts` and use that name.

- [ ] **Step 2: Create useReadTracker hook**

Create `apps/frontend-web/hooks/useReadTracker.ts`:

```typescript
"use client";

import { useEffect, useRef } from "react";
import { apiClient } from "@/lib/api-client";

// Starts a timer when the article mounts. On unmount, posts the elapsed
// seconds to /user/history only if the user spent at least 10 seconds.
export function useReadTracker(articleId: string, isAuthenticated: boolean) {
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!isAuthenticated || !articleId) return;
    startRef.current = Date.now();

    return () => {
      const elapsed = Math.round((Date.now() - startRef.current) / 1000);
      // Fire-and-forget: don't block navigation. 10s minimum to count as a read.
      if (elapsed >= 10) {
        apiClient.recordRead(articleId, elapsed).catch(() => {});
      } else {
        // Still record it, just without a readTime so ranking still improves
        apiClient.recordRead(articleId).catch(() => {});
      }
    };
  }, [articleId, isAuthenticated]);
}
```

- [ ] **Step 3: Mount hook in article page**

Open `apps/frontend-web/app/article/[id]/page.tsx`. This is likely a Server Component. If it is, create a small client wrapper component at the top of the file (or in a new file `apps/frontend-web/app/article/[id]/ReadTracker.tsx`):

```typescript
// apps/frontend-web/app/article/[id]/ReadTracker.tsx
"use client";

import { useReadTracker } from "@/hooks/useReadTracker";

export function ReadTracker({
  articleId,
  isAuthenticated,
}: {
  articleId: string;
  isAuthenticated: boolean;
}) {
  useReadTracker(articleId, isAuthenticated);
  return null; // renders nothing, just tracks
}
```

Then in `app/article/[id]/page.tsx`, import and mount it. Find where session/auth is checked and the article id is known, then add:

```tsx
import { ReadTracker } from "./ReadTracker";
// ...
// Inside the JSX (after the article content):
<ReadTracker articleId={article.id} isAuthenticated={!!session} />
```

If the page already uses `getSession()` from `app/actions/session.ts`, pass `!!session` as `isAuthenticated`. If there is no session check yet, add:

```typescript
import { getSession } from "@/app/actions/session";
// at top of page component:
const session = await getSession();
```

- [ ] **Step 4: Verify in browser**

```bash
pnpm dev:frontend
```

1. Log in as a user.
2. Open any article. Wait 15 seconds. Navigate back to feed.
3. Check the DB:

```bash
docker exec -it $(docker ps --filter name=postgres -q) psql -U postgres -d finmate \
  -c "SELECT * FROM \"ReadHistory\" LIMIT 5;"
```

Expected: A row with your userId, the article's id, and a `readTime` of ~15.

- [ ] **Step 5: Commit**

```bash
git add apps/frontend-web/hooks/useReadTracker.ts \
        apps/frontend-web/app/article/[id]/ReadTracker.tsx \
        apps/frontend-web/app/article/[id]/page.tsx \
        apps/frontend-web/lib/api-client.ts
git commit -m "feat(history): track article read time and record to /user/history on navigation away"
```

---

## Task 6: Reading History Page

**Files:**
- Create: `apps/frontend-web/app/history/page.tsx`

- [ ] **Step 1: Create the history page**

Create `apps/frontend-web/app/history/page.tsx`:

```tsx
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { FeedCard } from "@/components/FeedCard";
import Link from "next/link";

export default function HistoryPage() {
  const { data: session } = authClient.useSession();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["history"],
      queryFn: ({ pageParam }) =>
        apiClient.getHistory(pageParam as string | undefined),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      enabled: !!session?.user,
    });

  if (!session?.user) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <p className="text-gray-500 mb-4">Sign in to view your reading history.</p>
        <Link href="/login" className="text-blue-600 underline">Sign in</Link>
      </div>
    );
  }

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Reading History</h1>

      {status === "pending" && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {status === "success" && items.length === 0 && (
        <p className="text-gray-500 text-center py-16">
          No history yet. Start reading articles to build it up.
        </p>
      )}

      <div className="space-y-3">
        {items.map((entry) => (
          <div key={entry.id} className="relative">
            <FeedCard article={entry.article as any} />
            <span className="absolute top-3 right-3 text-xs text-gray-400">
              {entry.readTime ? `${entry.readTime}s read` : "visited"}
              {" · "}
              {new Date(entry.readAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-8 w-full py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          {isFetchingNextPage ? "Loading…" : "Load more"}
        </button>
      )}
    </div>
  );
}
```

> **Note:** Check what the `FeedCard` component expects as props by opening `apps/frontend-web/components/FeedCard.tsx`. If it takes an `article` prop with specific fields, ensure the select in `history.service.ts` (Task 4, Step 1) returns all required fields.

- [ ] **Step 2: Add History link to Header**

Open `apps/frontend-web/components/Header.tsx` (or wherever the nav links are). Add a History link visible only when signed in:

```tsx
// Inside the authenticated nav section:
<Link href="/history" className="text-sm text-gray-600 hover:text-gray-900">
  History
</Link>
```

- [ ] **Step 3: Verify in browser**

Navigate to `http://localhost:3000/history`. If signed in, your recent reads should appear with read times. If not signed in, should show the sign-in prompt.

- [ ] **Step 4: Commit**

```bash
git add apps/frontend-web/app/history/page.tsx \
        apps/frontend-web/components/Header.tsx
git commit -m "feat(history): add reading history page with read time display"
```

---

## Task 7: Trending Topics — Backend

**Files:**
- Modify: `apps/backend-api/src/services/meta.service.ts`
- Modify: `apps/backend-api/src/routes/meta.ts`

- [ ] **Step 1: Add getTrending to meta service**

Open `apps/backend-api/src/services/meta.service.ts`. Add this function:

```typescript
export async function getTrending(hours = 24, topN = 12) {
  // unnest the tags array and count occurrences over the rolling window.
  // Uses a raw query because Prisma doesn't support unnest aggregation.
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);

  const rows = await prisma.$queryRaw<Array<{ tag: string; count: bigint }>>`
    SELECT tag, COUNT(*) AS count
    FROM "Article", unnest(tags) AS tag
    WHERE "publishedAt" >= ${since}
    GROUP BY tag
    ORDER BY count DESC
    LIMIT ${topN}
  `;

  return rows.map((r) => ({ tag: r.tag, count: Number(r.count) }));
}
```

- [ ] **Step 2: Add getMarketData stub (placeholder until Task 11)**

In the same file add:

```typescript
export async function getMarketData() {
  // Implemented in Task 11. Returns null until then.
  return null;
}
```

- [ ] **Step 3: Wire routes**

Open `apps/backend-api/src/routes/meta.ts`. Import the new functions and add two routes:

```typescript
import { getCategories, getSources, getTrending, getMarketData } from "../services/meta.service.js";

// Add these two routes alongside the existing ones:

router.get("/trending", async (req, res, next) => {
  try {
    const hours = parseInt(req.query.hours as string) || 24;
    const data = await getTrending(hours);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/market", async (req, res, next) => {
  try {
    const data = await getMarketData();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
```

- [ ] **Step 4: Smoke test**

```bash
curl http://localhost:4000/meta/trending
```

Expected: JSON array like `[{"tag":"inflation","count":14},{"tag":"fed","count":9},...]`

If the result is an empty array, the articles in your DB may have no tags. Check:
```bash
docker exec -it $(docker ps --filter name=postgres -q) psql -U postgres -d finmate \
  -c "SELECT tags FROM \"Article\" LIMIT 5;"
```

If tags are empty, run the ingestion worker first: `pnpm dev:worker`

- [ ] **Step 5: Commit**

```bash
git add apps/backend-api/src/services/meta.service.ts \
        apps/backend-api/src/routes/meta.ts
git commit -m "feat(trending): add GET /meta/trending — top tags over rolling 24h window"
```

---

## Task 8: TrendingTopics Frontend Component

**Files:**
- Create: `apps/frontend-web/components/TrendingTopics.tsx`
- Modify: `apps/frontend-web/lib/api-client.ts`
- Modify: `apps/frontend-web/app/page.tsx`

- [ ] **Step 1: Add getTrending to api-client**

Open `apps/frontend-web/lib/api-client.ts`. Add:

```typescript
getTrending: async (hours = 24) => {
  return fetchApi<Array<{ tag: string; count: number }>>(
    `/meta/trending?hours=${hours}`
  );
},
```

- [ ] **Step 2: Create TrendingTopics component**

Create `apps/frontend-web/components/TrendingTopics.tsx`:

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { TrendingUp } from "lucide-react";

interface Props {
  onTagClick?: (tag: string) => void;
  selectedTags?: string[];
}

export function TrendingTopics({ onTagClick, selectedTags = [] }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: () => apiClient.getTrending(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-7 w-20 bg-gray-100 rounded-full animate-pulse shrink-0" />
        ))}
      </div>
    );
  }

  if (!data?.length) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <TrendingUp className="w-4 h-4 text-gray-400 shrink-0" />
      {data.map(({ tag, count }) => {
        const active = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              active
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tag}
            <span className="ml-1 text-[10px] opacity-60">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Mount TrendingTopics in feed page**

Open `apps/frontend-web/app/page.tsx`. Find where the category filters or the main feed section begins. Add `<TrendingTopics>` above the existing filters, passing the same `onTagClick` handler used by the existing category filter:

```tsx
import { TrendingTopics } from "@/components/TrendingTopics";

// Inside JSX, just above the existing filter chips section:
<TrendingTopics
  onTagClick={(tag) => {
    setSelectedCategories((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }}
  selectedTags={selectedCategories}
/>
```

> **Note:** The state variable for selected categories in `page.tsx` may be named differently (e.g., `categories`, `selectedTags`). Check the file and use the correct name.

- [ ] **Step 4: Verify in browser**

Open `http://localhost:3000`. The trending bar should appear above the existing filters. Clicking a tag should filter the feed to articles with that tag.

Remove the debug `console.log` on line 69 of `apps/frontend-web/app/page.tsx` while you're in the file:
```diff
- console.log("Selected categories:", newCategories);
```

- [ ] **Step 5: Commit**

```bash
git add apps/frontend-web/components/TrendingTopics.tsx \
        apps/frontend-web/lib/api-client.ts \
        apps/frontend-web/app/page.tsx
git commit -m "feat(trending): add TrendingTopics bar to feed page with clickable tag filters"
```

---

## Task 9: Live Feed Refresh — Ingestion Worker Redis Publish

**Files:**
- Modify: `apps/ingestion-worker/src/processors/persist.ts`

The ingestion worker inserts articles but never notifies the backend. We need it to publish to Redis after each new insert so SSE clients can be notified.

- [ ] **Step 1: Add Redis client to ingestion worker**

Open `apps/ingestion-worker/package.json`. Check if `ioredis` is already a dependency. If not:

```bash
pnpm --filter ingestion-worker add ioredis
```

- [ ] **Step 2: Create a lazy Redis publisher in the worker**

Create `apps/ingestion-worker/src/redis.ts`:

```typescript
import Redis from "ioredis";

let client: Redis | null = null;

export function getRedis(): Redis {
  if (!client) {
    const url = process.env.REDIS_URL;
    if (!url) {
      // If Redis isn't configured, publish is a no-op — ingestion still works
      return { publish: async () => {} } as unknown as Redis;
    }
    client = new Redis(url);
    client.on("error", (err) => {
      console.error("[redis] ingestion-worker redis error:", err.message);
    });
  }
  return client;
}
```

- [ ] **Step 3: Publish after successful article insert**

Open `apps/ingestion-worker/src/processors/persist.ts`. Find the `upsertArticle` function. After the `prisma.article.create()` succeeds (inside the `if (!existing)` block), add:

```typescript
import { getRedis } from "../redis.js";

// Inside upsertArticle, after prisma.article.create():
const redis = getRedis();
await redis.publish(
  "feed:new-article",
  JSON.stringify({
    id: created.id,
    title: created.title,
    source: created.source,
    publishedAt: created.publishedAt.toISOString(),
  })
);
```

- [ ] **Step 4: Commit**

```bash
git add apps/ingestion-worker/src/redis.ts \
        apps/ingestion-worker/src/processors/persist.ts
git commit -m "feat(worker): publish feed:new-article Redis event after each new article insert"
```

---

## Task 10: Live Feed Refresh — SSE Backend Endpoint

**Files:**
- Create: `apps/backend-api/src/routes/live.ts`
- Modify: `apps/backend-api/src/app.ts`

- [ ] **Step 1: Create SSE route**

Create `apps/backend-api/src/routes/live.ts`:

```typescript
import { Router } from "express";
import { createClient } from "../redis.js"; // check path — the backend likely has a redis.ts or similar

const router = Router();

// GET /feed/live
// Server-Sent Events stream. Each new article published by the ingestion worker
// is forwarded to all connected clients as a "new-article" event.
router.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // disable nginx buffering if applicable
  res.flushHeaders();

  // Each SSE connection gets its own subscriber so messages are not shared
  // across connections incorrectly.
  const sub = createClient();
  sub.subscribe("feed:new-article", (err) => {
    if (err) {
      res.end();
      return;
    }
  });

  sub.on("message", (_channel: string, message: string) => {
    res.write(`event: new-article\ndata: ${message}\n\n`);
  });

  // Heartbeat every 30s to prevent proxy/load-balancer timeouts
  const heartbeat = setInterval(() => {
    res.write(": heartbeat\n\n");
  }, 30_000);

  req.on("close", () => {
    clearInterval(heartbeat);
    sub.unsubscribe("feed:new-article");
    sub.quit();
  });
});

export default router;
```

> **Important:** Check how the backend creates Redis clients. Open `apps/backend-api/src/` and look for a `redis.ts`, `lib/redis.ts`, or wherever `ioredis` is initialized. The function name `createClient` above must match. If the backend has a singleton pattern, you'll need to create a NEW Redis instance for this subscriber (Redis subscriber connections cannot be reused for publish/commands). Pass `REDIS_URL` directly: `new Redis(process.env.REDIS_URL!)`.

- [ ] **Step 2: Mount SSE route in app.ts**

Open `apps/backend-api/src/app.ts`. Add:

```typescript
import liveRouter from "./routes/live.js";
// ...
app.use("/feed/live", liveRouter);
```

- [ ] **Step 3: Smoke test SSE**

In one terminal:
```bash
pnpm dev:backend
curl -N http://localhost:4000/feed/live
```

In a second terminal, simulate a publish:
```bash
docker exec -it $(docker ps --filter name=redis -q) redis-cli PUBLISH feed:new-article '{"id":"test","title":"Test Article","source":"Test","publishedAt":"2026-04-26T00:00:00Z"}'
```

Expected: the curl terminal prints:
```
event: new-article
data: {"id":"test","title":"Test Article","source":"Test","publishedAt":"2026-04-26T00:00:00Z"}
```

- [ ] **Step 4: Commit**

```bash
git add apps/backend-api/src/routes/live.ts apps/backend-api/src/app.ts
git commit -m "feat(live): add GET /feed/live SSE endpoint for real-time new-article events"
```

---

## Task 11: Live Feed Refresh — Frontend Hook + Banner

**Files:**
- Create: `apps/frontend-web/hooks/useLiveFeed.ts`
- Modify: `apps/frontend-web/app/page.tsx`

- [ ] **Step 1: Create useLiveFeed hook**

Create `apps/frontend-web/hooks/useLiveFeed.ts`:

```typescript
"use client";

import { useEffect, useRef, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function useLiveFeed() {
  const [newCount, setNewCount] = useState(0);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // EventSource only in browser
    if (typeof window === "undefined") return;

    const es = new EventSource(`${API_URL}/feed/live`, {
      withCredentials: true,
    });
    esRef.current = es;

    es.addEventListener("new-article", () => {
      setNewCount((n) => n + 1);
    });

    es.onerror = () => {
      // Auto-reconnect is built into EventSource; no manual handling needed.
    };

    return () => {
      es.close();
    };
  }, []);

  const reset = () => setNewCount(0);

  return { newCount, reset };
}
```

- [ ] **Step 2: Add refresh banner to feed page**

Open `apps/frontend-web/app/page.tsx`. Add the hook and banner. At the top of the component:

```tsx
import { useLiveFeed } from "@/hooks/useLiveFeed";
// ...
const { newCount, reset } = useLiveFeed();
```

In the JSX, add the banner just inside the outermost container div, before the filters:

```tsx
{newCount > 0 && (
  <div className="sticky top-16 z-20 flex justify-center pointer-events-none">
    <button
      onClick={() => {
        reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Invalidate feed query to re-fetch with new articles
        queryClient.invalidateQueries({ queryKey: ["feed"] });
      }}
      className="pointer-events-auto bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all animate-bounce"
    >
      ↑ {newCount} new {newCount === 1 ? "article" : "articles"} — click to refresh
    </button>
  </div>
)}
```

> **Note:** To access `queryClient` in the component, use `const queryClient = useQueryClient()` from `@tanstack/react-query`.

- [ ] **Step 3: Verify in browser**

1. Open `http://localhost:3000` and keep the tab open.
2. Start the ingestion worker: `pnpm dev:worker`
3. Wait for the worker to run a cycle (up to 15 minutes, or trigger manually).
4. OR manually publish via redis-cli as in Task 10 Step 3.

Expected: A blue pill button slides in saying "↑ 1 new article — click to refresh". Clicking it scrolls to top and reloads the feed.

- [ ] **Step 4: Commit**

```bash
git add apps/frontend-web/hooks/useLiveFeed.ts \
        apps/frontend-web/app/page.tsx
git commit -m "feat(live): add live feed refresh banner using SSE — shows unseen article count"
```

---

## Task 12: Smarter Related Articles

**Files:**
- Modify: `apps/backend-api/src/services/feed.service.ts`

The current related articles query fetches articles sharing any tag, with no scoring. This task replaces it with: score by tag overlap count, ensure source diversity (no more than 1 article per source), cap at 5.

- [ ] **Step 1: Find the related articles query**

Open `apps/backend-api/src/services/feed.service.ts`. Find the function that fetches related articles (likely called `getRelatedArticles` or similar — it filters by `tags: { hasSome: ... }`). If the related articles logic is in `apps/backend-api/src/services/article.service.ts` instead, open that file.

- [ ] **Step 2: Replace with scored, source-diverse query**

Replace the related articles function body with:

```typescript
export async function getRelatedArticles(
  articleId: string,
  tags: string[],
  limit = 5
) {
  if (!tags.length) return [];

  // Fetch a wider pool: any article sharing at least one tag, excluding self,
  // from the last 7 days to keep results fresh.
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const pool = await prisma.article.findMany({
    where: {
      id: { not: articleId },
      tags: { hasSome: tags },
      publishedAt: { gte: since },
    },
    select: {
      id: true,
      title: true,
      link: true,
      source: true,
      publishedAt: true,
      summary: true,
      imageUrl: true,
      tags: true,
    },
    orderBy: { publishedAt: "desc" },
    take: 50, // over-fetch for scoring
  });

  // Score each article: tag overlap count drives relevance; publishedAt drives recency.
  const scored = pool.map((a) => {
    const overlap = a.tags.filter((t) => tags.includes(t)).length;
    const ageHours =
      (Date.now() - new Date(a.publishedAt).getTime()) / (1000 * 60 * 60);
    const recency = Math.exp(-ageHours / 48); // 48h half-life
    return { ...a, score: overlap * 0.7 + recency * 0.3 };
  });

  scored.sort((a, b) => b.score - a.score);

  // Pick top-scoring articles with source diversity: max 1 per source.
  const seen = new Set<string>();
  const results = [];
  for (const a of scored) {
    if (seen.has(a.source)) continue;
    seen.add(a.source);
    results.push(a);
    if (results.length >= limit) break;
  }

  return results;
}
```

- [ ] **Step 3: Verify the related articles appear on an article page**

```bash
pnpm dev:backend && pnpm dev:frontend
```

Open any article. The related articles panel should show articles from different sources. If all related articles were previously from the same outlet, they should now be spread across sources.

- [ ] **Step 4: Commit**

```bash
git add apps/backend-api/src/services/feed.service.ts
git commit -m "feat(feed): smarter related articles with tag-overlap scoring and source diversity"
```

---

## Task 13: Real Market Data — Backend Service

**Files:**
- Create: `apps/backend-api/src/services/market.service.ts`
- Modify: `apps/backend-api/src/services/meta.service.ts`

Yahoo Finance's chart API (`/v8/finance/chart/`) is free, requires no API key, and returns OHLCV data. We'll fetch the latest price for a few symbols and cache in Redis for 60 seconds.

- [ ] **Step 1: Create market service**

Create `apps/backend-api/src/services/market.service.ts`:

```typescript
import { getRedis } from "../lib/redis.js"; // adjust path to match backend's Redis import

const SYMBOLS = [
  { symbol: "^GSPC", label: "S&P 500" },
  { symbol: "^IXIC", label: "Nasdaq" },
  { symbol: "BTC-USD", label: "BTC" },
  { symbol: "^TNX", label: "10Y Yield" },
];

const CACHE_KEY = "market:quotes";
const CACHE_TTL = 60; // seconds

interface Quote {
  label: string;
  symbol: string;
  price: number;
  change: number;    // absolute
  changePercent: number;
}

async function fetchQuote(symbol: string): Promise<{ price: number; change: number; changePercent: number } | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=2d`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;

    const json = await res.json();
    const result = json?.chart?.result?.[0];
    if (!result) return null;

    const meta = result.meta;
    const price: number = meta.regularMarketPrice ?? 0;
    const prevClose: number = meta.chartPreviousClose ?? meta.previousClose ?? price;
    const change = price - prevClose;
    const changePercent = prevClose !== 0 ? (change / prevClose) * 100 : 0;

    return { price, change, changePercent };
  } catch {
    return null;
  }
}

export async function getMarketQuotes(): Promise<Quote[]> {
  const redis = getRedis();

  // Try cache first
  const cached = await redis.get(CACHE_KEY);
  if (cached) {
    return JSON.parse(cached) as Quote[];
  }

  // Fetch all symbols in parallel
  const results = await Promise.all(
    SYMBOLS.map(async ({ symbol, label }) => {
      const data = await fetchQuote(symbol);
      if (!data) return null;
      return { label, symbol, ...data } as Quote;
    })
  );

  const quotes = results.filter((q): q is Quote => q !== null);

  if (quotes.length > 0) {
    await redis.set(CACHE_KEY, JSON.stringify(quotes), "EX", CACHE_TTL);
  }

  return quotes;
}
```

> **Important:** Check how the backend exports its Redis client. Look for `apps/backend-api/src/lib/redis.ts` or similar. If it exports a singleton `redis` instance rather than a `getRedis()` function, adjust the import and usage above accordingly.

- [ ] **Step 2: Wire into meta service**

Open `apps/backend-api/src/services/meta.service.ts`. Replace the stub `getMarketData` from Task 7 with:

```typescript
import { getMarketQuotes } from "./market.service.js";

export async function getMarketData() {
  return getMarketQuotes();
}
```

- [ ] **Step 3: Smoke test**

```bash
curl http://localhost:4000/meta/market
```

Expected: JSON array like:
```json
[
  { "label": "S&P 500", "symbol": "^GSPC", "price": 5123.45, "change": 12.3, "changePercent": 0.24 },
  { "label": "Nasdaq", "symbol": "^IXIC", "price": 16200.1, "change": -45.2, "changePercent": -0.28 },
  ...
]
```

If Yahoo Finance is unreachable or returns no data, the endpoint returns `[]`. That is acceptable.

- [ ] **Step 4: Commit**

```bash
git add apps/backend-api/src/services/market.service.ts \
        apps/backend-api/src/services/meta.service.ts
git commit -m "feat(market): add market quotes service fetching Yahoo Finance with 60s Redis cache"
```

---

## Task 14: MarketBar Frontend Component

**Files:**
- Create: `apps/frontend-web/components/MarketBar.tsx`
- Modify: `apps/frontend-web/lib/api-client.ts`
- Modify: `apps/frontend-web/components/FiltersPanel.tsx`

- [ ] **Step 1: Add getMarket to api-client**

Open `apps/frontend-web/lib/api-client.ts`. Add:

```typescript
getMarket: async () => {
  return fetchApi<
    Array<{
      label: string;
      symbol: string;
      price: number;
      change: number;
      changePercent: number;
    }>
  >("/meta/market");
},
```

- [ ] **Step 2: Create MarketBar component**

Create `apps/frontend-web/components/MarketBar.tsx`:

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { TrendingUp, TrendingDown } from "lucide-react";

export function MarketBar() {
  const { data } = useQuery({
    queryKey: ["market"],
    queryFn: () => apiClient.getMarket(),
    staleTime: 60 * 1000,      // 1 minute — matches backend cache TTL
    refetchInterval: 60 * 1000,
  });

  if (!data?.length) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-none">
      {data.map((q) => {
        const positive = q.change >= 0;
        return (
          <div key={q.symbol} className="shrink-0 flex items-center gap-1.5">
            <span className="text-xs font-semibold text-gray-700">{q.label}</span>
            <span className="text-xs text-gray-900">
              {q.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span
              className={`flex items-center gap-0.5 text-xs font-medium ${
                positive ? "text-green-600" : "text-red-500"
              }`}
            >
              {positive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {positive ? "+" : ""}
              {q.changePercent.toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 3: Replace hardcoded values in FiltersPanel**

Open `apps/frontend-web/components/FiltersPanel.tsx`. Find the "Markets Today" section — it has hardcoded static values (S&P 500, Nasdaq, Dow Jones numbers). Replace the entire static block with:

```tsx
import { MarketBar } from "@/components/MarketBar";

// Replace the static market widget with:
<div>
  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
    Markets
  </p>
  <MarketBar />
</div>
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:3000`. The FiltersPanel should now show live market prices refreshing every 60 seconds. Values should update when you leave the tab open for a minute.

- [ ] **Step 5: Commit**

```bash
git add apps/frontend-web/components/MarketBar.tsx \
        apps/frontend-web/components/FiltersPanel.tsx \
        apps/frontend-web/lib/api-client.ts
git commit -m "feat(market): add live market bar replacing hardcoded FiltersPanel values"
```

---

## Task 15: Cleanup — Remove Dead Code

These fixes are quick but improve correctness and should not be skipped.

- [ ] **Step 1: Delete the old duplicate api-client**

```bash
rm apps/frontend-web/app/lib/api-client.ts
```

Verify nothing imports from it:
```bash
grep -r "app/lib/api-client" apps/frontend-web/
```

Expected: no output. If any files import it, update them to `@/lib/api-client`.

- [ ] **Step 2: Delete the dead backend route stub**

```bash
rm apps/backend-api/src/routes/index.ts
```

Verify it is not imported anywhere:
```bash
grep -r "routes/index" apps/backend-api/src/
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove dead duplicate api-client and unused backend route stub"
```

---

## Final Verification

- [ ] Run TypeScript check across the monorepo:

```bash
pnpm check-types
```

Expected: no type errors. Fix any that appear before proceeding.

- [ ] Start all services and do a full smoke test:

```bash
pnpm dev:all
```

Checklist:
- [ ] Feed loads with TrendingTopics bar above filters
- [ ] Trending tags are clickable and filter the feed
- [ ] MarketBar in FiltersPanel shows live prices (not hardcoded)
- [ ] Searching "inflation" returns relevant articles ranked by relevance
- [ ] Reading an article for 10+ seconds and navigating away creates a ReadHistory row in DB
- [ ] `/history` page shows read articles with read times
- [ ] Triggering a Redis publish on `feed:new-article` shows the refresh banner on the feed page
- [ ] No console errors in browser

- [ ] Final commit:

```bash
git add -A
git commit -m "feat: core feed enhancements complete — history, full-text search, trending, live refresh, market data"
```

---

## Extras: Cherry-on-Top Features

> These are not part of the current implementation sprint. They are ordered from most to least impactful for making FinMate look like a serious, production-grade platform.

### E1 — Keyword & Ticker Alerts

Users define watchlist rules: a keyword (e.g., "Federal Reserve"), a stock ticker (e.g., "AAPL"), or a tag (e.g., "crypto"). When the ingestion worker saves a matching article, an in-app notification is triggered (and optionally an email via Resend/SendGrid).

**Why it matters:** This is the most-cited "power user" feature in the research paper. It makes FinMate actively useful rather than passively informational. It differentiates the product from a dumb RSS reader.

**Stack:** New `Alert` and `Notification` Prisma models. Worker checks alerts after each insert. Backend `GET /user/notifications` endpoint. Frontend notification bell icon in Header with unread count badge.

---

### E2 — AI-Powered Article Summaries (Claude API)

At ingestion time, for articles where `summary` is missing or under 100 characters, call Claude Haiku via the Anthropic API to generate a 2-sentence TL;DR. Store in the `summary` field. This runs asynchronously in the worker so it never blocks ingestion.

**Why it matters:** Many RSS feeds provide no summary or a truncated one. High-quality summaries make the feed skimmable and is a direct paper requirement. Using Claude is also directly aligned with the research paper's AI-native positioning.

**Stack:** `@anthropic-ai/sdk` in ingestion-worker. Prompt: `"Summarize this financial news article in 2 sentences for a retail investor. Be specific about the subject and the key market implication. Article: {content}"`. Add rate-limiting guard (max 100 calls/hour to control cost).

---

### E3 — Full Preference-Weighted Feed Ranking

Upgrade the current feed scoring to incorporate read history. After Task 5 (read tracking) is live, add a step in `feed.service.ts` that:
1. Fetches the user's top 10 most-read tags from `ReadHistory` (count tag occurrences across read articles).
2. Replaces the simple "is any preferred tag present" boolean boost with a graded score based on how many top tags the article matches.

**Why it matters:** This is the behavioral analytics component promised in the paper. It makes the feed visibly personalize over time — a compelling demo moment. It uses data already being collected by Task 5, so no extra infrastructure.

---

### E4 — Dark Mode

Unblock `forcedTheme="light"` in `apps/frontend-web/app/providers.tsx` and complete the theme implementation. The theme switcher code already exists in `/settings` — it just needs to be enabled. Test all components in both modes; patch any hard-coded `bg-white` or `text-gray-900` classes to use Tailwind's `dark:` variants.

**Why it matters:** It's table stakes for any modern web app. The research paper implicitly assumes it. The infrastructure (next-themes) is already installed — this is purely a CSS sweep.

---

### E5 — Portfolio Watchlist (Ticker → News Feed)

Users add stock/crypto tickers (AAPL, ETH, NVDA) to a watchlist. The feed de-prioritizes articles that mention none of their tickers, and surfacing a "Watchlist" tab that shows only articles mentioning tracked symbols. Ticker extraction at ingestion time uses regex + a curated list of major ticker symbols.

**Why it matters:** Converts FinMate from a generic aggregator into a personal market intelligence tool. High stickiness — users who build a watchlist return daily.

---

### E6 — Weekly Email Digest

Every Monday at 8am, send each user a digest of the top 10 articles from the past week ranked by their personal score. Uses the same ranking engine already built. Emails sent via Resend (free tier: 3,000/month).

**Stack:** New cron job in `ingestion-worker` (or a new `digest-worker` app). HTML email template. Resend SDK. Unsubscribe link stored as a signed token.

**Why it matters:** Passive engagement — users who don't visit daily still see value from FinMate. Drives re-engagement. Very straightforward to implement once the ranking engine is solid.

---

### E7 — Source Credibility Scoring

Each `Source` record gains a `credibilityScore` (float, 0–1, default 0.7). Admins (or a simple `/admin` page) can adjust scores. This weight gets factored into the feed ranking formula as `0.05 * credibilityScore`, giving premium sources a small but meaningful edge.

**Why it matters:** Directly implements the `r_source` term from the paper's sentiment formula (Equation 1). It's a one-field schema change plus a small ranking tweak, but it makes the research claims credibly implemented.

---

### E8 — Chrome Extension (Full Implementation)

Replace the default Vite scaffold with an actual FinMate extension:
- **Popup:** Top 10 ranked articles from the feed API.
- **New-tab override:** Full feed with MarketBar, TrendingTopics, and a search box.
- **Background service worker:** Subscribes to the SSE endpoint; dispatches Chrome notifications for new articles matching the user's alert rules.
- **Auth:** Shared session cookie from `finmate.session_token`.

**Why it matters:** The Chrome extension is prominently featured in the research paper (entire Section V). It's the key differentiator from a standard web reader. Without it, a significant portion of the paper's contribution is unimplemented.
