// src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import feedRouter from "./routes/feed";
import articleRouter from "./routes/article";
import searchRouter from "./routes/search";
import userRouter from "./routes/user";
import metaRouter from "./routes/meta";
import { logger } from "./utils/logger";

const app: express.Application = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true, // Allow cookies
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser()); // Parse cookies
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/feed", feedRouter);
app.use("/article", articleRouter);
app.use("/search", searchRouter);
app.use("/user", userRouter);
app.use("/meta", metaRouter);

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  logger.error(err);
  const status = err?.status || 500;
  res.status(status).json({ error: err?.message || "internal_error" });
});

export default app;
