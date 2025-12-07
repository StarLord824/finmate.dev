// src/routes/meta.ts
import express from "express";
import { getCategories, getSources } from "../services/meta.service";

const router: express.Router = express.Router();

/**
 * GET /meta/categories
 * Returns list of available categories
 */
router.get("/categories", async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.json({ data: categories });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /meta/sources
 * Returns list of news sources
 */
router.get("/sources", async (req, res, next) => {
  try {
    const sources = await getSources();
    res.json({ data: sources });
  } catch (err) {
    next(err);
  }
});

export default router;
