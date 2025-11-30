import "dotenv/config";
import { logger } from "./utils/logger";
import { startScheduler } from "./scheduler";
import prisma from "@repo/db/prismaClient";

// async function runOnceForTesting() {
//   logger.info("Starting single-run ingestion (test)");
//   // read config and trigger each source once (reuse scheduler's logic is possible; simpler: start scheduler which runs immediately by cron job start)
//   // But for deterministic single-run, you could import config and call fetch/upsert directly
// }

async function main() {
  try {
    logger.info("Ingestion worker booting");
    await prisma.$connect();
    await startScheduler();
    // Optionally: perform an initial one-off fetch for every source rather than wait for cron schedule:
    // (you can implement a small bootstrap run here if desired)
  } catch (err) {
    logger.error({ err }, "Failed to start ingestion worker");
    process.exit(1);
  }
}

main();

// handle graceful shutdown
process.on("SIGINT", async () => {
  logger.info("SIGINT received - closing prisma");
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM received - closing prisma");
  await prisma.$disconnect();
  process.exit(0);
});
