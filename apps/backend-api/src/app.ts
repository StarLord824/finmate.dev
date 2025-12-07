// src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import feedRouter from "./routes/feed";
import articleRouter from "./routes/article";
import searchRouter from "./routes/search";
import userRouter from "./routes/user";
import metaRouter from "./routes/meta";
import { logger } from "./utils/logger";
import { httpLogger, requestIdMiddleware } from "./middleware/logging";

const app: express.Application = express();

// Request ID middleware (must be first)
app.use(requestIdMiddleware);

// HTTP logging middleware
app.use(httpLogger);

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true, // Allow cookies
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser()); // Parse cookies

// Health check (no logging needed)
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Routes
app.use("/feed", feedRouter);
app.use("/article", articleRouter);
app.use("/search", searchRouter);
app.use("/user", userRouter);
app.use("/meta", metaRouter);

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  // Log error with context
  logger.error({
    err,
    method: req.method,
    url: req.url,
    userId: req.user?.id,
    requestId: req.id,
  }, "Request error");

  const status = err?.status || 500;
  res.status(status).json({ 
    error: err?.message || "internal_error",
    requestId: req.id,
  });
});

export default app;
