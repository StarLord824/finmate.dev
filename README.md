# FinMate.dev 📈

> A modern, personalized finance news aggregator - your daily.dev for finance.

FinMate.dev is a full-stack finance news platform that aggregates, curates, and personalizes financial content from multiple sources. Built with a modern tech stack and designed for scalability.

![FinMate Banner](https://via.placeholder.com/1200x300/008A6F/FFFFFF?text=FinMate.dev+-+Your+Finance+News+Hub)

## ✨ Features

- 🎯 **Personalized Feed** - AI-powered content recommendations based on your interests
- 🔍 **Smart Search** - Find articles across all sources instantly
- 📱 **Auto-Scrolling Bento Grid** - Modern, engaging UI with varying card sizes
- 🏷️ **Category Filtering** - Markets, Investing, Crypto, Economy, and more
- 📰 **Multi-Source Aggregation** - Bloomberg, WSJ, Reuters, and more
- 🔖 **Bookmarks** - Save articles for later reading
- 🌓 **Dark Mode** - Easy on the eyes, day or night
- ⚡ **Real-time Updates** - Stay current with the latest financial news

## 🏗️ Architecture

This is a **Turborepo monorepo** with the following structure:

```
finmate.dev/
├── apps/
│   ├── backend-api/          # Express + Prisma API (Port 4000)
│   ├── frontend-web/          # Next.js 14 App Router (Port 3000)
│   └── ingestion-worker/      # Article scraping & processing
├── packages/
│   └── db/                    # Shared Prisma schema
└── docker-compose.yml         # PostgreSQL database
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React 19, TailwindCSS, Framer Motion |
| **Backend** | Express.js, Prisma ORM, TypeScript |
| **Database** | PostgreSQL (Docker) |
| **Worker** | Node.js, RSS/API scraping |
| **Monorepo** | Turborepo, pnpm workspaces |

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 9.0.0
- **Docker** (for PostgreSQL)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/StarLord824/finmate.dev.git
   cd finmate.dev
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create `.env` files in each app:
   
   **`apps/backend-api/.env`**
   ```env
   DATABASE_URL="postgresql://finmate:finmate123@localhost:5432/finmate_db"
   PORT=4000
   NODE_ENV=development
   ```
   
   **`apps/frontend-web/.env.local`**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```
   
   **`apps/ingestion-worker/.env`**
   ```env
   DATABASE_URL="postgresql://finmate:finmate123@localhost:5432/finmate_db"
   ```

4. **Start the database**
   ```bash
   pnpm db:up
   ```

5. **Run database migrations**
   ```bash
   cd packages/db
   pnpm prisma migrate dev
   cd ../..
   ```

6. **Start all services** 🎉
   ```bash
   pnpm dev:all
   ```

That's it! Your services will be running at:
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend API: http://localhost:4000
- 🗄️ PostgreSQL: localhost:5432

## 📜 Available Scripts

### Root Level Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev:all` | 🚀 **Start everything** (DB + Backend + Worker + Frontend) |
| `pnpm dev:backend` | Start backend API only |
| `pnpm dev:worker` | Start ingestion worker only |
| `pnpm dev:frontend` | Start frontend only |
| `pnpm db:up` | Start PostgreSQL database |
| `pnpm db:down` | Stop PostgreSQL database |
| `pnpm db:logs` | View database logs |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all apps |
| `pnpm format` | Format code with Prettier |

### Individual App Scripts

**Backend API**
```bash
cd apps/backend-api
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
```

**Frontend Web**
```bash
cd apps/frontend-web
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
```

**Ingestion Worker**
```bash
cd apps/ingestion-worker
pnpm dev          # Start worker
pnpm build        # Build for production
pnpm start        # Start production worker
```

## 🗄️ Database Management

### Prisma Commands

```bash
cd packages/db

# Generate Prisma Client
pnpm prisma generate

# Create a new migration
pnpm prisma migrate dev --name migration_name

# Apply migrations
pnpm prisma migrate deploy

# Open Prisma Studio (DB GUI)
pnpm prisma studio

# Reset database (⚠️ deletes all data)
pnpm prisma migrate reset
```

### Database Schema

The main entities:

- **Article** - News articles with metadata
- **Source** - News sources (Bloomberg, WSJ, etc.)
- **Tag** - Categories and topics
- **User** - User accounts (future)
- **Bookmark** - Saved articles (future)

## 🎨 Frontend Features

### Bento Grid Layout
- Auto-scrolling feed with pause-on-hover
- Varying card sizes (1x1, 2x1, 1x2, 2x2)
- Smooth animations and transitions
- Responsive design (mobile → desktop)

### Filters & Search
- Category filtering (Markets, Crypto, etc.)
- Source filtering (Bloomberg, WSJ, etc.)
- Real-time search across all articles
- Infinite scroll with cursor-based pagination

### Article Cards
- Image headers with gradient overlays
- Tags, source, reading time
- Bookmark, share, and external link actions
- Opens in new tab

## 🔌 API Endpoints

### Feed
```
GET /feed?limit=20&after=ISO_DATE&tags=Markets,Crypto&sources=Bloomberg
```

### Article Detail
```
GET /article/:id
```

### Search
```
GET /search?q=bitcoin
```

### Health Check
```
GET /health
```

## 🛠️ Development

### Project Structure

```
apps/backend-api/
├── src/
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── middleware/      # Express middleware
│   └── index.ts         # Entry point

apps/frontend-web/
├── app/                 # Next.js App Router
│   ├── page.tsx         # Home (feed)
│   ├── article/[id]/    # Article detail
│   ├── search/          # Search page
│   └── settings/        # User settings
├── components/          # React components
└── lib/                 # Utilities & types

apps/ingestion-worker/
├── src/
│   ├── scrapers/        # Source scrapers
│   ├── processors/      # Content processing
│   └── index.ts         # Worker entry
```

### Adding a New Source

1. Create scraper in `apps/ingestion-worker/src/scrapers/`
2. Add source configuration
3. Implement article fetching logic
4. Test and deploy

### Code Quality

```bash
# Type checking
pnpm check-types

# Linting
pnpm lint

# Formatting
pnpm format
```

## 🚢 Deployment

### Backend & Worker
- Deploy to any Node.js hosting (Railway, Render, Fly.io)
- Set environment variables
- Run migrations: `pnpm prisma migrate deploy`

### Frontend
- Deploy to Vercel (recommended)
- Set `NEXT_PUBLIC_API_URL` environment variable
- Automatic deployments from main branch

### Database
- Use managed PostgreSQL (Neon, Supabase, Railway)
- Update `DATABASE_URL` in all apps

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by [daily.dev](https://daily.dev)
- Built with [Turborepo](https://turbo.build)
- UI components styled with [TailwindCSS](https://tailwindcss.com)

## 📧 Contact

**StarLord824** - [@StarLord824](https://github.com/StarLord824)

Project Link: [https://github.com/StarLord824/finmate.dev](https://github.com/StarLord824/finmate.dev)

---

<div align="center">
  <strong>Made with ❤️ for the finance community</strong>
</div>
