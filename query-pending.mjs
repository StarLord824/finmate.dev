import pkg from './packages/db/node_modules/@prisma/client/index.js';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  datasources: { db: { url: 'postgresql://postgres:password@localhost:5432/finmate' } }
});

const rows = await prisma.article.findMany({
  where: { enrichStatus: 'pending' },
  orderBy: { createdAt: 'desc' },
  take: 12,
  select: { id: true, title: true, source: true, enrichStatus: true, createdAt: true }
});

console.log(JSON.stringify(rows, null, 2));
await prisma.$disconnect();
