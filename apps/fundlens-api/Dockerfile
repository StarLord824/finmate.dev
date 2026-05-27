# syntax=docker/dockerfile:1.7
FROM golang:1.23-alpine AS build

WORKDIR /src

# Cache deps
COPY go.mod go.sum* ./
RUN go mod download || true

# Build
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /out/fundlens-api ./cmd/server

# Distroless static — no shell, minimal attack surface
FROM gcr.io/distroless/static-debian12:nonroot
WORKDIR /app
COPY --from=build /out/fundlens-api /app/fundlens-api

EXPOSE 5000

USER nonroot:nonroot
ENTRYPOINT ["/app/fundlens-api"]
