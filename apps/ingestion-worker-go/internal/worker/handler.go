package worker

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/finmate/ingestion-worker-go/internal/db"
	"github.com/finmate/ingestion-worker-go/internal/fetcher"
	"github.com/finmate/ingestion-worker-go/internal/processor"
	"github.com/hibiken/asynq"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog/log"
)

// Task type constants — central registry for all task names.
const TaskTypeFetchSource = "source:fetch"

// FetchSourcePayload is the job payload enqueued by the scheduler.
type FetchSourcePayload struct {
	Name     string   `json:"name"`
	Type     string   `json:"type"`
	URL      string   `json:"url"`
	Tags     []string `json:"tags"`
}

// NewFetchSourceTask creates an asynq.Task for a given source.
func NewFetchSourceTask(p FetchSourcePayload) (*asynq.Task, error) {
	data, err := json.Marshal(p)
	if err != nil {
		return nil, err
	}
	return asynq.NewTask(TaskTypeFetchSource, data), nil
}

// Handler processes a single fetch job pulled from the asynq queue.
// It is injected with its dependencies (db, redis) — no globals.
type Handler struct {
	db    *db.Pool
	redis *redis.Client
}

// NewHandler constructs a Handler with its required dependencies.
func NewHandler(pool *db.Pool, rdb *redis.Client) *Handler {
	return &Handler{db: pool, redis: rdb}
}

// ProcessTask is the asynq handler function that performs the full pipeline:
// Fetch -> Normalize -> Validate -> Upsert -> Publish/Enqueue
func (h *Handler) ProcessTask(ctx context.Context, t *asynq.Task) error {
	var p FetchSourcePayload
	if err := json.Unmarshal(t.Payload(), &p); err != nil {
		return fmt.Errorf("worker: invalid payload: %w", err)
	}

	logger := log.With().Str("source", p.Name).Logger()
	logger.Info().Msg("processing fetch task")

	// 1. Get the right fetcher via the factory (Strategy Pattern)
	f, err := fetcher.NewFetcher(p.Type, p.URL)
	if err != nil {
		return fmt.Errorf("worker: %w", err)
	}

	// 2. Fetch raw items
	items, err := f.Fetch(ctx)
	if err != nil {
		// Returning error causes asynq to retry with exponential backoff
		return fmt.Errorf("worker: fetch failed: %w", err)
	}
	logger.Info().Int("count", len(items)).Msg("fetched items")

	// 3. Process each item through the pipeline
	inserted := 0
	for _, item := range items {
		article := processor.Normalize(item, p.Name, p.Tags)
		if !processor.Validate(article) {
			continue
		}

		result, err := h.db.UpsertArticle(ctx, article)
		if err != nil {
			logger.Error().Err(err).Str("fingerprint", article.Fingerprint).Msg("upsert failed")
			continue
		}

		if !result.Inserted {
			continue // Already exists — skip publishing
		}

		inserted++

		// 4a. Publish real-time event for SSE clients
		payload, _ := json.Marshal(map[string]string{
			"id":          result.ID,
			"title":       article.Title,
			"source":      article.Source,
			"publishedAt": article.PublishedAt.String(),
		})
		if err := h.redis.Publish(ctx, "feed:new-article", payload).Err(); err != nil {
			logger.Warn().Err(err).Msg("redis publish failed")
		}

		// 4b. Enqueue article for AI enrichment (via Redis List for now)
		// TODO: Migrate to Redis Streams for ACK-based consumption
		if err := h.redis.RPush(ctx, "enrichment:queue", result.ID).Err(); err != nil {
			logger.Warn().Err(err).Msg("enrichment enqueue failed")
		}
	}

	logger.Info().
		Int("fetched", len(items)).
		Int("inserted", inserted).
		Msg("task complete")

	return nil
}
