import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { recordRead, getReadHistory } from "../services/history.service";

const router = Router();

// POST /user/history  { articleId, readTime? }
router.post("/", authMiddleware, async (req: any, res: any, next: any) => {
  try {
    const { articleId, readTime } = req.body as {
      articleId: string;
      readTime?: number;
    };

    if (!articleId || typeof articleId !== "string") {
      return res.status(400).json({ error: "articleId is required" });
    }

    const entry = await recordRead(
      req.user!.id,
      articleId,
      typeof readTime === "number" ? Math.round(readTime) : undefined
    );

    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

// GET /user/history?cursor=&limit=
router.get("/", authMiddleware, async (req: any, res: any, next: any) => {
  try {
    const cursor = typeof req.query.cursor === "string" ? req.query.cursor : undefined;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await getReadHistory(req.user!.id, cursor, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
