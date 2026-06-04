package handlers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"

	"github.com/finmate-dev/fundlens-api/internal/cache"
	"github.com/finmate-dev/fundlens-api/internal/db"
)

func ListStockHolders(pool *pgxpool.Pool, rdb *redis.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		isin := c.Params("isin")
		q := db.New(pool)
		key := "fundlens:stock:" + isin + ":holders:v1"
		holders, cached, err := cache.GetOrSet(c.Context(), rdb, key, 300*time.Second, func() ([]db.ListHoldersOfIsinRow, error) {
			return q.ListHoldersOfIsin(c.Context(), db.ListHoldersOfIsinParams{
				Isin:   &isin,
				Limit:  50,
				Offset: 0,
			})
		})
		if err != nil {
			return Err(c, fiber.StatusInternalServerError, "db_error", err.Error())
		}
		return OK(c, holders, cached, 300)
	}
}
