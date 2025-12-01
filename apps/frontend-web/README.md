# FinMate.dev - Frontend Web Application

A polished, production-ready finance news aggregator built with Next.js 14, TypeScript, and Tailwind CSS. Inspired by daily.dev but focused on finance content.

## 🚀 Features

- **Modern Feed Interface**: Card-based layout with infinite scroll
- **Advanced Search**: Debounced search with autocomplete suggestions
- **Smart Filtering**: Filter by categories and sources
- **Article Details**: Rich article view with related content
- **Bookmarking**: Save articles for later reading
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark Mode Ready**: System-aware theme support
- **Performance Optimized**: React Query caching, lazy loading, skeleton loaders
- **Accessibility**: ARIA labels, keyboard navigation, 4.5:1 contrast ratios

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run development server
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

## 📁 Project Structure

```
frontend-web/
├── app/                      # Next.js app directory
│   ├── article/[id]/        # Article detail page
│   ├── search/              # Search page
│   ├── settings/            # Settings/preferences page
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home feed page
│   └── providers.tsx        # React Query provider
├── components/              # Reusable components
│   ├── Header.tsx           # Main navigation header
│   ├── FeedCard.tsx         # Article card component
│   ├── FiltersPanel.tsx     # Sidebar filters
│   ├── Skeletons.tsx        # Loading skeletons
│   └── EmptyState.tsx       # Empty state component
├── lib/                     # Utilities and types
│   ├── api-client.ts        # API client
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Helper functions
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## 🎨 Design System

### Colors

- **Primary**: `#0b2545` (Deep Navy)
- **Accent**: `#008a6f` (Teal/Finance Green)
- **Accent 2**: `#ffb703` (Warm Gold)
- **Muted**: `#6b7280` (Neutral Gray)
- **Dark BG**: `#0f172a`
- **Light BG**: `#f8fafc`

### Typography

- **Primary Font**: Inter (Variable)
- **Mono Font**: Geist Mono
- **Scales**: H1 (2.25rem), H2 (1.5rem), Body (1rem), Small (0.875rem)

## 🔌 API Integration

The frontend expects a backend API at `NEXT_PUBLIC_API_BASE_URL` with the following endpoints:

- `GET /feed?limit=20&after=cursor&tags=comma,separated` - Get feed articles
- `GET /article/:id` - Get article details
- `GET /search?q=query` - Search articles
- `POST /user/preferences` - Update user preferences
- `POST /user/bookmark` - Toggle bookmark

## 🧪 Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Type check
pnpm check-types
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables
4. Deploy

### Other Platforms

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## 🎯 Performance Optimizations

- **React Query**: 2-minute stale time, 10-minute cache time
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic with Next.js App Router
- **Infinite Scroll**: Efficient pagination with cursor-based loading
- **Debounced Search**: 250ms debounce for search input
- **Skeleton Loaders**: Smooth loading experience

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- 4.5:1 text contrast ratio
- Focus indicators
- Screen reader friendly

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎨 Component Features

### Header
- Sticky navigation with blur backdrop
- Search with keyboard shortcut (/)
- Autocomplete suggestions
- Responsive menu

### FeedCard
- Staggered entrance animations
- Hover lift effect
- Bookmark/share/external link actions
- Lazy-loaded images
- Reading time estimation

### FiltersPanel
- Category chips
- Source checkboxes
- Watchlist ticker input
- Live market widget
- Subscription CTA

## 🔮 Future Enhancements

- [ ] PWA support with offline reading
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Social features (comments, likes)
- [ ] Browser extension
- [ ] Email newsletters
- [ ] Custom RSS feeds

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for the finance community
