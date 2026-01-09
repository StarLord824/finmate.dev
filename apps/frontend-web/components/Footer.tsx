"use client";
import Link from 'next/link';
import { TrendingUp, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import type { ReactElement } from 'react';

export function Footer(): ReactElement {
  return (
    <footer className="w-full border-t bg-light-card dark:bg-dark-card border-light-border dark:border-dark-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <TrendingUp className="h-6 w-6 text-accent transition-transform group-hover:scale-110" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                FinMate
              </span>
            </Link>
            <p className="text-sm text-muted">
              Your personal finance companion. Stay ahead of the market with curated news and insights.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/" className="hover:text-accent transition-colors">Feed</Link></li>
              <li><Link href="/search" className="hover:text-accent transition-colors">Search</Link></li>
              <li><Link href="/bookmarks" className="hover:text-accent transition-colors">Bookmarks</Link></li>
              <li><Link href="/settings" className="hover:text-accent transition-colors">Settings</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="#" className="hover:text-accent transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-accent transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted hover:text-accent transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-light-border dark:border-dark-border mt-8 pt-8 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} FinMate.dev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
