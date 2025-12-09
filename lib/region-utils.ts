import { Region, DEFAULT_REGION } from "@/types/regions";

/**
 * Validates if a region string is a valid Region type
 */
export function isValidRegion(region: string): region is Region {
  return ["USA", "Canada", "UK", "Germany", "France"].includes(region);
}

/**
 * Normalizes region string to Region type, with fallback
 * Client-safe utility function
 */
export function normalizeRegion(region: string | null | undefined): Region {
  if (!region) return DEFAULT_REGION;
  return isValidRegion(region) ? region : DEFAULT_REGION;
}








