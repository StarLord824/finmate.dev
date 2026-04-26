import Redis from "ioredis";

let _client: Redis | null = null;

/**
 * Returns the singleton Redis client for the backend.
 * Uses REDIS_URL env var, falls back to localhost:6379.
 */
export function getRedis(): Redis {
  if (!_client) {
    const url = process.env.REDIS_URL || "redis://localhost:6379";
    _client = new Redis(url);
    _client.on("error", (err: Error) => {
      console.error("[redis] backend redis error:", err.message);
    });
  }
  return _client;
}

/**
 * Creates a NEW Redis connection (required for subscriber connections —
 * a subscriber cannot be reused for pub/command operations).
 */
export function createSubscriberClient(): Redis {
  const url = process.env.REDIS_URL || "redis://localhost:6379";
  return new Redis(url);
}
