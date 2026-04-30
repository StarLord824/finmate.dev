# FinMate Frontend Revamp Design Spec

**Goal:** Complete visual and structural rebuild of the frontend into a clean, editorial, professional finance product — without touching any data layer (API client, hooks, React Query logic, auth).

**Approach:** Option B — full component rebuild using shadcn/ui as the base layer, new layout shell (left sidebar + topbar), new design tokens, new page layouts for the 4 scoped pages.

**Scope:** Feed, Article Detail, Search, Bookmarks. Arena, History, Settings, Login/Signup inherit the new design system but are not fully redesigned.

---

## 1. Design System

### Color Palette (Tailwind CSS v4 variables, light mode only)

| Token | Value | Usage |
|---|---|---|
| Background | `zinc-50` (#fafafa) | Page background |
| Surface | `white` | Cards, panels |
| Border | `zinc-200` | Card borders, dividers |
| Text primary | `zinc-900` | Headings, body |
| Text secondary | `zinc-500` | Meta, captions, placeholders |
| Accent | `blue-600` | Links, active nav, CTAs, focus rings |
| Positive | `emerald-500` | Price up, success |
| Negative | `red-500` | Price down, errors |

### Typography

All text uses Inter (already configured). Scale:

| Role | Class |
|---|---|
| Page title | `text-2xl font-semibold tracking-tight text-zinc-900` |
| Section heading | `text-lg font-medium text-zinc-900` |
| Card title | `text-base font-semibold leading-snug` |
| Body / article prose | `text-sm leading-relaxed` |
| Meta (date, source, tag) | `text-xs text-zinc-500` |

### Spacing

8px base grid. Consistent usage: `gap-4` between cards, `gap-6` between sections, `p-4` card padding, `p-6` page padding.

### shadcn/ui Components to Install

Button, Badge, Card, Input, Separator, Skeleton, Sheet, DropdownMenu, Dialog, ScrollArea, Tooltip, Avatar

---

## 2. Layout Shell

Replaces the current single-column layout with a persistent left sidebar + per-page content area.

### Left Sidebar (`w-60`, sticky full-height)

- **Top:** FinMate logo + wordmark
- **Nav links** (with Lucide icon + label): Feed (`/`), Search (`/search`), Bookmarks (`/bookmarks`), History (`/history`), Arena (`/arena`)
- **Active state:** `bg-zinc-100 text-zinc-900 font-medium` pill, inactive `text-zinc-500 hover:text-zinc-900`
- **Bottom:** User avatar (shadcn Avatar) + display name + Settings link
- **Responsive:** Collapses to icon-only (`w-16`) at `md`, hidden at `sm` with Sheet drawer (hamburger in mobile topbar)

### Mobile Topbar (visible only below `md`)

- Left: hamburger → opens Sheet sidebar
- Center: FinMate wordmark
- Right: search icon shortcut

### Main Content Area

- Layout: `flex-1 min-w-0`
- Inner max-width: `max-w-5xl mx-auto px-6 py-8`
- Per-page topbar: page title (left) + contextual actions (right) — not a global bar

### Files

- `components/layout/Sidebar.tsx` — sidebar nav, responsive collapse, user section
- `components/layout/MobileHeader.tsx` — mobile topbar with Sheet trigger
- `app/layout.tsx` — updated root layout: `flex h-screen overflow-hidden` shell

---

## 3. Page Designs

### 3.1 Feed (`/`)

**Page topbar:** "Feed" title left, Live indicator (pulsing green dot + "Live" badge when SSE connected) right.

**MarketBar:** Compact horizontal strip directly below topbar. Four tickers (S&P 500, Nasdaq, BTC, 10Y Yield) as inline chips: symbol + price + colored change percent. `text-xs`, `bg-white border border-zinc-200 rounded-full px-3 py-1`.

**Filters row:** Horizontal scroll row of shadcn Badge toggles — source chips first, then tag chips. Active = `bg-zinc-900 text-white`, inactive = outlined. Clears via "×" on each or "Clear all" link.

**Layout:** Two-panel — main content (`flex-1`) + right rail (`w-64 shrink-0`, hidden below `lg`).

**Article grid (main):** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`

**Article card anatomy:**
1. Image: `aspect-video w-full object-cover rounded-lg bg-zinc-100` (placeholder shimmer if no image)
2. Source badge + date: `flex items-center gap-2 mt-3` — `Badge variant="secondary"` for source, `text-xs text-zinc-500` for date
3. Title: `text-base font-semibold leading-snug line-clamp-2 mt-1`
4. Summary: `text-sm text-zinc-500 line-clamp-3 mt-1`
5. Tags: `flex flex-wrap gap-1 mt-2` — small outlined badges

**Right rail (desktop only):**
- "Trending" heading + list of top 8 tags as clickable chips
- `Separator` between trending and a "Top Sources" compact list

**Skeleton loading:** Full grid of 6 card skeletons using shadcn Skeleton.

**Files:**
- `app/page.tsx` — feed page, layout composition
- `components/feed/ArticleCard.tsx` — card component
- `components/feed/ArticleGrid.tsx` — grid with skeleton states
- `components/feed/FilterBar.tsx` — filter chips row
- `components/feed/FeedSidebar.tsx` — right rail (trending + sources)
- `components/feed/MarketBar.tsx` — updated market strip

---

### 3.2 Article Detail (`/article/[id]`)

**Layout:** Two-column on desktop — article body (`flex-1`) + right rail (`w-72`, sticky top-8).

**Structure (top to bottom):**
1. Back button: `← Feed` text link, `text-sm text-zinc-500 hover:text-zinc-900`
2. Source badge + reading time estimate (left), date (right): `flex justify-between items-center mt-4`
3. Title: `text-3xl font-bold tracking-tight leading-tight mt-2`
4. Author + date line: `text-sm text-zinc-500 mt-2`
5. Hero image: `w-full max-h-80 object-cover rounded-xl mt-6` (hidden if no image)
6. Article prose body: `prose prose-zinc max-w-none mt-6` (requires `@tailwindcss/typography`)
7. Tags row: `flex flex-wrap gap-2 mt-8 pt-6 border-t border-zinc-200`

**Right rail (sticky):**
- "Related Articles" heading + 3 compact cards (image left 64px, title 2-line clamp right)
- `Separator`
- Share button (copy link to clipboard, Tooltip confirms "Copied!")

**Read tracker:** unchanged — fires `recordRead` after 10s, cleanup on unmount.

**Files:**
- `app/article/[id]/page.tsx` — updated layout and composition
- `components/article/ArticleBody.tsx` — prose rendering
- `components/article/ArticleMeta.tsx` — source, author, date, reading time
- `components/article/RelatedArticles.tsx` — right rail related cards

---

### 3.3 Search (`/search`)

**Structure:**
1. Large search input: full-width, `h-12 text-base`, autofocus, Lucide Search icon left, clear button right when value present
2. Results count: `text-sm text-zinc-500` ("23 results for "inflation"")
3. Results list: single-column, each result is a horizontal card — image `w-24 h-16 rounded-md object-cover` left, title + summary + meta right
4. Empty state (no query): centered illustration area + "Search for articles, topics, or sources" subtitle + 4 suggested query chips
5. No-results state: "No results for X" + "Try a broader search" suggestion

**Files:**
- `app/search/page.tsx` — search page
- `components/search/SearchInput.tsx` — controlled input with icon/clear
- `components/search/SearchResultCard.tsx` — horizontal result card
- `components/search/SearchEmptyState.tsx` — empty + no-results states

---

### 3.4 Bookmarks (`/bookmarks`)

**Structure:**
1. Page topbar: "Bookmarks" title + article count badge right
2. Same 3-col `ArticleGrid` as feed
3. Card modification: bookmark remove button (X icon, `absolute top-2 right-2`) visible on card hover — calls `removeBookmark` mutation
4. Empty state: centered, "No bookmarks yet", primary Button "Browse Feed" → `/`

**Files:**
- `app/bookmarks/page.tsx` — bookmarks page
- Reuses `ArticleCard.tsx` with `showRemoveBookmark` prop

---

## 4. Component Boundaries

| Component | Responsibility | Dependencies |
|---|---|---|
| `Sidebar` | Nav links, user section, responsive collapse | `next/link`, `usePathname`, shadcn Avatar/Sheet |
| `ArticleCard` | Single card rendering, no data fetching | Props only |
| `ArticleGrid` | Grid layout + skeleton state | `ArticleCard`, shadcn Skeleton |
| `FilterBar` | Filter state UI, emits onChange | shadcn Badge |
| `MarketBar` | Renders pre-fetched quotes | Props only |
| `FeedSidebar` | Trending topics + sources | Props only |
| `SearchInput` | Controlled input, debounced onChange | shadcn Input |
| `ArticleBody` | Prose rendering | `@tailwindcss/typography` |

Data fetching stays in page components and existing hooks — no data logic inside presentational components.

---

## 5. Dependencies to Add

```bash
# shadcn/ui init + components
npx shadcn@latest init
npx shadcn@latest add button badge card input separator skeleton sheet dropdown-menu dialog scroll-area tooltip avatar

# Tailwind Typography for article prose
pnpm add -D @tailwindcss/typography --filter frontend-web
```

---

## 6. Out of Scope

- Arena, History, Settings, Login/Signup page redesigns (inherit design tokens only)
- Dark mode
- Animation overhaul (existing Framer Motion animations can stay or be trimmed per component)
- Backend changes of any kind
