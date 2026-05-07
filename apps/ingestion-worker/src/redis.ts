import Redis from "ioredis";

let client: Redis | null = null;

const noopStub = { publish: async () => {}, rpush: async () => {} } as unknown as Redis;

export function getRedis(): Redis {
  if (!client) {
    const url = process.env.REDIS_URL;
    if (!url) {
      return noopStub;
    }
    client = new Redis(url);
    client.on("error", (err: Error) => {
      console.error("[redis] ingestion-worker redis error:", err.message);
    });
  }
  return client;
}
