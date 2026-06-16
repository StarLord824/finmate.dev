import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  BarChart2,
  Globe,
  BookOpen,
  Bell,
  Shield,
  ChevronRight,
  CheckCircle2,
  Zap,
  Star,
} from "lucide-react";
import type { ReactElement } from "react";

export const metadata: Metadata = {
  title: "FinMate — Your Personalized Finance Intelligence Platform",
  description:
    "Stay ahead of the markets with AI-curated financial news, real-time data, and personalized insights. Trusted by investors worldwide.",
};

/* ─── Data ─── */
const features = [
  {
    icon: Globe,
    title: "Global Market Coverage",
    description:
      "Access real-time news from 200+ trusted financial sources across equity, fixed income, crypto, and macro markets.",
    color: "from-[#003366] to-[#00509e]",
  },
  {
    icon: Zap,
    title: "AI-Curated Feed",
    description:
      "Our intelligent engine surfaces the most relevant stories for your portfolio and interests, filtering out the noise.",
    color: "from-[#00509e] to-[#007acc]",
  },
  {
    icon: BarChart2,
    title: "Live Market Data",
    description:
      "Track indices, equities, and crypto in a sleek market bar. Real-time prices, percentage moves, and volume data.",
    color: "from-[#007acc] to-[#66a3ff]",
  },
  {
    icon: BookOpen,
    title: "In-Depth Analysis",
    description:
      "Go beyond headlines with rich article views, source credibility scores, related reading, and expert commentary.",
    color: "from-[#003366] to-[#007acc]",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Never miss a market-moving event. Set intelligent alerts on tickers, keywords, or breaking macro events.",
    color: "from-[#00509e] to-[#66a3ff]",
  },
  {
    icon: Shield,
    title: "Trusted & Secure",
    description:
      "Enterprise-grade security with end-to-end encryption. Your data, your portfolio — always private.",
    color: "from-[#003366] to-[#00509e]",
  },
];

const solutions = [
  {
    title: "For Individual Investors",
    description:
      "Build a personalized feed tailored to your holdings and watchlist. Make smarter decisions with timely, relevant news.",
    benefits: ["Personalized watchlist news", "Portfolio-aligned alerts", "Bookmark & read later", "Mobile-first experience"],
    cta: "Start Free",
    href: "/signup",
    highlighted: false,
  },
  {
    title: "For Active Traders",
    description:
      "Real-time market intelligence with lightning-fast news delivery. The edge you need in volatile markets.",
    benefits: ["Sub-second news delivery", "Market sentiment signals", "Pre/post-market coverage", "Earnings calendar integration"],
    cta: "Get Started",
    href: "/signup",
    highlighted: true,
  },
  {
    title: "For Financial Teams",
    description:
      "Collaborative research tools, compliance-ready news archives, and team-wide analytics dashboards.",
    benefits: ["Team workspaces", "Compliance audit logs", "API access & exports", "Priority support"],
    cta: "Contact Sales",
    href: "#",
    highlighted: false,
  },
];

const faqs = [
  {
    question: "What sources does FinMate aggregate?",
    answer:
      "FinMate pulls from over 200 premium sources including Reuters, Bloomberg, Financial Times, Wall Street Journal, CNBC, CoinDesk, and many more. Each source is vetted for editorial quality and reliability.",
  },
  {
    question: "How does the personalization work?",
    answer:
      "Our AI engine learns from your reading habits, bookmarks, and explicit preferences (categories, tickers, sources). The more you use FinMate, the more precise your feed becomes.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes! The free tier gives you access to a curated feed, search, and bookmarks with a limit of 50 articles per day. Premium plans unlock unlimited access, real-time alerts, and advanced filters.",
  },
  {
    question: "How current is the news data?",
    answer:
      "Our ingestion pipeline refreshes every 60 seconds for major sources and up to every 5 minutes for niche publications. Breaking news is typically available within 2 minutes of publication.",
  },
  {
    question: "Can I use FinMate on mobile?",
    answer:
      "Absolutely. FinMate is a fully responsive web application optimized for all screen sizes. A native mobile app is currently in development.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel anytime from the Settings page. Your access will continue until the end of the billing period with no additional charges.",
  },
];

const stats = [
  { value: "200+", label: "Trusted Sources" },
  // { value: "50K+", label: "Active Users" },
  { value: "20K+", label: "Articles Indexed" },
  { value: "99.9%", label: "Uptime" },
];

