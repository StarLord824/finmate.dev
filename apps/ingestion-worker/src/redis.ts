import Redis from "ioredis";

let client: Redis | null = null;

export function getRedis(): Redis {
  if (!client) {
    const url = process.env.REDIS_URL;
    if (!url) {
      // If Redis isn't configured, publish is a no-op — ingestion still works
      return { publish: async () => {} } as unknown as Redis;
    }
    client = new Redis(url);
    client.on("error", (err: Error) => {
      console.error("[redis] ingestion-worker redis error:", err.message);
    });
  }
  return client;
}
