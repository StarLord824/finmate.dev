import prisma from "@repo/db/prismaClient";
import { Article } from "../types";
import { logger } from "../utils/logger";


export async function upsertArticle(a: Article) {
  try {
    // Upsert logic: avoid inserting duplicates by fingerprint or link
    const existing = await prisma.article.findUnique({ where: { fingerprint: a.fingerprint } }).catch(() => null);
    if (existing) {
      logger.info({ fingerprint: a.fingerprint, link: a.link }, "article already exists");
      return { inserted: false, id: existing.id };
    }

    const inserted = await prisma.article.create({
      data: {
        title: a.title || "",
        link: a.link || "",
        source: a.source,
        author: a.author,
        publishedAt: new Date(a.publishedAt),
        summary: a.summary || "",
        content: a.content,
        imageUrl: a.imageUrl,
        fingerprint: a.fingerprint || "",
        tags: a.tags ?? [],
      },
    });

    logger.info({ id: inserted.id, title: a.title }, "inserted article");
    return { inserted: true, id: inserted.id };
  } catch (err: any) {
    // handle unique constraint on link or fingerprint
    logger.error({ err, fingerprint: a.fingerprint, link: a.link }, "upsertArticle error");
    return { inserted: false };
  } finally {
    // do not disconnect Prisma here; global Prisma instance should be reused
  }
}
