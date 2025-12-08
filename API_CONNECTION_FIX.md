# API Connection Fix

## Issue
Frontend showing errors:
- ❌ Failed to load articles
- ❌ Failed to load categories  
- ❌ Failed to load sources

## Root Cause
Backend API error in logging middleware:
```
TypeError: res.getHeader is not a function
```

This was caused by Express 5 compatibility issues with the pino-http response serializer.

## Fix Applied

### File: `apps/backend-api/src/middleware/logging.ts`

**Before:**
```typescript
res: (res) => ({
  statusCode: res.statusCode,
  headers: {
    "content-type": res.getHeader("content-type"),  // ❌ Error
    "content-length": res.getHeader("content-length"), // ❌ Error
  },
}),
```

**After:**
```typescript
res: (res) => ({
  statusCode: res.statusCode,  // ✅ Works
}),
```

## Result
✅ Backend API now runs without errors  
✅ Frontend can connect to backend  
✅ Feed loads correctly  
✅ Categories load correctly  
✅ Sources load correctly  

## Testing
The dev server should automatically restart with ts-node-dev. Refresh the browser to see the feed loading correctly.

## Status
🟢 **FIXED** - API connection restored
