"use client";

import { useEffect, useRef, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function useLiveFeed() {
  const [newCount, setNewCount] = useState(0);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // EventSource only in browser
    if (typeof window === "undefined") return;

    const es = new EventSource(`${API_URL}/feed/live`, {
      withCredentials: true,
    });
    esRef.current = es;

    es.addEventListener("new-article", () => {
      setNewCount((n) => n + 1);
    });

    es.onerror = () => {
      // Auto-reconnect is built into EventSource; no manual handling needed.
    };

    return () => {
      es.close();
    };
  }, []);

  const reset = () => setNewCount(0);

  return { newCount, reset };
}
