const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.article.findMany({
  where: { enrichStatus: 'pending' },
  orderBy: { createdAt: 'desc' },
  take: 12,
  select: { id: true, title: true, source: true, enrichStatus: true, createdAt: true }
}).then(rows => {
  console.log(JSON.stringify(rows, null, 2));
  return p.$disconnect();
});
