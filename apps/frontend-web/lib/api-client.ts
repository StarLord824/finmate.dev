import type { Article, FeedResponse, SearchResult, UserPreferences, CategoriesResponse, SourcesResponse, MarketQuote, MarketHistory, MarketSymbol } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

class ApiClient {
  private baseUrl: string;
  private sessionToken: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setSessionToken(token: string | null) {
    this.sessionToken = token;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const authHeaders: Record<string, string> = this.sessionToken
      ? { Authorization: `Bearer ${this.sessionToken}` }
      : {};

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async getFeed(params?: {
    limit?: number;
    after?: string;
    tags?: string[];
    sources?: string[];
  }): Promise<FeedResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.after) searchParams.append("after", params.after);
    if (params?.tags?.length) searchParams.append("tags", params.tags.join(","));
    if (params?.sources?.length) searchParams.append("sources", params.sources.join(","));

    const query = searchParams.toString();
    return this.fetch<FeedResponse>(`/feed${query ? `?${query}` : ""}`);
  }

  async getArticle(id: string): Promise<Article> {
    const response = await this.fetch<{ data: Article }>(`/article/${id}`);
    return response.data;
  }

  async getRelatedArticles(id: string, limit = 5): Promise<Article[]> {
    const response = await this.fetch<{ data: Article[] }>(
      `/article/${id}/related?limit=${limit}`
    );
    return response.data;
  }

  async searchArticles(query: string): Promise<SearchResult> {
    const searchParams = new URLSearchParams({ q: query });
    const response = await this.fetch<{ data: Article[] }>(`/search?${searchParams.toString()}`);
    return { articles: response.data, total: response.data.length };
  }

  async getUserPreferences(): Promise<UserPreferences> {
    const response = await this.fetch<{ data: UserPreferences }>("/user/preferences");
    return response.data;
  }

  async updatePreferences(preferences: UserPreferences): Promise<void> {
    await this.fetch("/user/preferences", {
      method: "POST",
      body: JSON.stringify(preferences),
    });
  }

  async toggleBookmark(articleId: string, isBookmarked: boolean): Promise<void> {
    await this.fetch("/user/bookmark", {
      method: "POST",
      body: JSON.stringify({ articleId, isBookmarked }),
    });
  }

  async getBookmarks(): Promise<Article[]> {
    const response = await this.fetch<{ data: Article[] }>("/user/bookmarks");
    return response.data;
  }

  // Meta endpoints
  async getCategories(): Promise<string[]> {
    const response = await this.fetch<CategoriesResponse>("/meta/categories");
    return response.data;
  }

  async getSources(): Promise<SourcesResponse["data"]> {
    const response = await this.fetch<SourcesResponse>("/meta/sources");
    return response.data;
  }

  // Read history
  async recordRead(articleId: string, readTime?: number): Promise<void> {
    await this.fetch("/user/history", {
      method: "POST",
      body: JSON.stringify({ articleId, readTime }),
    });
  }

  async getHistory(cursor?: string, limit = 20): Promise<{
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
  }> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (cursor) params.set("cursor", cursor);
    return this.fetch(`/user/history?${params}`);
  }

  // Trending topics
  async getTrending(hours = 24): Promise<Array<{ tag: string; count: number }>> {
    return this.fetch(`/meta/trending?hours=${hours}`);
  }

  // Market data
  async getMarket(): Promise<MarketQuote[]> {
    return this.fetch("/meta/market");
  }

  async getMarketHistory(symbol: string, range: string): Promise<MarketHistory> {
    return this.fetch(`/meta/market/history?symbol=${encodeURIComponent(symbol)}&range=${range}`);
  }

  async getMarketSymbols(): Promise<MarketSymbol[]> {
    return this.fetch("/meta/market/symbols");
  }
}


export const apiClient = new ApiClient(API_BASE_URL);
