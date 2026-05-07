"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, TrendingUp } from "lucide-react";
import type { ReactElement } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/feed" },
  { label: "Solutions", href: "/#solutions" },
  { label: "FAQs", href: "/#faqs" },
];

export function LandingNavbar(): ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md shadow-blue-900/10 border-b border-blue-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#003366] to-[#007acc] flex items-center justify-center shadow-md shadow-blue-800/30 group-hover:shadow-blue-600/40 transition-shadow">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span
            className={`font-extrabold text-xl tracking-tight transition-colors ${
              scrolled ? "text-[#003366]" : "text-white"
            }`}
          >
            FinMate
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#007acc] ${
                scrolled ? "text-[#003366]/80" : "text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              scrolled
                ? "text-[#003366] hover:bg-blue-50"
                : "text-white/90 hover:text-white hover:bg-white/10"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold px-5 py-2 rounded-lg bg-[#007acc] text-white hover:bg-[#00509e] transition-colors shadow-sm shadow-blue-800/30"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-[#003366]" : "text-white"
          }`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-blue-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#003366]/80 hover:text-[#007acc] py-2 border-b border-blue-50 last:border-0 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Link
                href="/login"
                className="flex-1 text-center text-sm font-medium px-4 py-2 rounded-lg border border-blue-200 text-[#003366] hover:bg-blue-50 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex-1 text-center text-sm font-semibold px-4 py-2 rounded-lg bg-[#007acc] text-white hover:bg-[#00509e] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
