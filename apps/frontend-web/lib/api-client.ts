import type { Article, FeedResponse, SearchResult, UserPreferences } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
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

  async searchArticles(query: string): Promise<SearchResult> {
    const searchParams = new URLSearchParams({ q: query });
    const response = await this.fetch<{ data: Article[] }>(`/search?${searchParams.toString()}`);
    return { articles: response.data, total: response.data.length };
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
}

export const apiClient = new ApiClient(API_BASE_URL);
