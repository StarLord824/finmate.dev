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
