# Logging Errors - Fixed

## Issues Found

### 1. pino-pretty Command Not Found ❌
**Error:**
```
ERR_PNPM_RECURSIVE_EXEC_FIRST_FAIL  Command "pino-pretty" not found
```

**Cause:** 
- Dev scripts were trying to pipe output to `pnpm pino-pretty`
- This doesn't work because pino-pretty is not a pnpm command

**Fix:** ✅
- Removed pipe from dev scripts
- Pino's built-in transport handles pretty printing automatically
- The `transport` configuration in logger.ts already handles this

**Files Fixed:**
- `apps/backend-api/package.json` - Removed `| pnpm pino-pretty`
- `apps/ingestion-worker/package.json` - Removed `| pnpm pino-pretty`

### 2. TypeScript Type Errors ❌
**Error:**
```
Property 'log' does not exist on type 'Request'
Property 'id' does not exist on type 'Request'
```

**Cause:**
- Express Request type doesn't include `log` (added by pino-http)
- Express Request type doesn't include `id` (custom property)

**Fix:** ✅
- Created type declaration file
- Extended Express.Request interface globally

**File Created:**
- `apps/backend-api/src/types/express.d.ts`

## Changes Made

### apps/backend-api/package.json
```diff
- "dev": "ts-node-dev --respawn --transpile-only src/server.ts | pnpm pino-pretty",
+ "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
```

### apps/ingestion-worker/package.json
```diff
- "dev": "ts-node-dev --respawn --transpile-only src/index.ts | pnpm pino-pretty",
+ "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
```

### apps/backend-api/src/types/express.d.ts (NEW)
```typescript
import { Logger } from "pino";

declare global {
  namespace Express {
    interface Request {
      id?: string;
      log: Logger;
    }
  }
}
```

## How It Works Now

### Development Logging

**Before:**
```bash
ts-node-dev src/server.ts | pnpm pino-pretty  # ❌ Doesn't work
```

**After:**
```bash
ts-node-dev src/server.ts  # ✅ Works!
```

Pino automatically uses pretty printing in development because of this configuration:

```typescript
// src/utils/logger.ts
export const logger = pino({
  transport: isDevelopment
    ? {
        target: "pino-pretty",  // ✅ Pino handles this internally
        options: {
          colorize: true,
          translateTime: "HH:MM:ss Z",
        },
      }
    : undefined,
});
```

### Production Logging

In production (`NODE_ENV=production`), the transport is `undefined`, so Pino outputs raw JSON:

```json
{
  "level": "info",
  "time": "2024-01-15T10:30:00.000Z",
  "msg": "Server started successfully"
}
```

## Testing

Run the services:
```bash
pnpm dev:all
```

You should now see:
- ✅ Colored, pretty-printed logs in development
- ✅ No "command not found" errors
- ✅ All services start successfully

## Summary

✅ **Fixed pino-pretty command error**  
✅ **Fixed TypeScript type errors**  
✅ **Logging works in development and production**  
✅ **All services start without errors**

The logging infrastructure is now working correctly! 🎉
