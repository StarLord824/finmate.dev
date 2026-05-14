# Production Logging with AWS CloudWatch

## Overview

FinMate.dev uses **Pino** for structured logging with CloudWatch integration for production monitoring.

## Architecture

```
┌─────────────────┐
│   Application   │
│   (Pino JSON)   │
└────────┬────────┘
         │
         ├─ Development: pino-pretty (colored console)
         └─ Production: JSON stdout → CloudWatch Logs
```

## Local Development

### Pretty Logging
All services use `pino-pretty` in development for readable, colored logs:

```bash
# Backend API
pnpm --filter backend-api dev

# Ingestion Worker
pnpm --filter ingestion-worker dev

# All services
pnpm dev:all
```

### Log Levels
- `debug` - Detailed information (DB queries, etc.)
- `info` - General information (requests, jobs)
- `warn` - Warning messages
- `error` - Error messages
- `fatal` - Critical errors

Set log level:
```bash
LOG_LEVEL=debug pnpm dev
```

## Production Setup

### 1. AWS CloudWatch Logs Setup

#### Create Log Groups
```bash
# Backend API
aws logs create-log-group --log-group-name /finmate/backend-api

# Ingestion Worker
aws logs create-log-group --log-group-name /finmate/ingestion-worker

# Set retention (30 days)
aws logs put-retention-policy \
  --log-group-name /finmate/backend-api \
  --retention-in-days 30
```

#### Create Log Streams
```bash
# Backend API
aws logs create-log-stream \
  --log-group-name /finmate/backend-api \
  --log-stream-name production

# Ingestion Worker
aws logs create-log-stream \
  --log-group-name /finmate/ingestion-worker \
  --log-stream-name production
```

### 2. Docker Configuration

#### Backend API Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build
RUN pnpm build

# Production environment
ENV NODE_ENV=production
ENV LOG_LEVEL=info

# Start
CMD ["node", "dist/server.js"]
```

#### Docker Compose with CloudWatch Logging
```yaml
version: '3.8'

services:
  backend-api:
    build: ./apps/backend-api
    environment:
      - NODE_ENV=production
      - LOG_LEVEL=info
    logging:
      driver: awslogs
      options:
        awslogs-region: us-east-1
        awslogs-group: /finmate/backend-api
        awslogs-stream: production
        awslogs-create-group: "true"

  ingestion-worker:
    build: ./apps/ingestion-worker
    environment:
      - NODE_ENV=production
      - LOG_LEVEL=info
    logging:
      driver: awslogs
      options:
        awslogs-region: us-east-1
        awslogs-group: /finmate/ingestion-worker
        awslogs-stream: production
        awslogs-create-group: "true"
```

### 3. ECS Task Definition

```json
{
  "family": "finmate-backend",
  "containerDefinitions": [
    {
      "name": "backend-api",
      "image": "your-ecr-repo/backend-api:latest",
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/finmate/backend-api",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "LOG_LEVEL",
          "value": "info"
        }
      ]
    }
  ]
}
```

### 4. IAM Permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogStreams"
      ],
      "Resource": [
        "arn:aws:logs:*:*:log-group:/finmate/*"
      ]
    }
  ]
}
```

## CloudWatch Insights Queries

### Top Errors (Last Hour)
```
fields @timestamp, level, msg, err.message, err.stack
| filter level = "error"
| sort @timestamp desc
| limit 100
```

### API Response Times
```
fields @timestamp, method, url, statusCode, responseTime
| filter statusCode >= 200
| stats avg(responseTime), max(responseTime), min(responseTime) by url
| sort avg(responseTime) desc
```

### Request Volume by Endpoint
```
fields @timestamp, method, url
| stats count() by url
| sort count() desc
```

### Error Rate by Endpoint
```
fields @timestamp, url, statusCode
| filter statusCode >= 400
| stats count() as errors by url
| sort errors desc
```

### User Activity
```
fields @timestamp, userId, method, url
| filter userId != ""
| stats count() by userId
| sort count() desc
```

### Database Operations
```
fields @timestamp, operation, table, duration
| filter operation != ""
| stats avg(duration), max(duration) by operation, table
```

