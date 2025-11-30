// src/routes/feed.ts
import express from "express";
import { getFeed } from "../services/feed.service";

const router: express.Router = express.Router();

/**
 * GET /feed
 * query params:
 *  - limit (default 20)
 *  - after (ISO timestamp) => we treat as cursor: return items older than 'after'
 *  - tags (comma separated)
 *  - sources (comma separated)
 *  - preferredTags (comma separated) - optional user preferences quick override
 */
router.get("/", async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(String(req.query.limit || "20")), 100);
    const before = req.query.after ? String(req.query.after) : undefined;
    const tags = req.query.tags ? String(req.query.tags).split(",").map(s => s.trim()).filter(Boolean) : undefined;
    const sources = req.query.sources ? String(req.query.sources).split(",").map(s => s.trim()).filter(Boolean) : undefined;
    const preferredTags = req.query.preferredTags ? String(req.query.preferredTags).split(",").map(s => s.trim().toLowerCase()).filter(Boolean) : undefined;

    const items = await getFeed({ limit, before, tags: tags ?? null, sources: sources ?? null, preferredTags: preferredTags ?? null });
    res.json({ data: items });
  } catch (err) {
    next(err);
  }
});

export default router;
