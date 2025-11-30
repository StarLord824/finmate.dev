// src/types/api.ts
export type FeedQuery = {
  limit?: number;
  after?: string; // ISO timestamp for pagination cursor (return items older than 'after')
  tags?: string[]; // comma separated
  sources?: string[]; // comma separated
  userId?: string | null; // optional
};
