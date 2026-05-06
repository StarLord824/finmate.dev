import "dotenv/config";
import Redis from "ioredis";
import prisma from "@repo/db/prismaClient";
import { startConsumer } from "./queue-consumer";
import { logger } from "./lib/logger";

async function main() {
  logger.info("Enrichment worker booting");

  const redisUrl = process.env.REDIS_URL ?? "redis://localhost:6379";
  const redis = new Redis(redisUrl);

  redis.on("error", (err) => logger.error({ err }, "Redis error"));

  await prisma.$connect();
  logger.info("DB connected — starting queue consumer");

  await startConsumer(redis);
}

main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});

process.on("SIGINT", async () => {
  logger.info("SIGINT — shutting down");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM — shutting down");
  await prisma.$disconnect();
  process.exit(0);
});
