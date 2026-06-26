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

	// Parse Redis URL once — shared by both the redis.Client (pub/sub) and asynq (queues).
	// redis.ParseURL correctly handles redis://, rediss:// (TLS), and auth credentials,
	// which is required for production providers like Upstash.
	redisOpts, err := redis.ParseURL(cfg.RedisURL)
	if err != nil {
		// Fallback: treat as a plain host:port address
		redisOpts = &redis.Options{Addr: cfg.RedisURL}
	}

	rdb := redis.NewClient(redisOpts)
	defer rdb.Close()
	if err := rdb.Ping(ctx).Err(); err != nil {
		log.Fatal().Err(err).Msg("failed to ping redis")
	}

	// Build asynq opt from the same parsed values — asynq does NOT accept raw URLs.
	asynqRedisOpt := asynq.RedisClientOpt{
		Addr:      redisOpts.Addr,
		Username:  redisOpts.Username,
		Password:  redisOpts.Password,
		DB:        redisOpts.DB,
		TLSConfig: redisOpts.TLSConfig,
	}

	// Init Asynq Server
	srv := asynq.NewServer(
		asynqRedisOpt,
		asynq.Config{
			Concurrency: 10,
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
