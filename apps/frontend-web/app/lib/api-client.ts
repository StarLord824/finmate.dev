const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const apiClient = {
  async getFeed(limit = 20, after?: string, tags?: string[], sources?: string[]) {
    const params = new URLSearchParams();
    params.set("limit", limit.toString());
    if (after) params.set("after", after);
    if (tags && tags.length > 0) params.set("tags", tags.join(","));
    if (sources && sources.length > 0) params.set("sources", sources.join(","));

    const res = await fetch(`${API_URL}/feed?${params.toString()}`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json.data;
  },

  async getArticle(id: string) {
    const res = await fetch(`${API_URL}/article/${id}`, { cache: "no-store" });
    const json = await res.json();
    return json.data;
  },

  async toggleBookmark(articleId: string, isBookmarked: boolean) {
    return fetch(`${API_URL}/user/bookmark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "demo-user", // replace later with auth
        articleId,
        action: isBookmarked ? "remove" : "add",
      }),
    });
  },
};
