# Authentication Setup Guide

## Overview

FinMate.dev uses [better-auth](https://www.better-auth.com/) for authentication with support for:
- ✅ Email/Password authentication
- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ Secure session management with httpOnly cookies

## Quick Start

### 1. Database Migration

The Prisma schema already includes the necessary auth tables. Run migrations:

```bash
cd packages/db
pnpm prisma migrate dev
```

### 2. Environment Variables

#### Frontend (`apps/frontend-web/.env.local`)

```env
DATABASE_URL="postgresql://finmate:finmate123@localhost:5432/finmate_db"
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000

# Optional: OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

#### Backend (`apps/backend-api/.env`)

```env
DATABASE_URL="postgresql://finmate:finmate123@localhost:5432/finmate_db"
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Install Dependencies

```bash
# Root
pnpm install

# Backend (if needed)
cd apps/backend-api
pnpm install
```

### 4. Start Services

```bash
# From root
pnpm dev:all
```

## OAuth Provider Setup (Optional)

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set Homepage URL: `http://localhost:3000`
4. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and generate Client Secret
6. Add to `.env.local`

## API Endpoints

### Authentication (Frontend - better-auth)

All handled automatically by better-auth:
- `POST /api/auth/sign-up/email` - Email signup
- `POST /api/auth/sign-in/email` - Email login
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/session` - Get session
- `GET /api/auth/callback/google` - Google OAuth callback
- `GET /api/auth/callback/github` - GitHub OAuth callback

### Protected Backend Endpoints

These require authentication (session cookie):

- `GET /user/me` - Get current user
- `POST /user/preferences` - Update user preferences
- `POST /user/bookmark` - Toggle bookmark
- `GET /user/bookmarks` - Get user's bookmarks

## Usage Examples

### Frontend - Sign Up

```typescript
import { authClient } from "@/lib/auth-client";

await authClient.signUp.email({
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
});
```

### Frontend - Sign In

```typescript
await authClient.signIn.email({
  email: "user@example.com",
  password: "password123",
});
```

### Frontend - OAuth

```typescript
// Google
await authClient.signIn.social({
  provider: "google",
  callbackURL: "/",
});

// GitHub
await authClient.signIn.social({
  provider: "github",
  callbackURL: "/",
});
```

### Frontend - Get Session

```typescript
import { authClient } from "@/lib/auth-client";

function MyComponent() {
  const { data: session } = authClient.useSession();
  
  if (session?.user) {
    return <div>Hello {session.user.name}</div>;
  }
  
  return <div>Not logged in</div>;
}
```

### Frontend - Sign Out

```typescript
await authClient.signOut();
```

### Backend - Protected Route

```typescript
import { authMiddleware, AuthRequest } from "../middleware/auth";

router.post("/protected", authMiddleware, async (req: AuthRequest, res) => {
  // req.user is available
  const userId = req.user!.id;
  // ... your logic
});
```

## Database Schema

### User Model

```prisma
model User {
  id            String    @id
  name          String?
  email         String?   @unique
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  preferences   Json?
  bookmarks     String[]  @default([])
  sessions      Session[]
  accounts      Account[]
}
```

### Session Model

```prisma
model Session {
  id         String   @id
  userId     String
  token      String   @unique
  expiresAt  DateTime
  ipAddress  String?
  userAgent  String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Account Model (for OAuth)

```prisma
model Account {
  id                      String   @id
  userId                  String
  accountId               String
  providerId              String
  accessToken             String?
  refreshToken            String?
  accessTokenExpiresAt    DateTime?
  refreshTokenExpiresAt   DateTime?
  scope                   String?
  idToken                 String?
  password                String?
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
  user                    User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## Security Features

✅ **httpOnly Cookies** - Session tokens stored in httpOnly cookies (not accessible via JavaScript)
✅ **Secure Cookies** - Cookies marked as secure in production
✅ **CORS Protection** - Backend only accepts requests from configured frontend
✅ **Session Expiration** - Sessions expire after 7 days
✅ **Password Hashing** - Passwords hashed with bcrypt
✅ **CSRF Protection** - Built into better-auth

## Troubleshooting

### "Unauthorized" errors

1. Check that cookies are being sent (credentials: 'include' in fetch)
2. Verify CORS is configured correctly in backend
3. Check session hasn't expired

### OAuth not working

1. Verify redirect URIs match exactly in provider dashboard
2. Check CLIENT_ID and CLIENT_SECRET are correct
3. Ensure OAuth provider is enabled in auth config

### Session not persisting

1. Check cookies are enabled in browser
2. Verify `useSecureCookies` is false in development
3. Check domain/path settings in cookie configuration

## Production Deployment

### Environment Variables

Update these for production:

```env
# Frontend
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com

# Backend
FRONTEND_URL=https://your-domain.com
NODE_ENV=production

# OAuth redirect URIs
# Update in provider dashboards to use production URLs
```

### Security Checklist

- [ ] Use HTTPS in production
- [ ] Set `NODE_ENV=production`
- [ ] Use strong `BETTER_AUTH_SECRET`
- [ ] Enable email verification (`requireEmailVerification: true`)
- [ ] Configure rate limiting
- [ ] Set up proper CORS origins
- [ ] Use managed PostgreSQL database
- [ ] Enable database SSL

## Additional Resources

- [better-auth Documentation](https://www.better-auth.com/docs)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
