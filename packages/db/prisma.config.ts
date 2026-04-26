import path from "node:path";
import type { PrismaConfig } from "prisma";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// DATABASE_URL      — pooled connection (Supabase port 6543, Transaction mode)
//                     used by PrismaClient at runtime for all queries
// DIRECT_URL        — direct connection (Supabase port 5432)
//                     used by `prisma migrate` which needs DDL support

export default {
  earlyAccess: true,
  schema: path.join(__dirname, "prisma/schema.prisma"),
  migrate: {
    async adapter(env: Record<string, string | undefined>) {
      const connectionString = env.DIRECT_URL ?? env.DATABASE_URL;
      if (!connectionString) {
        throw new Error("DIRECT_URL or DATABASE_URL must be set");
      }
      const pool = new Pool({ connectionString });
      return new PrismaPg(pool);
    },
  },
} satisfies PrismaConfig;
