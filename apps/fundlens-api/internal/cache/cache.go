package cache

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"github.com/redis/go-redis/v9"
)

// GetOrSet fetches data from Redis cache or computes it via fn on a miss.
// T must be JSON-serializable.
func GetOrSet[T any](ctx context.Context, rdb *redis.Client, key string, ttl time.Duration, fn func() (T, error)) (T, bool, error) {
	var zero T

	raw, err := rdb.Get(ctx, key).Bytes()
	if err == nil {
		var val T
		if jsonErr := json.Unmarshal(raw, &val); jsonErr == nil {
			return val, true, nil // cache hit
		}
	}
	if !errors.Is(err, redis.Nil) && err != nil {
		// Redis error — fall through to compute
	}

	val, err := fn()
	if err != nil {
		return zero, false, err
	}

	if b, jsonErr := json.Marshal(val); jsonErr == nil {
		rdb.Set(ctx, key, b, ttl) //nolint:errcheck — best-effort cache write
	}

	return val, false, nil
}
