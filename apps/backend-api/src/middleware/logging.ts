// src/middleware/logging.ts
import { Request, Response, NextFunction } from "express";
import pinoHttp from "pino-http";
import { logger } from "../utils/logger";
import type { AuthRequest } from "./auth";

// Pino HTTP middleware
export const httpLogger = pinoHttp({
  logger,
  
  // Custom log level based on status code
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 400) return "warn";
    if (res.statusCode >= 300) return "info";
    return "info";
  },

  // Custom success message
  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} ${res.statusCode}`;
  },

  // Custom error message
  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} ${res.statusCode} - ${err.message}`;
  },

  // Custom attribute keys
  customAttributeKeys: {
    req: "request",
    res: "response",
    err: "error",
    responseTime: "responseTime",
  },

  // Serialize request
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params,
      // Don't log sensitive headers
      headers: {
        host: req.headers.host,
        "user-agent": req.headers["user-agent"],
        "content-type": req.headers["content-type"],
      },
      remoteAddress: req.socket?.remoteAddress,
      remotePort: req.socket?.remotePort,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});

// Enhanced logging middleware that adds user context
export const enhancedLogger = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();

  // Add user ID to logger context if available
  if (req.user) {
    req.log = req.log.child({ userId: req.user.id });
  }

  // Log response
  res.on("finish", () => {
    const responseTime = Date.now() - startTime;
    
    req.log.info({
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime,
      userId: req.user?.id,
      userAgent: req.headers["user-agent"],
    });
  });

  next();
};

// Request ID middleware (adds unique ID to each request)
export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = req.headers["x-request-id"] || generateRequestId();
  req.id = requestId as string;
  res.setHeader("X-Request-ID", requestId);
  next();
};

function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
