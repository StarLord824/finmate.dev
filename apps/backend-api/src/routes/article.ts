// src/routes/article.ts
import express from "express";
import { getArticleById } from "../services/article.service";
import { getRelatedArticles } from "../services/feed.service";

const router: express.Router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const article = await getArticleById(id);
    if (!article) return res.status(404).json({ error: "not_found" });
    res.json({ data: article });
  } catch (err) {
    next(err);
  }
});

// GET /article/:id/related — scored by tag overlap + recency, source-diverse
router.get("/:id/related", async (req, res, next) => {
  try {
    const id = req.params.id;
    const limit = Math.min(parseInt(req.query.limit as string) || 5, 10);

    // Need the article's tags to find related content
    const article = await getArticleById(id);
    if (!article) return res.status(404).json({ error: "not_found" });

    const related = await getRelatedArticles(id, article.tags ?? [], limit);
    res.json({ data: related });
  } catch (err) {
    next(err);
  }
});

export default router;
