import prisma from "@repo/db/prismaClient";

export interface EnrichmentResult {
  sentiment: string | null;
  sentimentScore: number | null;
  aiSummary: string | null;
  aiTags: string[];
  embedding: number[] | null;
}

export async function markProcessing(id: string): Promise<void> {
  await prisma.article.update({
    where: { id },
    data: { enrichStatus: "processing" },
  });
}

export async function saveEnrichment(
  id: string,
  result: EnrichmentResult
): Promise<void> {
  if (result.embedding && result.embedding.length === 384) {
    // vector column requires raw SQL — Prisma doesn't support vector operators
    const vectorLiteral = `[${result.embedding.join(",")}]`;
    await prisma.$executeRawUnsafe(
      `UPDATE "Article" SET "sentiment"=$1,"sentimentScore"=$2,"aiSummary"=$3,"aiTags"=$4,"embedding"=$5::vector,"enrichStatus"='done',"enrichedAt"=NOW() WHERE id=$6`,
      result.sentiment,
      result.sentimentScore,
      result.aiSummary,
      result.aiTags,
      vectorLiteral,
      id
    );
  } else {
    // no embedding — use Prisma ORM (won't touch vector column)
    await prisma.article.update({
      where: { id },
      data: {
        sentiment: result.sentiment,
        sentimentScore: result.sentimentScore,
        aiSummary: result.aiSummary,
        aiTags: result.aiTags,
        enrichStatus: "done",
        enrichedAt: new Date(),
      },
    });
  }
}

export async function markFailed(id: string): Promise<void> {
  await prisma.article.update({
    where: { id },
    data: { enrichStatus: "failed" },
  });
}
