"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BentoFeedCard } from "./BentoFeedCard";
import type { Article } from "@/lib/types";
import type { ReactElement } from "react";

interface BentoGridProps {
  articles: Article[];
  onBookmarkToggle?: (articleId: string, isBookmarked: boolean) => void;
}

export function BentoGrid({ articles, onBookmarkToggle }: BentoGridProps): ReactElement {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = 0.5; // pixels per frame

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset scroll when reaching the end
      if (scrollPosition >= container.scrollHeight / 2) {
        scrollPosition = 0;
      }
      
      container.scrollTop = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start auto-scroll
    animationFrameId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Duplicate articles for seamless loop
  const duplicatedArticles = [...articles, ...articles];

  // Bento grid pattern: varying sizes
  const getGridClass = (index: number) => {
    const patterns = [
      "col-span-1 row-span-1", // Small
      "col-span-2 row-span-1", // Wide
      "col-span-1 row-span-2", // Tall
      "col-span-2 row-span-2", // Large
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-1", // Small
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div
      ref={scrollContainerRef}
      className="h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[300px] gap-4 pb-8">
        {duplicatedArticles.map((article, index) => (
          <motion.div
            key={`${article.id}-${index}`}
            className={getGridClass(index)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: (index % 12) * 0.05 }}
          >
            <div className="h-full">
              <BentoFeedCard
                article={article}
                index={index}
                onBookmarkToggle={onBookmarkToggle}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
