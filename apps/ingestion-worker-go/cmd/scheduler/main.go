package main

import (
	"os"
	"os/signal"
	"syscall"

	"github.com/finmate/ingestion-worker-go/internal/config"
	"github.com/finmate/ingestion-worker-go/internal/scheduler"
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

	log.Info().Msg("starting ingestion scheduler")

	sched := scheduler.NewScheduler(cfg.RedisAddr, cfg.Ingestion.Sources)
	if err := sched.Register(); err != nil {
		log.Fatal().Err(err).Msg("failed to register schedules")
	}

	// Run scheduler in a goroutine
	errc := make(chan error, 1)
	go func() {
		if err := sched.Run(); err != nil {
			errc <- err
		}
	}()

	// Wait for termination signal or error
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
