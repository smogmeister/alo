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

export function RegionSelector({
  value,
  onValueChange,
  size = "compact",
}: RegionSelectorProps) {
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

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className={triggerClasses}>
        <SelectValue placeholder="Select region">
          <span className="flex items-center gap-1.5">
            <span>{REGION_FLAGS[value]}</span>
            <span className={labelClasses}>{REGION_DISPLAY_NAMES[value]}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {REGIONS.map((region) => (
          <SelectItem key={region} value={region}>
            <span className="flex items-center gap-1.5">
              <span>{REGION_FLAGS[region]}</span>
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

