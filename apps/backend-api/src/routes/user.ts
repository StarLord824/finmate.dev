// src/routes/user.ts
import express from "express";
import { upsertUserPreferences, addBookmark, removeBookmark, getBookmarks } from "../services/user.service";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router: express.Router = express.Router();

/**
 * GET /user/me
 * Get current user info
 */
router.get("/me", authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    res.json({ data: req.user });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /user/preferences
 * body: { categories?: string[], sources?: string[] }
 * Requires authentication
 */
router.post("/preferences", authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { categories, sources } = req.body;
    const userId = req.user!.id;
    const user = await upsertUserPreferences(userId, { categories, sources });
    res.json({ data: user });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /user/bookmark
 * body: { articleId, isBookmarked: boolean }
 * Requires authentication
 */
router.post("/bookmark", authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { articleId, isBookmarked } = req.body;
    const userId = req.user!.id;
    
    if (!articleId || typeof isBookmarked !== "boolean") {
      return res.status(400).json({ error: "missing_params" });
    }

    if (isBookmarked) {
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
 * GET /user/bookmarks
 * Get user's bookmarked articles
 * Requires authentication
 */
router.get("/bookmarks", authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.user!.id;
    const articles = await getBookmarks(userId);
    res.json({ data: articles });
  } catch (err) {
    next(err);
  }
});

export default router;
