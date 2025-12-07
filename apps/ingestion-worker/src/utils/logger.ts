// src/utils/logger.ts
import pino from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

// Pino logger configuration for ingestion worker
export const logger = pino({
  level: process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info"),
  
  // Development: Pretty print with colors
  // Production: Structured JSON for CloudWatch
  transport: isDevelopment
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
          singleLine: false,
        },
      }
    : undefined,

  // Base configuration
  base: {
    env: process.env.NODE_ENV || "development",
    service: "ingestion-worker",
  },

  // Timestamp format
  timestamp: () => `,"time":"${new Date().toISOString()}"`,

  // Format error objects properly
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});

// Helper functions for structured logging
export const logFeedFetch = (data: {
  source: string;
  url: string;
  articleCount?: number;
  duration?: number;
  error?: Error;
}) => {
  if (data.error) {
    logger.error({ ...data, err: data.error }, `Feed fetch failed: ${data.source}`);
  } else {
    logger.info(data, `Feed fetched successfully: ${data.source}`);
  }
};

export const logArticleProcessing = (data: {
  articleId?: string;
  title?: string;
  source: string;
  action: "created" | "duplicate" | "updated" | "error";
  error?: Error;
}) => {
  if (data.action === "error" && data.error) {
    logger.error({ ...data, err: data.error }, "Article processing error");
  } else if (data.action === "duplicate") {
    logger.debug(data, "Duplicate article skipped");
  } else {
    logger.info(data, `Article ${data.action}`);
  }
};

export const logDbOperation = (data: {
  operation: string;
  table: string;
  count?: number;
  duration?: number;
  error?: Error;
}) => {
  if (data.error) {
    logger.error({ ...data, err: data.error }, `Database operation failed: ${data.operation}`);
  } else {
    logger.debug(data, `Database operation: ${data.operation}`);
  }
};

export const logScheduledJob = (data: {
  job: string;
  status: "started" | "completed" | "failed";
  duration?: number;
  error?: Error;
}) => {
  if (data.status === "failed" && data.error) {
    logger.error({ ...data, err: data.error }, `Scheduled job failed: ${data.job}`);
  } else {
    logger.info(data, `Scheduled job ${data.status}: ${data.job}`);
  }
};