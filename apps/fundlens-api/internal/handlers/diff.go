package handlers

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"

	"github.com/finmate-dev/fundlens-api/internal/cache"
	"github.com/finmate-dev/fundlens-api/internal/db"
)

func ListDiffs(pool *pgxpool.Pool, rdb *redis.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		slug := c.Params("slug")
		q := db.New(pool)

		scheme, err := q.GetSchemeBySlug(c.Context(), slug)
		if err != nil {
			return Err(c, fiber.StatusNotFound, "scheme_not_found", "unknown scheme: "+slug)
		}

		snap, err := q.GetLatestSnapshotForScheme(c.Context(), scheme.ID)
		if err != nil {
			return Err(c, fiber.StatusNotFound, "no_snapshot", "no snapshot for scheme: "+slug)
		}

		key := "fundlens:scheme:" + slug + ":diffs:latest:v1"
		snapID := snap.ID
		diffs, cached, err := cache.GetOrSet(c.Context(), rdb, key, 300*time.Second, func() ([]db.ListDiffsBySchemeRow, error) {
			return q.ListDiffsByScheme(c.Context(), db.ListDiffsBySchemeParams{
				SchemeID:       scheme.ID,
				CurrSnapshotID: &snapID,
			})
		})
		if err != nil {
			return Err(c, fiber.StatusInternalServerError, "db_error", err.Error())
		}
		return OK(c, diffs, cached, 300)
	}
}
