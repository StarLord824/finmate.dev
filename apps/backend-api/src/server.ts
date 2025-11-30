// src/server.ts
import "dotenv/config";
import app from "./app";
import prisma from "@repo/db/prismaClient";
import { logger } from "./utils/logger";

const port = Number(process.env.PORT || 4000);

async function start() {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      logger.info(`backend-api listening on http://localhost:${port}`);
    });
  } catch (err) {
    logger.error("failed to start", err);
    process.exit(1);
  }
}

start();

process.on("SIGINT", async () => {
  logger.info("SIGINT received - disconnecting prisma");
  await prisma.$disconnect();
  process.exit(0);
});
