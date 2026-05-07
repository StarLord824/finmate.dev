import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import type { ReactElement } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "FinMate — Your Personalized Finance Intelligence Platform",
  description:
    "Stay ahead of the markets with AI-curated financial news, real-time data, and personalized insights. Trusted by investors worldwide.",
  keywords: ["finance", "news", "investing", "markets", "crypto", "personal finance"],
  authors: [{ name: "FinMate" }],
  openGraph: {
    title: "FinMate — Your Personalized Finance Intelligence Platform",
    description: "Personalized finance news and insights from trusted sources",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
