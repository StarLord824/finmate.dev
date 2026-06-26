package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"

	"github.com/finmate/ingestion-worker-go/internal/config"
	"github.com/finmate/ingestion-worker-go/internal/db"
	"github.com/finmate/ingestion-worker-go/internal/worker"
	"github.com/hibiken/asynq"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

func main() {
	// Configure zerolog
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	cfg, err := config.Load()
	if err != nil {
		log.Fatal().Err(err).Msg("failed to load config")
	}

	level, err := zerolog.ParseLevel(cfg.LogLevel)
	if err == nil {
		zerolog.SetGlobalLevel(level)
	}

	ctx := context.Background()

	log.Info().Msg("starting ingestion worker")

	// Init DB Pool
	pool, err := db.NewPool(ctx, cfg.PostgresDSN)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to connect to database")
	}
	defer pool.Close()

	// Init Redis Client for pub/sub & queues
	opt, err := redis.ParseURL(cfg.RedisAddr)
	if err != nil {
		// fallback to direct address if it's not a URI
		opt = &redis.Options{Addr: cfg.RedisAddr}
	}
	rdb := redis.NewClient(opt)
	defer rdb.Close()
	if err := rdb.Ping(ctx).Err(); err != nil {
		log.Fatal().Err(err).Msg("failed to ping redis")
	}

	// Init Asynq Server
	srv := asynq.NewServer(
		asynq.RedisClientOpt{Addr: cfg.RedisAddr},
		asynq.Config{
			Concurrency: 10, // Number of concurrent fetchers
			ErrorHandler: asynq.ErrorHandlerFunc(func(ctx context.Context, task *asynq.Task, err error) {
				log.Error().Err(err).Str("type", task.Type()).Msg("task failed")
			}),
		},
	)

	// Register Handlers
	mux := asynq.NewServeMux()
	h := worker.NewHandler(pool, rdb)
	mux.HandleFunc(worker.TaskTypeFetchSource, h.ProcessTask)

	// Run Worker Server in goroutine
	errc := make(chan error, 1)
	go func() {
		if err := srv.Run(mux); err != nil {
			errc <- err
		}
	}()

	// Wait for termination signal or error
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

	select {
	case err := <-errc:
		log.Fatal().Err(err).Msg("worker server crashed")
	case sig := <-sigs:
		log.Info().Str("signal", sig.String()).Msg("shutting down worker")
		srv.Shutdown()
	}
}
