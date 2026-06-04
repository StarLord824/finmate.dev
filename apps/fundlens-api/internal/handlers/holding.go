package handlers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"

	"github.com/finmate-dev/fundlens-api/internal/cache"
	"github.com/finmate-dev/fundlens-api/internal/db"
)

func ListHoldings(pool *pgxpool.Pool, rdb *redis.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		slug := c.Params("slug")
		q := db.New(pool)

		// Resolve scheme
		scheme, err := q.GetSchemeBySlug(c.Context(), slug)
		if err != nil {
			return Err(c, fiber.StatusNotFound, "scheme_not_found", "unknown scheme: "+slug)
		}

		// Resolve latest snapshot
		snap, err := q.GetLatestSnapshotForScheme(c.Context(), scheme.ID)
		if err != nil {
			return Err(c, fiber.StatusNotFound, "no_snapshot", "no holdings found for scheme: "+slug)
		}

		key := "fundlens:scheme:" + slug + ":holdings:latest:v1"
		holdings, cached, err := cache.GetOrSet(c.Context(), rdb, key, 300*time.Second, func() ([]db.ListHoldingsBySnapshotRow, error) {
			return q.ListHoldingsBySnapshot(c.Context(), snap.ID)
		})
		if err != nil {
			return Err(c, fiber.StatusInternalServerError, "db_error", err.Error())
		}
		return OK(c, holdings, cached, 300)
	}
}
