// src/services/user.service.ts
import prisma from "@repo/db/prismaClient";

export async function upsertUserPreferences(userId: string, prefs: { categories?: string[]; sources?: string[] }) {
  const user = await prisma.user.upsert({
    where: { id: userId },
    update: {
      preferences: {
        set: {
          categories: prefs.categories ?? [],
          sources: prefs.sources ?? []
        } as any
      }
    },
    create: {
      id: userId,
      email: "", // can be updated later
      preferences: {
        set: {
          categories: prefs.categories ?? [],
          sources: prefs.sources ?? []
        } as any
      }
    }
  });
  return user;
}

export async function addBookmark(userId: string, articleId: string) {
  // We store bookmarks as relation in user => for simplicity we assume `bookmarks` is string[] field
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      bookmarks: { push: articleId }
    }
  });
  return user;
}

export async function removeBookmark(userId: string, articleId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return null;
  const newBookmarks = (user.bookmarks || []).filter((b: string) => b !== articleId);
  await prisma.user.update({ where: { id: userId }, data: { bookmarks: newBookmarks } });
  return { success: true };
}

export async function getBookmarks(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return [];
  const ids = user.bookmarks || [];
  const articles = await prisma.article.findMany({ where: { id: { in: ids } } });
  return articles;
}
