package scheduler

import (
	"encoding/json"
	"fmt"

	"github.com/finmate/ingestion-worker-go/internal/config"
	"github.com/finmate/ingestion-worker-go/internal/worker"
	"github.com/hibiken/asynq"
	"github.com/rs/zerolog/log"
)

// Scheduler wraps the asynq.Scheduler to enqueue periodic fetch jobs.
// It runs as a SINGLE replica — it only enqueues work, never executes it.
// The actual processing is done by the Worker Deployment (horizontally scaled).
type Scheduler struct {
	inner   *asynq.Scheduler
	sources []config.Source
}

// NewScheduler builds a Scheduler from app config, connecting to Redis via redisAddr.
func NewScheduler(redisAddr string, sources []config.Source) *Scheduler {
	redisOpt := asynq.RedisClientOpt{Addr: redisAddr}
	inner := asynq.NewScheduler(redisOpt, &asynq.SchedulerOpts{
		// Log schedule errors without crashing the process
		EnqueueErrorHandler: func(task *asynq.Task, opts []asynq.Option, err error) {
			log.Error().Err(err).Str("task", task.Type()).Msg("scheduler enqueue error")
		},
	})
	return &Scheduler{inner: inner, sources: sources}
}

// Register adds a cron entry for each active source.
// Each entry enqueues a FetchSourceTask on the configured schedule.
func (s *Scheduler) Register() error {
	for _, src := range s.sources {
		if !src.Active {
			continue
		}

		cronExpr := src.Schedule
		if cronExpr == "" {
			cronExpr = "*/15 * * * *" // default: every 15 minutes
		}

		payload := worker.FetchSourcePayload{
			Name: src.Name,
			Type: src.Type,
			URL:  src.URL,
			Tags: src.Tags,
		}

		task, err := worker.NewFetchSourceTask(payload)
		if err != nil {
			return fmt.Errorf("scheduler: failed to create task for %s: %w", src.Name, err)
		}

		// Serialize payload for logging
		payloadBytes, _ := json.Marshal(payload)
		log.Info().
			Str("source", src.Name).
			Str("cron", cronExpr).
			RawJSON("payload", payloadBytes).
			Msg("registering schedule")

		if _, err := s.inner.Register(cronExpr, task); err != nil {
			return fmt.Errorf("scheduler: failed to register %s: %w", src.Name, err)
		}
	}
	return nil
}

// Run starts the scheduler process (blocking).
func (s *Scheduler) Run() error {
	return s.inner.Run()
}

// Shutdown gracefully stops the scheduler.
func (s *Scheduler) Shutdown() {
	s.inner.Shutdown()
}
