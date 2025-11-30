import { Router } from "express";

const router: Router = Router();

router.get("/feed", (_req, res) => {
  res.json({ message: "Feed" });
});

router.get("/article/:id", (_req, res) => {
  res.json({ message: "Article details" });
});

router.post("/user/preferences", (_req, res) => {
  res.json({ message: "Preferences saved" });
});

router.post("/user/bookmark", (_req, res) => {
  res.json({ message: "Bookmark updated" });
});

export default router;
