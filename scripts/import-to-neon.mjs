// One-shot script: reads the pg_dump SQL file and inserts data into Neon
// Run: node scripts/import-to-neon.mjs

import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const { Client } = pg;

const NEON_URL =
  "postgresql://neondb_owner:npg_3CZixfyvcW8d@ep-crimson-boat-aop2wbt1.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

const DUMP_FILE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "finmate_data.sql"
);

const BATCH_SIZE = 20;

function parseNull(val) {
  return val === "\\N" ? null : val;
}

function parsePgArray(val) {
  if (!val || val === "\\N" || val === "{}") return [];
  // strip outer braces, split on comma respecting quoted strings
  const inner = val.slice(1, -1);
  if (!inner) return [];
  const items = [];
  let current = "";
  let inQuote = false;
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (ch === '"' && !inQuote) { inQuote = true; continue; }
    if (ch === '"' && inQuote) { inQuote = false; continue; }
    if (ch === "," && !inQuote) { items.push(current); current = ""; continue; }
    current += ch;
  }
  if (current) items.push(current);
  return items;
}

// Parse a tab-delimited COPY row into an array of raw string values
function parseCopyRow(line) {
  const fields = [];
  let current = "";
  let i = 0;
  while (i < line.length) {
    if (line[i] === "\t") {
      fields.push(current);
      current = "";
      i++;
    } else if (line[i] === "\\") {
      // handle escape sequences
      i++;
      if (line[i] === "N" && (line[i + 1] === "\t" || i + 1 === line.length)) {
        fields.push(current);
        current = "";
        i++;
      } else {
        current += line[i];
        i++;
      }
    } else {
      current += line[i];
      i++;
    }
  }
  fields.push(current);
  return fields;
}

function extractCopyBlocks(sql) {
  const blocks = {};
  const lines = sql.split("\n");
  let inCopy = false;
  let tableName = null;
  let columns = null;
  let rows = [];

  for (const line of lines) {
    if (!inCopy) {
      const match = line.match(/^COPY public\."(\w+)" \(([^)]+)\) FROM stdin;/);
      if (match) {
        tableName = match[1];
        columns = match[2].split(", ").map((c) => c.replace(/"/g, ""));
        rows = [];
        inCopy = true;
      }
    } else {
      if (line === "\\.") {
        blocks[tableName] = { columns, rows };
        inCopy = false;
        tableName = null;
        columns = null;
        rows = [];
      } else if (line.trim()) {
        rows.push(parseCopyRow(line));
      }
    }
  }
  return blocks;
}

async function insertBatch(client, table, columns, rows) {
  if (rows.length === 0) return;
  const placeholders = rows.map(
    (_, ri) =>
      `(${columns.map((_, ci) => `$${ri * columns.length + ci + 1}`).join(", ")})`
  );
  const values = rows.flat();
  const sql = `INSERT INTO public."${table}" (${columns
    .map((c) => `"${c}"`)
    .join(", ")}) VALUES ${placeholders.join(", ")} ON CONFLICT DO NOTHING`;
  await client.query(sql, values);
}

async function main() {
  console.log("Reading dump file...");
  const sql = fs.readFileSync(DUMP_FILE, "utf8");

  console.log("Parsing COPY blocks...");
  const blocks = extractCopyBlocks(sql);

  for (const [table, { columns, rows }] of Object.entries(blocks)) {
    console.log(`  Found table "${table}": ${rows.length} rows, ${columns.length} columns`);
  }

  console.log("\nConnecting to Neon...");
  const client = new Client({ connectionString: NEON_URL });
  await client.connect();
  console.log("Connected.\n");

  try {
    // Insert Source first (Article has no FK to Source, but good practice)
    for (const [table, { columns, rows }] of Object.entries(blocks)) {
      console.log(`Importing "${table}" (${rows.length} rows)...`);

      // Convert raw string fields to proper JS types
      const processedRows = rows.map((rawFields) => {
        return rawFields.map((val, i) => {
          const col = columns[i];
          const raw = parseNull(val);
          if (raw === null) return null;

          // Array columns
          if (col === "tags" || col === "aiTags") return parsePgArray(raw);

          // Numeric
          if (col === "sentimentScore") return parseFloat(raw);

          // Vector (embedding) — skip, insert as null
          if (col === "embedding") return null;

          return raw;
        });
      });

      let inserted = 0;
      for (let i = 0; i < processedRows.length; i += BATCH_SIZE) {
        const batch = processedRows.slice(i, i + BATCH_SIZE);
        await insertBatch(client, table, columns, batch);
        inserted += batch.length;
        process.stdout.write(`\r  ${inserted}/${processedRows.length} rows`);
      }
      console.log(`\n  Done: "${table}"\n`);
    }
  } finally {
    await client.end();
  }

  console.log("Import complete.");
}

main().catch((err) => {
  console.error("Import failed:", err.message);
  process.exit(1);
});
