package logger

import (
	"os"

	"github.com/rs/zerolog"
)

// New builds a zerolog logger that writes JSON to stdout — matches the Pino
// shape used by the rest of the monorepo's services.
func New(level string) zerolog.Logger {
	lvl, err := zerolog.ParseLevel(level)
	if err != nil {
		lvl = zerolog.InfoLevel
	}
	zerolog.SetGlobalLevel(lvl)
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnixMs
	return zerolog.New(os.Stdout).
		With().
		Timestamp().
		Str("service", "fundlens-api").
		Logger()
}
