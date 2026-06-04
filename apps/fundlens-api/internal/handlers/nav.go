package handlers

import (
	"errors"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"

	"github.com/finmate-dev/fundlens-api/internal/cache"
	"github.com/finmate-dev/fundlens-api/internal/db"
	"github.com/finmate-dev/fundlens-api/internal/dto"
)

func ListNav(pool *pgxpool.Pool, rdb *redis.Client) fiber.Handler {
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

		// Default: last 90 days
		toTime := time.Now()
		fromTime := toTime.AddDate(0, -3, 0)

		fromDate := pgtype.Date{Time: fromTime, Valid: true}
		toDate := pgtype.Date{Time: toTime, Valid: true}

		key := "fundlens:scheme:" + slug + ":nav:90d:v1"
		navPoints, cached, err := cache.GetOrSet(c.Context(), rdb, key, 300*time.Second, func() ([]dto.NavPoint, error) {
			rows, err := q.ListNavByScheme(c.Context(), db.ListNavBySchemeParams{
				SchemeID: scheme.ID,
				Date:     fromDate,
				Date_2:   toDate,
			})
			if err != nil {
				return nil, err
			}
			result := make([]dto.NavPoint, len(rows))
			for i, row := range rows {
				result[i] = dto.FromListNavBySchemeRow(row)
			}
			return result, nil
		})
		if err != nil {
			return Err(c, fiber.StatusInternalServerError, "db_error", err.Error())
		}
		return OK(c, navPoints, cached, 300)
	}
}
