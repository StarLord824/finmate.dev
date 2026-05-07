import "dotenv/config";
import Redis from "ioredis";
import prisma from "@repo/db/prismaClient";

async function backfill() {
  const redis = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379");
  await prisma.$connect();

  const articles = await prisma.article.findMany({
    where: { enrichStatus: "pending" },
    select: { id: true },
  });

  console.log(`Queueing ${articles.length} pending articles...`);

  if (articles.length > 0) {
    await redis.rpush("enrichment:queue", ...articles.map((a) => a.id));
  }

  console.log("Done.");
  await prisma.$disconnect();
  await redis.quit();
}

backfill().catch((err) => {
  console.error(err);
  process.exit(1);
});
