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

func ListAmcs(pool *pgxpool.Pool, rdb *redis.Client) fiber.Handler {
	return func(c *fiber.Ctx) error {
		q := db.New(pool)
		key := "fundlens:amcs:v1"
		amcs, cached, err := cache.GetOrSet(c.Context(), rdb, key, 60*time.Second, func() ([]dto.AmcSummary, error) {
			rows, err := q.ListAmcs(c.Context())
			if err != nil {
				return nil, err
			}
			result := make([]dto.AmcSummary, len(rows))
			for i, row := range rows {
				result[i] = dto.FromListAmcsRow(row)
			}
			return result, nil
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
		amc, cached, err := cache.GetOrSet(c.Context(), rdb, key, 60*time.Second, func() (dto.AmcDetail, error) {
			row, err := q.GetAmcBySlug(c.Context(), slug)
			if err != nil {
				return dto.AmcDetail{}, err
			}
			return dto.FromFundlensAmc(row), nil
		})
		if err != nil {
			if errors.Is(err, pgx.ErrNoRows) {
				return Err(c, fiber.StatusNotFound, "amc_not_found", "unknown AMC: "+slug)
			}
			return Err(c, fiber.StatusInternalServerError, "db_error", err.Error())
		}
		return OK(c, amc, cached, 60)
	}
}
