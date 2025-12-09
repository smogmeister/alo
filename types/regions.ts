export type Region = "USA" | "Canada" | "UK" | "Germany" | "France";

export const REGIONS: Region[] = ["USA", "Canada", "UK", "Germany", "France"];

export const REGION_DISPLAY_NAMES: Record<Region, string> = {
  USA: "United States",
  Canada: "Canada",
  UK: "United Kingdom",
  Germany: "Germany",
  France: "France",
};

export const DEFAULT_REGION: Region = "USA";

// Country code to region mapping for IP detection
export const COUNTRY_CODE_TO_REGION: Record<string, Region> = {
  US: "USA",
  CA: "Canada",
  GB: "UK",
  DE: "Germany",
  FR: "France",
};








