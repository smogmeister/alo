"use client";

import {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
  type ReactNode,
} from "react";
import { RegionSelector, getStoredRegion } from "./region-selector";
import { CardGrid } from "./card-grid";
import { getCardsForRegion } from "@/lib/cards";
import { Region } from "@/types/regions";
import { normalizeRegion } from "@/lib/region-utils";

type RegionContextValue = {
  currentRegion: Region;
  setCurrentRegion: (region: Region) => void;
};

const RegionContext = createContext<RegionContextValue | null>(null);

interface RegionProviderProps {
  initialRegion: Region;
  children: ReactNode;
}

export function RegionProvider({ initialRegion, children }: RegionProviderProps) {
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

  const value = useMemo(
    () => ({ currentRegion, setCurrentRegion }),
    [currentRegion]
  );

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return ctx;
}

export function useRegionOptional() {
  return useContext(RegionContext);
}

interface RegionClientWrapperProps {
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
  showCards = false,
  children,
}: RegionClientWrapperProps) {
  const { currentRegion, setCurrentRegion } = useRegion();

  const cards = useMemo(() => getCardsForRegion(currentRegion), [currentRegion]);

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

