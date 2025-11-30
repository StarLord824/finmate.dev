// src/routes/article.ts
import express from "express";
import { getArticleById } from "../services/article.service";

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

export default router;
