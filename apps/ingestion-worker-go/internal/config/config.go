package config

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
)

// Source represents a single ingestion source from the config file.
type Source struct {
	Name     string   `json:"name"`
	Type     string   `json:"type"`
	URL      string   `json:"url"`
	Tags     []string `json:"tags"`
	Active   bool     `json:"active"`
	Schedule string   `json:"schedule"`
}

// IngestionConfig is the root config structure.
type IngestionConfig struct {
	Sources []Source `json:"sources"`
}

// AppConfig holds all environment-level application configuration.
type AppConfig struct {
	PostgresDSN string
	RedisAddr   string
	LogLevel    string
	Ingestion   IngestionConfig
}

// Load reads environment variables and the ingestion-sources.json file.
func Load() (*AppConfig, error) {
	postgresDSN := os.Getenv("DATABASE_URL")
	redisAddr := os.Getenv("REDIS_ADDR")
	logLevel := os.Getenv("LOG_LEVEL")
	if logLevel == "" {
		logLevel = "info"
	}

	// Resolve path to sources config relative to this source file
	_, filename, _, _ := runtime.Caller(0)
	cfgPath := filepath.Join(filepath.Dir(filename), "../../config/ingestion-sources.json")

	// Allow override via env var for production (e.g., in K8s ConfigMap)
	if envPath := os.Getenv("INGESTION_CONFIG_PATH"); envPath != "" {
		cfgPath = envPath
	}

	data, err := os.ReadFile(cfgPath)
	if err != nil {
		return nil, err
	}

	var ingestion IngestionConfig
	if err := json.Unmarshal(data, &ingestion); err != nil {
		return nil, err
	}

	return &AppConfig{
		PostgresDSN: postgresDSN,
		RedisAddr:   redisAddr,
		LogLevel:    logLevel,
		Ingestion:   ingestion,
	}, nil
}
