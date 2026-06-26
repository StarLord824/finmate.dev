package main

import (
	"os"
	"os/signal"
	"syscall"

	"github.com/finmate/ingestion-worker-go/internal/config"
	"github.com/finmate/ingestion-worker-go/internal/scheduler"
	"github.com/hibiken/asynq"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

// parseRedisOpt parses a redis:// or rediss:// URL into an asynq.RedisClientOpt.
// This ensures TLS, auth, and DB index are correctly applied for providers like Upstash.
func parseRedisOpt(rawURL string) asynq.RedisClientOpt {
	opt, err := redis.ParseURL(rawURL)
	if err != nil {
		// Fallback: treat as a plain host:port address
		return asynq.RedisClientOpt{Addr: rawURL}
	}
	return asynq.RedisClientOpt{
		Addr:      opt.Addr,
		Username:  opt.Username,
		Password:  opt.Password,
		DB:        opt.DB,
		TLSConfig: opt.TLSConfig,
	}
}

func main() {
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

	log.Info().Msg("starting ingestion scheduler")

	redisOpt := parseRedisOpt(cfg.RedisURL)

	sched := scheduler.NewScheduler(redisOpt, cfg.Ingestion.Sources)
	if err := sched.Register(); err != nil {
		log.Fatal().Err(err).Msg("failed to register schedules")
	}

	errc := make(chan error, 1)
	go func() {
		if err := sched.Run(); err != nil {
			errc <- err
		}
	}()

	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

	select {
	case err := <-errc:
		log.Fatal().Err(err).Msg("scheduler crashed")
	case sig := <-sigs:
		log.Info().Str("signal", sig.String()).Msg("shutting down scheduler")
		sched.Shutdown()
	}
}
