// src/utils/logger.ts
import pino from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

// Pino logger configuration
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
    service: "backend-api",
  },

  // Timestamp format
  timestamp: () => `,"time":"${new Date().toISOString()}"`,

  // Serializers for common objects
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err,
  },

  // Format error objects properly
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});

// Helper functions for structured logging
export const logRequest = (data: {
  method: string;
  url: string;
  userId?: string;
  ip?: string;
}) => {
  logger.info(data, "HTTP Request");
};

export const logResponse = (data: {
  method: string;
  url: string;
  statusCode: number;
  responseTime: number;
  userId?: string;
}) => {
  logger.info(data, "HTTP Response");
};

export const logError = (error: Error, context?: Record<string, any>) => {
  logger.error({ err: error, ...context }, error.message);
};

export const logDbOperation = (data: {
  operation: string;
  table: string;
  duration?: number;
  error?: Error;
}) => {
  if (data.error) {
    logger.error(data, `Database operation failed: ${data.operation}`);
  } else {
    logger.debug(data, `Database operation: ${data.operation}`);
  }
};
