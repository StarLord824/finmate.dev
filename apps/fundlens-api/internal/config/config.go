package config

import (
	"fmt"
	"time"

	"github.com/caarlos0/env/v11"
)

// Config holds all env-driven settings for fundlens-api.
// Env vars use the FUNDLENS_ prefix to keep namespace tidy across the monorepo.
type Config struct {
	Port            int           `env:"FUNDLENS_API_PORT" envDefault:"5000"`
	DatabaseURL     string        `env:"FUNDLENS_DATABASE_URL,required"`
	RedisURL        string        `env:"FUNDLENS_REDIS_URL" envDefault:"redis://localhost:6379/0"`
	FrontendURL     string        `env:"FUNDLENS_FRONTEND_URL" envDefault:"http://localhost:3000"`
	LogLevel        string        `env:"FUNDLENS_LOG_LEVEL" envDefault:"info"`
	RateLimitPerMin int           `env:"FUNDLENS_RATE_LIMIT_PER_MIN" envDefault:"100"`
	ReadTimeout     time.Duration `env:"FUNDLENS_READ_TIMEOUT" envDefault:"10s"`
	WriteTimeout    time.Duration `env:"FUNDLENS_WRITE_TIMEOUT" envDefault:"10s"`
}

func Load() (Config, error) {
	var cfg Config
	if err := env.Parse(&cfg); err != nil {
		return Config{}, fmt.Errorf("config: %w", err)
	}
	return cfg, nil
}
