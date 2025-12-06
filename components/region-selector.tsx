"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Region, REGIONS, REGION_DISPLAY_NAMES } from "@/types/regions";
import { useIsMobile } from "@/hooks/use-mobile";

type RegionSelectorSize = "default" | "compact";

interface RegionSelectorProps {
  value: Region;
  onValueChange: (region: Region) => void;
  /**
   * default = normal form-factor (used in main header)
   * compact = smaller control (used in footer)
   */
  size?: RegionSelectorSize;
}

const REGION_STORAGE_KEY = "region-preference";

const REGION_FLAGS: Record<Region, string> = {
  USA: "🇺🇸",
  Canada: "🇨🇦",
  UK: "🇬🇧",
  Germany: "🇩🇪",
  France: "🇫🇷",
};

// Mapping from Region to ISO 3166-1 alpha-2 country codes for flag-icons
const REGION_COUNTRY_CODES: Record<Region, string> = {
  USA: "us",
  Canada: "ca",
  UK: "gb",
  Germany: "de",
  France: "fr",
};

export function RegionSelector({
  value,
  onValueChange,
  size = "compact",
}: RegionSelectorProps) {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (newRegion: string) => {
    const region = newRegion as Region;
    onValueChange(region);
    
    // Persist to localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(REGION_STORAGE_KEY, region);
      } catch (error) {
        console.error("Error storing region preference:", error);
      }
    }
  };

  const triggerClasses =
    size === "default"
      ? "inline-flex h-9 w-auto text-sm"
      : "inline-flex h-7 w-auto max-w-full text-xs";

  const labelClasses =
    size === "default" ? "hidden sm:inline" : undefined;

  // Render flag icon or emoji based on device type
  // Default to emoji until client-side hydration is complete to avoid flash
  const renderFlag = (region: Region) => {
    if (!isClient || isMobile) {
      // On mobile or during SSR/initial render, use emoji flags
      return <span>{REGION_FLAGS[region]}</span>;
    }
    // On desktop, use flag-icons CSS classes
    const countryCode = REGION_COUNTRY_CODES[region];
    return (
      <span
        className={`fi fi-${countryCode}`}
        style={{ fontSize: "1em", width: "1.2em", height: "0.9em", display: "inline-block" }}
        aria-label={REGION_DISPLAY_NAMES[region]}
      />
    );
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className={triggerClasses}>
        <SelectValue placeholder="Select region">
          <span className="flex items-center gap-1.5">
            {renderFlag(value)}
            <span className={labelClasses}>{REGION_DISPLAY_NAMES[value]}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {REGIONS.map((region) => (
          <SelectItem key={region} value={region}>
            <span className="flex items-center gap-1.5">
              {renderFlag(region)}
              <span>{REGION_DISPLAY_NAMES[region]}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/**
 * Gets stored region preference from localStorage (client-side only)
 */
export function getStoredRegion(): Region | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(REGION_STORAGE_KEY);
    if (stored && REGIONS.includes(stored as Region)) {
      return stored as Region;
    }
  } catch (error) {
    console.error("Error reading region from localStorage:", error);
  }
  return null;
}

