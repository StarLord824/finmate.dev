import prisma from "@repo/db/prismaClient";

export async function recordRead(
  userId: string,
  articleId: string,
  readTime?: number
) {
  // upsert: if user re-reads, update readAt and readTime
  return prisma.readHistory.upsert({
    where: { userId_articleId: { userId, articleId } },
    create: { userId, articleId, readTime: readTime ?? null },
    update: { readAt: new Date(), readTime: readTime ?? null },
  });
}

export async function getReadHistory(
  userId: string,
  cursor?: string,
  limit = 20
) {
  const take = Math.min(Math.max(1, limit), 50);

  const items = await prisma.readHistory.findMany({
    where: { userId },
    orderBy: { readAt: "desc" },
    take: take + 1,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    include: {
      article: {
        select: {
          id: true,
          title: true,
          link: true,
          source: true,
          publishedAt: true,
          summary: true,
          imageUrl: true,
          tags: true,
        },
      },
    },
  });

  const hasMore = items.length > take;
  const data = hasMore ? items.slice(0, take) : items;

  return {
    items: data,
    nextCursor: hasMore ? data[data.length - 1].id : null,
  };
}

export async function getReadArticleIds(userId: string): Promise<string[]> {
  const rows = await prisma.readHistory.findMany({
    where: { userId },
    select: { articleId: true },
  });
  return rows.map((r) => r.articleId);
}
