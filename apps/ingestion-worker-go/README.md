# FinMate Ingestion Worker (Go)

This is the highly-concurrent, distributed ingestion service for the FinMate platform. It is responsible for asynchronously polling financial data sources (like RSS feeds), normalizing the data, persisting it to a PostgreSQL database, and dispatching real-time events to downstream machine learning services.

## Architecture Overview

The system is split into two distinct, independently deployable binaries to ensure absolute scalability without task duplication:

1. **Scheduler** (`cmd/scheduler`): A lightweight singleton process that pushes job payloads onto a Redis message queue based on configured cron intervals.
2. **Worker Pool** (`cmd/worker`): A horizontally scalable fleet of workers that listen to the Redis queue, execute the network fetches, process the HTML content, and interact with the database.

### Key Technologies
* **Language:** Go 1.24+
* **Database:** PostgreSQL (via `pgx` driver)
* **Message Broker / Cache:** Redis
* **Task Queuing:** `github.com/hibiken/asynq`
* **Logging:** `github.com/rs/zerolog` (Structured JSON logging)

## Project Structure

```text
ingestion-worker-go/
├── cmd/
│   ├── scheduler/      # Main entrypoint for the scheduling service
│   └── worker/         # Main entrypoint for the job processing service
├── internal/
│   ├── config/         # Environment variables & JSON config loading
│   ├── db/             # pgx connection pool and atomic DB operations
│   ├── fetcher/        # Strategy pattern interface & implementations (RSS)
│   ├── processor/      # Pure functions for HTML sanitization and NLP prep
│   ├── scheduler/      # Asynq cron registry logic
│   └── worker/         # Asynq queue consumer and pipeline orchestrator
├── deployments/k8s/    # Kubernetes Deployment and HPA manifests
├── Dockerfile          # Multi-stage build producing a <20MB scratch image
└── Migration.md        # Detailed architectural explanation of the Go rewrite
```

## Engineering Standards & Patterns

This service adheres to modern backend engineering standards:
* **12-Factor App:** All configuration is injected via Environment Variables. No state is kept on the local disk.
* **SOLID Principles:** Uses the Strategy Pattern (`IFetcher` interface) to cleanly separate the orchestration loop from the specific network implementation, allowing seamless integration of REST or gRPC sources in the future.
* **Concurrency:** Leverages Go's goroutines heavily for concurrent I/O operations.
* **Idempotency:** Implements true atomic database upserts (`INSERT ... ON CONFLICT DO NOTHING`) using a deterministic SHA-256 fingerprint generated from the article's core properties, resolving distributed race conditions.

## Local Development Setup

### Prerequisites
* Go 1.24+
* PostgreSQL running locally or via Docker
* Redis running locally or via Docker

### Running the Services

1. **Set Environment Variables:**
   ```bash
   export DATABASE_URL="postgres://user:pass@localhost:5432/finmate"
   export REDIS_ADDR="localhost:6379"
   export LOG_LEVEL="debug"
   ```

2. **Start the Worker:**
   Open a terminal and run:
   ```bash
   go run ./cmd/worker
   ```

3. **Start the Scheduler:**
   Open a separate terminal and run:
   ```bash
   go run ./cmd/scheduler
   ```

## Deployment (Kubernetes)

The project includes a multi-stage `Dockerfile` that produces a hyper-minimal `scratch` image. 

Apply the Kubernetes manifests to your cluster:
```bash
kubectl apply -f deployments/k8s/scheduler-deployment.yaml
kubectl apply -f deployments/k8s/worker-deployment.yaml
```

*Note: The worker deployment includes a `HorizontalPodAutoscaler` (HPA) to automatically scale the pool between 2 and 10 pods based on CPU utilization during market open hours.*
