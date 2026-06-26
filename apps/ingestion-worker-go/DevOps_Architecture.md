# DevOps & Deployment Architecture

This document details the infrastructure design, containerization strategy, and deployment plan for the FinMate Ingestion Worker microservice. The goal of this architecture is to provide high availability, cost efficiency, and horizontal scalability.

---

## 1. Containerization Strategy

We leverage Docker to package the Go application into an immutable, highly portable container. 

### Multi-Stage "Distroless" Builds
Our `Dockerfile` utilizes a multi-stage build process to optimize for both security and size:
1. **Builder Stage:** Uses `golang:1.24-alpine` to download dependencies and compile the Go source code into statically linked binaries.
2. **Final Stage:** Uses the `scratch` image (an entirely empty Docker image). We only copy over the compiled binaries, root certificates (for HTTPS), and timezone data.
   - **Result:** The final Docker image is **< 20MB**. 
   - **Benefit:** Zero attack surface (no shell, no package manager) and lightning-fast pull times during Kubernetes auto-scaling.

---

## 2. Kubernetes (K8s) Architecture

The application is deployed across Kubernetes using specialized manifests found in `deployments/k8s/`.

### A. The Scheduler Deployment (`scheduler-deployment.yaml`)
- **Topology:** Strictly enforced as a single-replica Deployment (`replicas: 1`).
- **Responsibility:** Runs the `asynq` cron registry. At designated intervals, it pushes JSON payloads to Redis.
- **Resource Constraints:** Extremely low overhead. Requested `50m` CPU and `32Mi` RAM.

### B. The Worker Deployment (`worker-deployment.yaml`)
- **Topology:** A horizontally scaled Deployment.
- **Responsibility:** Pulls tasks from Redis, executes the network fetches, normalizes data, and upserts to PostgreSQL.
- **Autoscaling:** Managed by a `HorizontalPodAutoscaler` (HPA).
  - **Minimum Replicas:** 2 (for High Availability in case a node fails).
  - **Maximum Replicas:** 10 (scales out during high-volume fetching periods).
  - **Trigger:** CPU Utilization > 75%.

### C. Config and Secret Management
Following the 12-Factor App methodology, the application contains zero hardcoded credentials.
- **Environment Variables:** Used for non-sensitive config (e.g., `LOG_LEVEL`, `REDIS_ADDR`).
- **Kubernetes Secrets:** Used for the `DATABASE_URL`. The deployment manifest references `valueFrom: secretKeyRef` to inject credentials securely into the container at runtime.

---

## 3. Production Deployment Plan

To deploy this architecture from scratch to a production Kubernetes cluster, follow this sequential plan:

### Step 1: Provision Backing Services
Before deploying the application pods, the stateful services must be available.
1. **PostgreSQL:** Provision a managed Postgres database (e.g., AWS RDS, Supabase, or Neon).
2. **Redis:** Provision a managed Redis cluster (e.g., AWS ElastiCache or Upstash).

### Step 2: Build and Push Docker Images
Build the container and push it to a secure registry (like AWS ECR or Docker Hub).
```bash
docker build -t finmate/ingestion-worker-go:latest .
docker push finmate/ingestion-worker-go:latest
```

### Step 3: Apply Kubernetes Secrets
Create the secure secret containing the database connection string.
```bash
kubectl create secret generic db-secrets \
  --from-literal=dsn='postgres://user:password@host:5432/finmate'
```

### Step 4: Apply Deployments
Deploy the scheduler and worker pods to the cluster.
```bash
kubectl apply -f deployments/k8s/scheduler-deployment.yaml
kubectl apply -f deployments/k8s/worker-deployment.yaml
```

### Step 5: Monitor and Verify
Verify that the pods are running and monitor the logs to ensure fetching is occurring.
```bash
kubectl get pods
kubectl logs -l app=ingestion-worker -f
```
