import { Router } from "express";
import { createSubscriberClient } from "../lib/redis";

const router = Router();

// GET /feed/live
// Server-Sent Events stream. Each new article published by the ingestion worker
// is forwarded to all connected clients as a "new-article" event.
router.get("/", (req: any, res: any) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // disable nginx buffering if applicable
  res.flushHeaders();

  // Each SSE connection gets its own subscriber so messages are not shared
  // across connections incorrectly.
  const sub = createSubscriberClient();
  sub.subscribe("feed:new-article", (err) => {
    if (err) {
      res.end();
      return;
    }
  });

  sub.on("message", (_channel: string, message: string) => {
    res.write(`event: new-article\ndata: ${message}\n\n`);
  });

  // Heartbeat every 30s to prevent proxy/load-balancer timeouts
  const heartbeat = setInterval(() => {
    res.write(": heartbeat\n\n");
  }, 30_000);

  req.on("close", () => {
    clearInterval(heartbeat);
    sub.unsubscribe("feed:new-article");
    sub.quit();
  });
});

export default router;
