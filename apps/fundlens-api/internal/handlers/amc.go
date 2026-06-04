package handlers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"

	"github.com/finmate-dev/fundlens-api/internal/cache"
	"github.com/finmate-dev/fundlens-api/internal/db"
)

func ListAmcs(pool *pgxpool.Pool, rdb *redis.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		q := db.New(pool)
		key := "fundlens:amcs:v1"
		amcs, cached, err := cache.GetOrSet(c.Context(), rdb, key, 60*time.Second, func() ([]db.ListAmcsRow, error) {
			return q.ListAmcs(c.Context())
		})
		if err != nil {
			return Err(c, fiber.StatusInternalServerError, "db_error", err.Error())
		}
		return OK(c, amcs, cached, 60)
	}
}

func GetAmc(pool *pgxpool.Pool, rdb *redis.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		slug := c.Params("slug")
		q := db.New(pool)
		key := "fundlens:amc:" + slug + ":v1"
		amc, cached, err := cache.GetOrSet(c.Context(), rdb, key, 60*time.Second, func() (db.FundlensAmc, error) {
			return q.GetAmcBySlug(c.Context(), slug)
		})
		if err != nil {
			return Err(c, fiber.StatusNotFound, "amc_not_found", "unknown AMC: "+slug)
		}
		return OK(c, amc, cached, 60)
	}
}
