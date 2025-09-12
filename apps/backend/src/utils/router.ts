import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("This is the backend of Finmate.dev");
});

ro

export default router;