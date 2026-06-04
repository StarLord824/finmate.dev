package handlers

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"

	"github.com/finmate-dev/fundlens-api/internal/cache"
	"github.com/finmate-dev/fundlens-api/internal/db"
	"github.com/finmate-dev/fundlens-api/internal/dto"
)

func ListDiffs(pool *pgxpool.Pool, rdb *redis.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		slug := c.Params("slug")
		q := db.New(pool)

		scheme, err := q.GetSchemeBySlug(c.Context(), slug)
		if err != nil {
			if errors.Is(err, pgx.ErrNoRows) {
				return Err(c, fiber.StatusNotFound, "scheme_not_found", "unknown scheme: "+slug)
			}
			return Err(c, fiber.StatusInternalServerError, "db_error", err.Error())
		}

		snap, err := q.GetLatestSnapshotForScheme(c.Context(), scheme.ID)
		if err != nil {
			if errors.Is(err, pgx.ErrNoRows) {
				return Err(c, fiber.StatusNotFound, "no_snapshot", "no snapshot for scheme: "+slug)
			}
			return Err(c, fiber.StatusInternalServerError, "db_error", err.Error())
		}

		key := "fundlens:scheme:" + slug + ":diffs:latest:v1"
		snapID := snap.ID
		diffs, cached, err := cache.GetOrSet(c.Context(), rdb, key, 300*time.Second, func() ([]dto.HoldingDiff, error) {
			rows, err := q.ListDiffsByScheme(c.Context(), db.ListDiffsBySchemeParams{
				SchemeID:       scheme.ID,
				CurrSnapshotID: &snapID,
			})
			if err != nil {
				return nil, err
			}
			result := make([]dto.HoldingDiff, len(rows))
			for i, row := range rows {
				result[i] = dto.FromListDiffsBySchemeRow(row)
			}
			return result, nil
		})
		if err != nil {
			return Err(c, fiber.StatusInternalServerError, "db_error", err.Error())
		}
		return OK(c, diffs, cached, 300)
	}
}
