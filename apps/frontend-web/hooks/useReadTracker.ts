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
      // Only record if user spent at least 10 seconds — filters out bounces
      // and keeps history meaningful rather than logging every page visit.
      if (elapsed >= 10) {
        apiClient.recordRead(articleId, elapsed).catch(() => {});
      }
    };
  }, [articleId, isAuthenticated]);
}
