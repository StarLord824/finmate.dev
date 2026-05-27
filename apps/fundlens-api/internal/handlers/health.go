package handlers

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
)

// Health probes Postgres and Redis. Returns 200 always — degraded components
// surface in the body so orchestrators can choose how strict to be.
func Health(pool *pgxpool.Pool, rdb *redis.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		ctx, cancel := context.WithTimeout(c.Context(), 2*time.Second)
		defer cancel()

		dbOK := true
		if err := pool.Ping(ctx); err != nil {
			dbOK = false
		}

		redisOK := true
		if err := rdb.Ping(ctx).Err(); err != nil {
			redisOK = false
		}

		status := "ok"
		if !dbOK || !redisOK {
			status = "degraded"
		}

		return c.JSON(fiber.Map{
			"service": "fundlens-api",
			"status":  status,
			"db":      okStr(dbOK),
			"redis":   okStr(redisOK),
		})
	}
}

func okStr(ok bool) string {
	if ok {
		return "ok"
	}
	return "unreachable"
}