### Feed Ingestion Stats
```
fields @timestamp, source, articleCount
| filter source != ""
| stats sum(articleCount) as total by source
| sort total desc
```

## Monitoring & Alerts

### CloudWatch Alarms

#### High Error Rate
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name finmate-high-error-rate \
  --alarm-description "Alert when error rate exceeds 5%" \
  --metric-name Errors \
  --namespace FinMate \
  --statistic Sum \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 50 \
  --comparison-operator GreaterThanThreshold
```

#### Slow Response Times
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name finmate-slow-response \
  --alarm-description "Alert when p95 response time > 1000ms" \
  --metric-name ResponseTime \
  --namespace FinMate \
  --statistic Average \
  --period 300 \
  --evaluation-periods 2 \
  --threshold 1000 \
  --comparison-operator GreaterThanThreshold
```

## Log Structure

### Backend API Logs
```json
{
  "level": "info",
  "time": "2024-01-15T10:30:00.000Z",
  "service": "backend-api",
  "env": "production",
  "method": "GET",
  "url": "/feed",
  "statusCode": 200,
  "responseTime": 45,
  "userId": "user-123",
  "requestId": "req-abc-123",
  "msg": "GET /feed 200"
}
```

### Ingestion Worker Logs
```json
{
  "level": "info",
  "time": "2024-01-15T10:30:00.000Z",
  "service": "ingestion-worker",
  "env": "production",
  "source": "Bloomberg",
  "articleCount": 25,
  "duration": 1234,
  "msg": "Feed fetched successfully: Bloomberg"
}
```

### Error Logs
```json
{
  "level": "error",
  "time": "2024-01-15T10:30:00.000Z",
  "service": "backend-api",
  "env": "production",
  "err": {
    "type": "Error",
    "message": "Database connection failed",
    "stack": "Error: Database connection failed\n    at ..."
  },
  "method": "POST",
  "url": "/user/bookmark",
  "userId": "user-123",
  "msg": "Request error"
}
```

## Best Practices

### 1. Structured Logging
Always use structured data:
```typescript
// ✅ Good
logger.info({ userId, action: "login", duration: 123 }, "User logged in");

// ❌ Bad
logger.info(`User ${userId} logged in in ${duration}ms`);
```

### 2. Error Context
Include context with errors:
```typescript
try {
  await someOperation();
} catch (error) {
  logger.error({
    err: error,
    userId,
    operation: "someOperation",
    context: { foo: "bar" }
  }, "Operation failed");
}
```

### 3. Performance Logging
Log slow operations:
```typescript
const start = Date.now();
const result = await dbQuery();
const duration = Date.now() - start;

if (duration > 1000) {
  logger.warn({ duration, query: "users" }, "Slow database query");
}
```

### 4. Sensitive Data
Never log sensitive information:
```typescript
// ❌ Bad
logger.info({ password, creditCard }, "User data");

// ✅ Good
logger.info({ userId, email: maskEmail(email) }, "User data");
```

## Cost Optimization

### 1. Log Retention
- Development: 7 days
- Staging: 14 days
- Production: 30 days
- Archive: S3 for long-term storage

### 2. Log Sampling
For high-volume endpoints, sample logs:
```typescript
if (Math.random() < 0.1) { // 10% sampling
  logger.debug({ ... }, "High volume operation");
}
```

### 3. Log Levels
Use appropriate log levels:
- Production: `info` or `warn`
- Staging: `debug`
- Development: `debug` or `trace`

## Troubleshooting

### Logs Not Appearing in CloudWatch
1. Check IAM permissions
2. Verify log group exists
3. Check Docker logging driver
4. Verify AWS credentials

### High CloudWatch Costs
1. Reduce log retention
2. Increase log level (info → warn)
3. Implement log sampling
4. Archive old logs to S3

### Missing Request Context
1. Ensure request ID middleware is first
2. Check user context in auth middleware
3. Verify pino-http configuration

## Resources

- [Pino Documentation](https://getpino.io/)
- [AWS CloudWatch Logs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/)
- [CloudWatch Insights Query Syntax](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html)
