import Link from "next/link";
import { TrendingUp, Twitter, Linkedin, Github, Mail } from "lucide-react";
import type { ReactElement } from "react";

const footerLinks = {
  Product: [
    { label: "Dashboard", href: "/feed" },
    { label: "Market Feed", href: "/feed" },
    { label: "Search", href: "/search" },
    { label: "Bookmarks", href: "/bookmarks" },
  ],
  Company: [
    { label: "About", href: "/#about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
  Support: [
    { label: "FAQs", href: "/#faqs" },
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Status", href: "#" },
  ],
};

export function LandingFooter(): ReactElement {
  return (
    <footer className="bg-[#003366] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-[#66a3ff]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">FinMate</span>
            </Link>
            <p className="text-[#cce0ff]/70 text-sm leading-relaxed mb-6 max-w-xs">
              Your personalized financial intelligence platform. Stay ahead of the markets with curated news and real-time insights.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Mail, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="h-9 w-9 rounded-lg bg-white/10 hover:bg-[#007acc] flex items-center justify-center transition-colors"
                >
                  <Icon className="h-4 w-4 text-[#cce0ff]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#66a3ff] mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#cce0ff]/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#cce0ff]/50">
            © {new Date().getFullYear()} FinMate. All rights reserved.
          </p>
          <p className="text-sm text-[#cce0ff]/50">
            Built for investors who demand more.
          </p>
        </div>
      </div>
    </footer>
  );
}
