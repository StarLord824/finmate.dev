package db

import (
	"context"
	"fmt"

	"github.com/finmate/ingestion-worker-go/internal/processor"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Pool is the application-level PostgreSQL connection pool.
type Pool struct {
	pool *pgxpool.Pool
}

// NewPool creates and validates a PostgreSQL connection pool.
func NewPool(ctx context.Context, dsn string) (*Pool, error) {
	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		return nil, fmt.Errorf("db: failed to create pool: %w", err)
	}
	if err := pool.Ping(ctx); err != nil {
		return nil, fmt.Errorf("db: ping failed: %w", err)
	}
	return &Pool{pool: pool}, nil
}

// Close shuts down the connection pool gracefully.
func (p *Pool) Close() {
	p.pool.Close()
}

// UpsertResult holds the result of an upsert operation.
type UpsertResult struct {
	ID       string
	Inserted bool
}

// UpsertArticle performs an atomic INSERT ... ON CONFLICT DO NOTHING.
// It matches the exact schema defined by the original Prisma models.
func (p *Pool) UpsertArticle(ctx context.Context, a *processor.Article) (*UpsertResult, error) {
	const q = `
		INSERT INTO "Article" (
			id, title, link, source, author, "publishedAt",
			summary, content, "imageUrl", fingerprint, tags, "updatedAt"
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
		ON CONFLICT (fingerprint) DO NOTHING
		RETURNING id;
	`

	newID := uuid.New().String()
	var insertedID string

	err := p.pool.QueryRow(ctx, q,
		newID,
		a.Title,
		a.Link,
		a.Source,
		a.Author,
		a.PublishedAt,
		a.Summary,
		a.Content,
		a.ImageURL,
		a.Fingerprint,
		a.Tags,
	).Scan(&insertedID)

	if err != nil {
		if err.Error() == "no rows in result set" {
			return &UpsertResult{Inserted: false}, nil
		}
		return nil, fmt.Errorf("db: upsert failed for fingerprint %s: %w", a.Fingerprint, err)
	}

	return &UpsertResult{ID: insertedID, Inserted: true}, nil
}
