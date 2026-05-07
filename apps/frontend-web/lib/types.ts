export interface Article {
  id: string;
  title: string;
  summary: string | null;
  content?: string | null;
  source: string;
  publishedAt: string;
  tags: string[];
  aiTags?: string[];
  aiSummary?: string | null;
  sentiment?: string | null;
  sentimentScore?: number | null;
  enrichStatus?: string;
  imageUrl?: string | null;
  link: string;
  author?: string | null;
  isBookmarked?: boolean;
  readingTime?: number;
}

export interface FeedResponse {
  data: Article[]; // Backend returns { data: Article[] }
}

export interface UserPreferences {
  categories?: string[];
  sources?: string[];
  watchlist?: string[];
  theme?: "light" | "dark" | "system";
  [key: string]: any;
}

export interface SearchResult {
  articles: Article[];
  total: number;
}

// Source from backend
export interface Source {
  id: string;
  name: string;
  url: string;
  logo?: string;
}

// Meta responses
export interface CategoriesResponse {
  data: string[];
}

export interface SourcesResponse {
  data: Source[];
}

// Category is now a string (dynamic from backend)
export type Category = string;
