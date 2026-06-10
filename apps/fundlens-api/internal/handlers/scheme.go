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

func GetScheme(pool *pgxpool.Pool, rdb *redis.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		slug := c.Params("slug")
		q := db.New(pool)
		key := "fundlens:scheme:" + slug + ":v1"
		scheme, cached, err := cache.GetOrSet(c.Context(), rdb, key, 60*time.Second, func() (dto.SchemeSummary, error) {
			row, err := q.GetSchemeBySlug(c.Context(), slug)
			if err != nil {
				return dto.SchemeSummary{}, err
			}
			return dto.FromGetSchemeBySlugRow(row), nil
		})
		if err != nil {
			if errors.Is(err, pgx.ErrNoRows) {
				return Err(c, fiber.StatusNotFound, "scheme_not_found", "unknown scheme: "+slug)
			}
			return Err(c, fiber.StatusInternalServerError, "db_error", err.Error())
		}
		return OK(c, scheme, cached, 60)
	}
}
