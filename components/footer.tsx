"use client";

import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { RegionSelector } from "@/components/region-selector";
import { useRegion } from "@/components/region-client-wrapper";
import type { Region } from "@/types/regions";

const EUROPEAN_COUNTRIES: Region[] = ["UK", "Germany", "France"];

export function Footer() {
  const { currentRegion, setCurrentRegion } = useRegion();
  const isEuropean = EUROPEAN_COUNTRIES.includes(currentRegion);

  return (
    <footer className="border-t pt-2 pb-1">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
            <RegionSelector
              value={currentRegion}
              onValueChange={setCurrentRegion}
              size="compact"
            />
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="https://beautified.app/imprint"
              className="hover:text-foreground transition-colors"
            >
              Imprint
            </Link>
            <span className="inline">•</span>
            <Link
              href="https://beautified.app/privacy"
              className="hover:text-foreground transition-colors"
            >
              Data Privacy
            </Link>
            {isEuropean && (
              <>
                <span className="inline">•</span>
                <CookieSettingsButton />
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

