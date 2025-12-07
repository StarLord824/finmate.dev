// src/server.ts
import "dotenv/config";
import app from "./app";
import prisma from "@repo/db/prismaClient";
import { logger } from "./utils/logger";

const port = Number(process.env.PORT || 4000);

async function start() {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info({ database: "connected" }, "Database connection established");

    // Start server
    const server = app.listen(port, () => {
      logger.info({
        port,
        env: process.env.NODE_ENV || "development",
        service: "backend-api",
      }, `Server started successfully`);
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      logger.info({ signal }, "Shutdown signal received");
      
      server.close(async () => {
        logger.info("HTTP server closed");
        
        try {
          await prisma.$disconnect();
          logger.info("Database disconnected");
          process.exit(0);
        } catch (err) {
          logger.error({ err }, "Error during shutdown");
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

  } catch (err) {
    logger.error({ err }, "Failed to start server");
    process.exit(1);
  }
}

// Handle uncaught errors
process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "Uncaught exception");
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error({ reason, promise }, "Unhandled promise rejection");
});

start();
