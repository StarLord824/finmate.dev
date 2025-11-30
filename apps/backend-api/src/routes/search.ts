// src/routes/search.ts
import express from "express";
import { searchArticles } from "../services/article.service";

const router: express.Router = express.Router();

/**
 * GET /search?q=term&limit=20
 */
router.get("/", async (req, res, next) => {
  try {
    const q = String(req.query.q || "").trim();
    if (!q) return res.status(400).json({ error: "query_required" });
    const limit = Math.min(parseInt(String(req.query.limit || "20")), 100);
    const items = await searchArticles(q, limit);
    res.json({ data: items });
  } catch (err) {
    next(err);
  }
});

export default router;
