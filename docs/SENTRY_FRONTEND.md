# Sentry Integration for Frontend Error Monitoring

## Overview

FinMate.dev frontend uses Sentry for production error monitoring and performance tracking.

## Setup

### 1. Install Sentry

```bash
cd apps/frontend-web
pnpm add @sentry/nextjs
```

### 2. Initialize Sentry

```bash
npx @sentry/wizard@latest -i nextjs
```

This will create:
- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`
- Update `next.config.js`

### 3. Environment Variables

Add to `.env.local`:
```env
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
SENTRY_AUTH_TOKEN=your_auth_token_here
SENTRY_ORG=your_org
SENTRY_PROJECT=finmate-frontend
```

### 4. Configuration Files

#### `sentry.client.config.ts`
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Environment
  environment: process.env.NODE_ENV,
  
  // Tracing
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Integrations
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [
        "localhost",
        /^https:\/\/api\.finmate\.dev/,
      ],
    }),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  
  // Filter out known errors
  beforeSend(event, hint) {
    // Filter out network errors
    if (event.exception?.values?.[0]?.type === "NetworkError") {
      return null;
    }
    
    // Filter out ad blocker errors
    if (event.message?.includes("adsbygoogle")) {
      return null;
    }
    
    return event;
  },
});
```

#### `sentry.server.config.ts`
```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
});
```

## Usage

### Automatic Error Capture

Sentry automatically captures:
- Unhandled exceptions
- Unhandled promise rejections
- React component errors
- API errors

### Manual Error Capture

```typescript
import * as Sentry from "@sentry/nextjs";

try {
  await riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: "feed",
      operation: "fetchArticles",
    },
    extra: {
      userId: user?.id,
      filters: selectedCategories,
    },
  });
}
```

### Custom Messages

```typescript
Sentry.captureMessage("Something went wrong", {
  level: "warning",
  tags: { feature: "bookmarks" },
});
```

### User Context

```typescript
import { authClient } from "@/lib/auth-client";

function MyApp() {
  const { data: session } = authClient.useSession();
  
  useEffect(() => {
    if (session?.user) {
      Sentry.setUser({
        id: session.user.id,
        email: session.user.email,
        username: session.user.name,
      });
    } else {
      Sentry.setUser(null);
    }
  }, [session]);
}
```

### Performance Monitoring

```typescript
import * as Sentry from "@sentry/nextjs";

// Start transaction
const transaction = Sentry.startTransaction({
  name: "Feed Load",
  op: "navigation",
});

try {
  const articles = await apiClient.getFeed();
  transaction.setStatus("ok");
} catch (error) {
  transaction.setStatus("internal_error");
  throw error;
} finally {
  transaction.finish();
}
```

### Custom Spans

```typescript
const transaction = Sentry.getCurrentHub().getScope()?.getTransaction();

if (transaction) {
  const span = transaction.startChild({
    op: "api.fetch",
    description: "Fetch articles",
  });
  
  try {
    await apiClient.getFeed();
    span.setStatus("ok");
  } catch (error) {
    span.setStatus("internal_error");
    throw error;
  } finally {
    span.finish();
  }
}
```

## Error Boundaries

### Global Error Boundary

```typescript
// app/error.tsx
"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={reset}
          className="px-4 py-2 bg-accent text-white rounded-lg"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

### Component Error Boundary

```typescript
import { ErrorBoundary } from "@sentry/nextjs";

function MyComponent() {
  return (
    <ErrorBoundary
      fallback={<div>An error occurred</div>}
      showDialog
    >
      <RiskyComponent />
    </ErrorBoundary>
  );
}
```

## Best Practices

### 1. Add Context

```typescript
Sentry.setContext("article", {
  id: article.id,
  title: article.title,
  source: article.source,
});
```

### 2. Breadcrumbs

```typescript
Sentry.addBreadcrumb({
  category: "user-action",
  message: "User clicked bookmark",
  level: "info",
  data: {
    articleId: article.id,
  },
});
```

### 3. Tags for Filtering

```typescript
Sentry.setTag("feature", "feed");
Sentry.setTag("user_tier", "premium");
```

### 4. Sampling

```typescript
// Only send 10% of transactions in production
tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
```

## Alerts

### Slack Integration
1. Go to Sentry → Settings → Integrations
2. Add Slack integration
3. Configure alert rules

### Email Alerts
1. Go to Sentry → Settings → Alerts
2. Create alert rule
3. Set conditions (e.g., >10 errors in 5 minutes)

## Dashboard

### Key Metrics
- Error rate
- Affected users
- Most common errors
- Performance metrics
- Release health

### Custom Dashboards
Create dashboards for:
- Feed performance
- API errors
- User journey errors
- Authentication errors

## Source Maps

### Upload Source Maps

```json
// next.config.js
const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  {
    // Your Next.js config
  },
  {
    silent: true,
    org: "your-org",
    project: "finmate-frontend",
    authToken: process.env.SENTRY_AUTH_TOKEN,
  }
);
```

## Cost Optimization

### 1. Sample Rates
```typescript
tracesSampleRate: 0.1, // 10% of transactions
replaysSessionSampleRate: 0.1, // 10% of sessions
```

### 2. Filter Errors
```typescript
beforeSend(event) {
  // Filter out known/expected errors
  if (event.message?.includes("expected_error")) {
    return null;
  }
  return event;
}
```

### 3. Data Scrubbing
```typescript
beforeSend(event) {
  // Remove sensitive data
  if (event.request?.cookies) {
    delete event.request.cookies;
  }
  return event;
}
```

## Testing

### Test Sentry Integration

```typescript
// pages/sentry-test.tsx
import * as Sentry from "@sentry/nextjs";

export default function SentryTest() {
  return (
    <button onClick={() => {
      throw new Error("Test error");
    }}>
      Trigger Error
    </button>
  );
}
```

## Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Performance Monitoring](https://docs.sentry.io/product/performance/)
- [Sentry Session Replay](https://docs.sentry.io/product/session-replay/)