/* ─── Component ─── */
export default function LandingPage(): ReactElement {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#007acc]/20 blur-3xl" />
          <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full bg-[#66a3ff]/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#003366]/30 blur-2xl" />
          {/* Grid pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
              <span className="h-2 w-2 rounded-full bg-[#66a3ff] animate-pulse" />
              <span className="text-sm text-white/80 font-medium">
                Real-time financial intelligence
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
              Your Markets.
              <br />
              <span className="text-gradient">Your Edge.</span>
            </h1>

            <p className="text-lg md:text-xl text-[#cce0ff]/80 leading-relaxed mb-10 max-w-2xl">
              FinMate delivers a personalized stream of financial news, market
              data, and AI-driven insights — so you can move faster, decide
              smarter, and invest with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#003366] font-bold text-base hover:bg-[#cce0ff] transition-colors shadow-xl shadow-black/20"
              >
                Get Started Free
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/feed"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-base hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                View Live Feed
              </Link>
            </div>

            {/* Trust badges */}
            {/* <div className="flex flex-wrap items-center gap-6 mt-12">
              {["No credit card required", "Free tier available", "Cancel anytime"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle2 className="h-4 w-4 text-[#66a3ff]" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div> */}
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 inset-x-0 bg-white/5 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-3 gap-8 ">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-sm text-[#cce0ff]/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-[#007acc] bg-[#cce0ff]/40 mb-4">
              Platform Features
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#003366] tracking-tight mb-4">
              Everything you need to stay ahead
            </h2>
            <p className="text-lg text-[#4a6890] max-w-2xl mx-auto">
              Built for the modern investor. Powerful tools wrapped in a clean, distraction-free interface.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl border border-[#c8ddf5] bg-white hover:shadow-xl hover:shadow-blue-900/8 hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md shadow-blue-900/20 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#003366] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#4a6890] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SOLUTIONS ═══ */}
      <section
        id="solutions"
        className="py-24"
        style={{ background: "var(--gradient-subtle)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-[#007acc] bg-[#cce0ff]/40 mb-4">
              Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#003366] tracking-tight mb-4">
              Built for every investor
            </h2>
            <p className="text-lg text-[#4a6890] max-w-2xl mx-auto">
              Whether you're a retail investor or a professional trading desk, FinMate scales with your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
                  solution.highlighted
                    ? "bg-gradient-to-br from-[#003366] to-[#007acc] border-transparent text-white shadow-2xl shadow-blue-900/30 scale-[1.03]"
                    : "bg-white border-[#c8ddf5] hover:shadow-lg hover:shadow-blue-900/8"
                }`}
              >
                {solution.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 rounded-full bg-[#66a3ff] text-[#003366] text-xs font-bold shadow-md">
                    <Star className="h-3 w-3 fill-current" />
                    Most Popular
                  </div>
                )}

                <h3
                  className={`text-xl font-bold mb-2 ${
                    solution.highlighted ? "text-white" : "text-[#003366]"
                  }`}
                >
                  {solution.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    solution.highlighted ? "text-[#cce0ff]/80" : "text-[#4a6890]"
                  }`}
                >
                  {solution.description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {solution.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm">
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 ${
                          solution.highlighted ? "text-[#66a3ff]" : "text-[#007acc]"
                        }`}
                      />
                      <span
                        className={
                          solution.highlighted ? "text-white/90" : "text-[#0a1628]"
                        }
                      >
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={solution.href}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors ${
                    solution.highlighted
                      ? "bg-white text-[#003366] hover:bg-[#cce0ff]"
                      : "bg-[#003366] text-white hover:bg-[#00509e]"
                  }`}
                >
                  {solution.cta}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      {/* <section className="py-20 bg-white border-y border-[#c8ddf5]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#66a3ff] mb-6">
            Trusted by professionals at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-40">
            {["Goldman Sachs", "Morgan Stanley", "Citadel", "BlackRock", "Vanguard"].map(
              (name) => (
                <span key={name} className="text-xl font-bold text-[#003366] tracking-tight">
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </section> */}

      {/* ═══ FAQs ═══ */}
      <section id="faqs" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-[#007acc] bg-[#cce0ff]/40 mb-4">
              FAQs
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#003366] tracking-tight mb-4">
              Questions? We've got answers.
            </h2>
            <p className="text-lg text-[#4a6890]">
              Everything you need to know about FinMate.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-[#c8ddf5] rounded-2xl overflow-hidden bg-white hover:border-[#007acc]/40 transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none select-none">
                  <h3 className="text-base font-semibold text-[#003366]">{faq.question}</h3>
                  <ChevronRight className="h-5 w-5 text-[#007acc] shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm text-[#4a6890] leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#007acc]/25 blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-96 h-96 rounded-full bg-[#66a3ff]/15 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Ready to invest smarter?
          </h2>
          <p className="text-lg text-[#cce0ff]/80 mb-10">
            Join over 50,000 investors who rely on FinMate for their daily market intelligence.
            No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#003366] font-bold text-base hover:bg-[#cce0ff] transition-colors shadow-xl shadow-black/20"
            >
              Create Free Account
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/feed"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-base hover:bg-white/20 transition-colors"
            >
              Browse the Feed
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
