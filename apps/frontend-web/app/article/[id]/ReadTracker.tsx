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
