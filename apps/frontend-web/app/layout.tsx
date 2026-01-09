import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Footer } from "@/components/Footer";
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
  title: "FinMate — Your personalized finance feed",
  description: "Personalized finance news and insights from trusted sources: markets, macro, investing, crypto, and more.",
  keywords: ["finance", "news", "investing", "markets", "crypto", "personal finance"],
  authors: [{ name: "FinMate" }],
  openGraph: {
    title: "FinMate — Your personalized finance feed",
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
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Providers>
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
