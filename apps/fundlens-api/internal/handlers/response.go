package handlers

import (
	"time"

	"github.com/gofiber/fiber/v2"
)

type meta struct {
	AsOf   string `json:"asOf"`
	Cached bool   `json:"cached"`
	TtlSec int    `json:"ttlSec"`
}

type envelope[T any] struct {
	Data T    `json:"data"`
	Meta meta `json:"meta"`
}

type errBody struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

type errEnvelope struct {
	Error errBody `json:"error"`
}

func OK[T any](c *fiber.Ctx, data T, cached bool, ttlSec int) error {
	return c.JSON(envelope[T]{
		Data: data,
		Meta: meta{
			AsOf:   time.Now().UTC().Format(time.RFC3339),
			Cached: cached,
			TtlSec: ttlSec,
		},
	})
}

func Err(c *fiber.Ctx, status int, code, message string) error {
	return c.Status(status).JSON(errEnvelope{
		Error: errBody{Code: code, Message: message},
	})
}
