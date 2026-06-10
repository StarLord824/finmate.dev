package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	fiberlogger "github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"

	"github.com/finmate-dev/fundlens-api/internal/config"
	"github.com/finmate-dev/fundlens-api/internal/handlers"
	"github.com/finmate-dev/fundlens-api/internal/logger"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		fmt.Fprintln(os.Stderr, "config load failed:", err)
		os.Exit(1)
	}

	log := logger.New(cfg.LogLevel)

	// Postgres pool
	pgCtx, pgCancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer pgCancel()
	pool, err := pgxpool.New(pgCtx, cfg.DatabaseURL)
	if err != nil {
		log.Fatal().Err(err).Msg("postgres pool init failed")
	}
	defer pool.Close()

	// Redis
	rdbOpts, err := redis.ParseURL(cfg.RedisURL)
	if err != nil {
		log.Fatal().Err(err).Msg("redis URL parse failed")
	}
	rdb := redis.NewClient(rdbOpts)
	defer rdb.Close()

	app := fiber.New(fiber.Config{
		AppName:      "fundlens-api",
		ReadTimeout:  cfg.ReadTimeout,
		WriteTimeout: cfg.WriteTimeout,
	})

	app.Use(recover.New())
	app.Use(fiberlogger.New(fiberlogger.Config{
		Format: `{"time":"${time}","level":"info","msg":"http","method":"${method}","path":"${path}","status":${status},"latency_ms":${latency}}` + "\n",
	}))

	// Routes — v1 prefix matches the Next.js rewrite proxy:
	//   /fundlens-api/* (client) → /fundlens/api/v1/* (this service)
	v1 := app.Group("/fundlens/api/v1")
	v1.Get("/health", handlers.Health(pool, rdb))

	// AMC routes
	v1.Get("/amcs", handlers.ListAmcs(pool, rdb))
	v1.Get("/amcs/:slug", handlers.GetAmc(pool, rdb))

	// Scheme routes
	v1.Get("/schemes/:slug", handlers.GetScheme(pool, rdb))
	v1.Get("/schemes/:slug/holdings", handlers.ListHoldings(pool, rdb))
	v1.Get("/schemes/:slug/diffs", handlers.ListDiffs(pool, rdb))
	v1.Get("/schemes/:slug/nav", handlers.ListNav(pool, rdb))

	// Stock routes
	v1.Get("/stocks/:isin/holders", handlers.ListStockHolders(pool, rdb))

	// Top-level /health for orchestrators that probe the root
	app.Get("/health", handlers.Health(pool, rdb))

	go func() {
		addr := fmt.Sprintf(":%d", cfg.Port)
		log.Info().Str("addr", addr).Msg("fundlens-api listening")
		if err := app.Listen(addr); err != nil {
			log.Fatal().Err(err).Msg("server stopped")
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	<-stop
	log.Info().Msg("shutting down")
	if err := app.ShutdownWithTimeout(5 * time.Second); err != nil {
		log.Error().Err(err).Msg("shutdown error")
	}
}
