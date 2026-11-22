"use client";

import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookie-settings-button";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card py-5" role="contentinfo">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Smog</p>
          <nav aria-label="Footer navigation" className="flex items-center gap-2 md:gap-3">
            <Link
              href="https://beautified.app/imprint"
              className="rounded-sm py-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              target="_blank"
              rel="noopener noreferrer"
            >
              Imprint
            </Link>
            <span className="inline" aria-hidden="true">•</span>
            <Link
              href="https://beautified.app/privacy"
              className="rounded-sm py-1 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data Privacy
            </Link>
            <span className="inline" aria-hidden="true">•</span>
            <CookieSettingsButton />
          </nav>
        </div>
      </div>
    </footer>
  );
}

