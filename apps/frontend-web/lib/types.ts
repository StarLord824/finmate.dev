export interface Article {
  id: string;
  title: string;
  summary: string | null;
  content?: string | null;
  source: string; // Backend stores source as string (source name)
  publishedAt: string; // ISO timestamp
  tags: string[];
  imageUrl?: string | null;
  link: string; // Backend uses 'link' not 'originalLink'
  author?: string | null;
  isBookmarked?: boolean; // Frontend-only field
  readingTime?: number; // Computed on frontend
}

export interface FeedResponse {
  data: Article[]; // Backend returns { data: Article[] }
}

export interface UserPreferences {
  selectedTags: string[];
  selectedSources: string[];
  theme: "light" | "dark" | "system";
}

export interface SearchResult {
  articles: Article[];
  total: number;
}

export const CATEGORIES = [
  "Markets",
  "Crypto",
  "Macro",
  "Personal Finance",
  "Investing",
  "Fintech",
] as const;

export type Category = (typeof CATEGORIES)[number];
