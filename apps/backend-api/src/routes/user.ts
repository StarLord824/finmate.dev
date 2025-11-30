// src/routes/user.ts
import express from "express";
import { upsertUserPreferences, addBookmark, removeBookmark, getBookmarks } from "../services/user.service";

const router: express.Router = express.Router();

/**
 * POST /user/preferences
 * body: { userId: string, categories?: string[], sources?: string[] }
 */
router.post("/preferences", async (req, res, next) => {
  try {
    const { userId, categories, sources } = req.body;
    if (!userId) return res.status(400).json({ error: "userId_required" });
    const user = await upsertUserPreferences(userId, { categories, sources });
    res.json({ data: user });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /user/bookmark
 * body: { userId, articleId, action: "add"|"remove" }
 */
router.post("/bookmark", async (req, res, next) => {
  try {
    const { userId, articleId, action } = req.body;
    if (!userId || !articleId || !action) return res.status(400).json({ error: "missing_params" });
    if (action === "add") {
      const user = await addBookmark(userId, articleId);
      return res.json({ data: user });
    } else {
      await removeBookmark(userId, articleId);
      return res.json({ success: true });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * GET /user/bookmarks?userId=...
 */
router.get("/bookmarks", async (req, res, next) => {
  try {
    const userId = String(req.query.userId || "");
    if (!userId) return res.status(400).json({ error: "userId_required" });
    const articles = await getBookmarks(userId);
    res.json({ data: articles });
  } catch (err) {
    next(err);
  }
});

export default router;
