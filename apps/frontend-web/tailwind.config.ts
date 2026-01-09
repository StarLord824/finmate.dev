import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f172a", // Slate-900 (Deep Black/Navy)
          dark: "#020617",
          light: "#334155",
        },
        accent: {
          DEFAULT: "#0f172a", // Monochrome accent (Black) for minimal look
          dark: "#000000",
          light: "#334155",
        },
        muted: {
          DEFAULT: "#64748b", // Slate-500
          dark: "#94a3b8",
          light: "#cbd5e1",
        },
        // Semantic overrides
        background: "#ffffff",
        foreground: "#020617",
        card: "#ffffff",
        "card-foreground": "#020617",
        border: "#e2e8f0", // Slate-200
        
        // Retain legacy aliases for compatibility but ensuring they map to new theme
        dark: {
          bg: "#ffffff", // Force light even in "dark" classes for now
          card: "#ffffff",
          border: "#e2e8f0",
        },
        light: {
          bg: "#ffffff",
          card: "#ffffff",
          border: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        h1: ["2.25rem", { lineHeight: "2.5rem", fontWeight: "700" }],
        h2: ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "fade-up": "fadeUp 0.4s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "shimmer": "shimmer 2s infinite",
        "lift": "lift 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        lift: {
          "0%": { transform: "translateY(0) scale(1)" },
          "100%": { transform: "translateY(-6px) scale(1.01)" },
        },
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "card-hover": "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "card-dark": "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)",
        "card-hover-dark": "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
