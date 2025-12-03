"use client";

import { useState, useEffect, useMemo, type ReactNode } from "react";
import { RegionSelector, getStoredRegion } from "./region-selector";
import { CardGrid } from "./card-grid";
import { getCardsForRegion } from "@/lib/cards";
import { Region } from "@/types/regions";
import { normalizeRegion } from "@/lib/region-utils";

interface RegionClientWrapperProps {
  initialRegion: Region;
  /**
   * When true, renders the cards for the current region under the children.
   */
  showCards?: boolean;
  /**
   * Optional children that will be rendered between the header selector
   * and the cards (e.g. the profile section).
   */
  children?: ReactNode;
}

export function RegionClientWrapper({
  initialRegion,
  showCards = false,
  children,
}: RegionClientWrapperProps) {
  const [currentRegion, setCurrentRegion] = useState<Region>(() => {
    // On initial load, check localStorage first, then use server-detected region
    if (typeof window !== "undefined") {
      const stored = getStoredRegion();
      if (stored) {
        return stored;
      }
    }
    return normalizeRegion(initialRegion);
  });

  // Sync with server-detected region on mount if no stored preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = getStoredRegion();
      if (!stored) {
        setCurrentRegion(normalizeRegion(initialRegion));
      }
    }
  }, [initialRegion]);

  const cards = useMemo(() => {
    return getCardsForRegion(currentRegion);
  }, [currentRegion]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <RegionSelector
          value={currentRegion}
          onValueChange={setCurrentRegion}
          size={showCards ? "default" : "compact"}
        />
      </div>

      {children}

      {showCards && <CardGrid cards={cards} region={currentRegion} />}
    </div>
  );
}

