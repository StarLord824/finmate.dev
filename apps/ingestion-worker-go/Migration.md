# Architecture Migration: Node.js to Go

This document details the architectural decisions, historical bottlenecks, and technical rationale behind migrating the Ingestion Worker from a monolithic Node.js service to a distributed Go microservice.

This migration was executed to elevate the system from a Minimum Viable Product (MVP) to an enterprise-grade, highly scalable backend service capable of ingesting thousands of high-frequency data streams simultaneously.

---

## 1. The Monolithic Scheduler Bottleneck (The "Thundering Herd" Problem)

### The Previous State
The legacy Node.js application utilized the `cron` npm package to schedule data ingestion. The application acted as both the *scheduler* and the *executor* within the same process.

### The Problem
When traffic increased and we needed to scale the service horizontally (e.g., from 1 to 5 Kubernetes Pods to handle memory load), the in-process cron scheduler replicated itself across all 5 pods. 

**Example Failure Scenario:**
If MarketWatch was scheduled to be fetched every 15 minutes, at `12:15 PM`, all 5 instances would simultaneously trigger the fetch function.
1. We wasted 5x the network bandwidth downloading identical XML payloads.
2. We hammered the publisher's API, risking IP bans or rate limiting.
3. We created a massive race condition at the database layer where 5 workers attempted to insert the exact same articles concurrently.

### The Go Solution: Decoupled Job Queuing (`asynq`)
We separated the architecture into two distinct, independently scalable binaries:
1. **The Scheduler** (`cmd/scheduler`): A singleton process. Its *only* job is to push a JSON payload (e.g., `{ "source": "MarketWatch", "url": "..." }`) onto a Redis queue at the scheduled time. It does zero execution.
2. **The Worker Pool** (`cmd/worker`): A fleet of Go workers listening to the Redis queue using the `asynq` library.

Now, at `12:15 PM`, the singleton Scheduler pushes exactly *one* job to the queue. A single Worker picks it up, locks it, and processes it. We can scale the Worker pool to 100+ pods without ever duplicating a network request.

---

## 2. Database Race Conditions & ORM Overhead

### The Previous State
The Node.js worker used Prisma ORM to interact with PostgreSQL. Because RSS feeds lack guaranteed unique IDs, we generate a deterministic SHA-256 fingerprint for deduplication. To prevent duplicates, the legacy code used a standard ORM pattern:

```javascript
// Legacy Prisma Code
const existing = await prisma.article.findUnique({ where: { fingerprint } });
if (!existing) {
  await prisma.article.create({ data: newArticle });
}
```

### The Problem
This "Read-then-Write" pattern is fundamentally flawed in highly concurrent distributed systems. 
If Worker A and Worker B process overlapping articles at the exact same millisecond:
1. Worker A executes `findUnique` -> returns `null`.
2. Worker B executes `findUnique` -> returns `null`.
3. Worker A executes `create` -> Success.
4. Worker B executes `create` -> Crashes with a `UniqueConstraintViolation` error.

Furthermore, Prisma's underlying Rust query engine carries a heavy memory footprint (often 200MB+ idle), limiting the number of pods we could tightly pack onto a Kubernetes node.

### The Go Solution: Atomic Operations & Raw Drivers (`pgx`)
We dropped the ORM entirely in favor of the `pgx` driver, utilizing native PostgreSQL atomic operations.

```go
// Modern Go Code
const query = `
    INSERT INTO articles (title, link, fingerprint, ...) 
    VALUES ($1, $2, $3, ...) 
    ON CONFLICT (fingerprint) DO NOTHING 
    RETURNING id;
`
```

By pushing the deduplication logic down to the ACID-compliant database engine via `ON CONFLICT DO NOTHING`, we completely eradicated the race condition. If two workers attempt to insert the same article simultaneously, Postgres handles the locking gracefully without throwing application-level exceptions. The memory footprint of the Go binary dropped to roughly ~15MB.

---

## 3. Lack of Extensibility (Tight Coupling)

### The Previous State
The legacy scheduling loop was tightly coupled to the `fetchRss()` function. 

### The Problem
If the business team requested data ingestion from a REST API, a WebSocket stream, or an authenticated gRPC endpoint, integrating it would require messy `if/else` branching deep within the core orchestration loop, violating the Open-Closed Principle (OCP).

### The Go Solution: The Strategy Pattern
We implemented the Strategy Design Pattern via Go interfaces. The core worker orchestrator no longer knows *how* data is fetched; it only knows it possesses an `IFetcher` that returns `[]RawItem`.

```go
type IFetcher interface {
	Fetch(ctx context.Context) ([]RawItem, error)
}
```

We utilize a Factory method (`NewFetcher(sourceType string)`) to inject the correct concrete implementation (`RSSFetcher`, `RestFetcher`, etc.) at runtime based on the source configuration. Adding a new ingestion method now requires zero changes to the core processing pipeline.

---

## Conclusion
This migration demonstrates a transition from a monolithic script to a distributed systems mindset. By leveraging Go's concurrency primitives, decoupling scheduling from execution via Redis task queues, and utilizing atomic database operations, the Ingestion Worker is now robust, horizontally scalable, and aligned with enterprise backend engineering standards.
