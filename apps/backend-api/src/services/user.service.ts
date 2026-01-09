// src/services/user.service.ts
import prisma from "@repo/db/prismaClient";

export async function upsertUserPreferences(userId: string, prefs: Record<string, any>) {
  // 1. Get existing user to merge preferences
  const existingUser = await prisma.user.findUnique({ where: { id: userId } });
  
  const currentPrefs = (existingUser?.preferences as Record<string, any>) || {};
  
  // 2. Merge new prefs into existing
  const updatedPrefs = {
    ...currentPrefs,
    ...prefs,
  };

  const user = await prisma.user.upsert({
    where: { id: userId },
    update: {
      preferences: updatedPrefs
    },
    create: {
      id: userId,
      email: "", 
      preferences: updatedPrefs
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
