import "server-only";

import { Region, DEFAULT_REGION, COUNTRY_CODE_TO_REGION } from "@/types/regions";
import { headers } from "next/headers";

/**
 * Language code to region mapping for Accept-Language header
 */
const LANGUAGE_TO_REGION: Record<string, Region> = {
  de: "Germany",
  fr: "France",
  en: "USA", // Default English to USA, but could be improved with locale
};

/**
 * Gets client IP address from headers
 */
function getClientIP(headersList: Headers): string | null {
  // Try various headers that might contain the real IP
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  
  const realIP = headersList.get("x-real-ip");
  if (realIP) return realIP;
  
  const cfConnectingIP = headersList.get("cf-connecting-ip");
  if (cfConnectingIP) return cfConnectingIP;
  
  return null;
}

/**
 * Attempts to get country code from IP geolocation API (fallback)
 */
async function getCountryFromIP(ip: string): Promise<string | null> {
  try {
    // Using ip-api.com free tier (no API key needed, 45 req/min limit)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.countryCode || null;
  } catch (error) {
    console.error("Error fetching country from IP:", error);
    return null;
  }
}

/**
 * Detects region from request headers (server-side only)
 * Falls back to IP geolocation and then DEFAULT_REGION if detection fails
 */
export async function detectRegionFromHeaders(): Promise<Region> {
  try {
    const headersList = await headers();
    
    // Debug: Log available headers (only in development)
    if (process.env.NODE_ENV === "development") {
      console.log("Region Detection Debug:");
      console.log("  Cloudflare header:", headersList.get("cf-ipcountry"));
      console.log("  Vercel header:", headersList.get("x-vercel-ip-country"));
      console.log("  Accept-Language:", headersList.get("accept-language"));
      console.log("  X-Forwarded-For:", headersList.get("x-forwarded-for"));
    }
    
    // Check Cloudflare header (CF-IPCountry)
    const cloudflareCountry = headersList.get("cf-ipcountry");
    if (cloudflareCountry && cloudflareCountry !== "XX" && cloudflareCountry !== "T1") {
      const region = COUNTRY_CODE_TO_REGION[cloudflareCountry.toUpperCase()];
      if (region) {
        if (process.env.NODE_ENV === "development") {
          console.log("  → Detected from Cloudflare:", cloudflareCountry, "→", region);
        }
        return region;
      }
    }

    // Check Vercel header (x-vercel-ip-country)
    const vercelCountry = headersList.get("x-vercel-ip-country");
    if (vercelCountry) {
      const region = COUNTRY_CODE_TO_REGION[vercelCountry.toUpperCase()];
      if (region) {
        if (process.env.NODE_ENV === "development") {
          console.log("  → Detected from Vercel:", vercelCountry, "→", region);
        }
        return region;
      }
    }

    // Fallback 1: Try IP geolocation if we can get the IP
    const clientIP = getClientIP(headersList);
    if (clientIP) {
      // Skip localhost/private IPs
      if (!clientIP.startsWith("127.") && !clientIP.startsWith("192.168.") && !clientIP.startsWith("10.")) {
        try {
          const countryCode = await getCountryFromIP(clientIP);
          if (countryCode) {
            const region = COUNTRY_CODE_TO_REGION[countryCode.toUpperCase()];
            if (region) {
              if (process.env.NODE_ENV === "development") {
                console.log("  → Detected from IP geolocation:", countryCode, "→", region);
              }
              return region;
            }
          }
        } catch (error) {
          console.error("Error in IP geolocation fallback:", error);
        }
      }
    }

    // Fallback 2: Check Accept-Language header
    const acceptLanguage = headersList.get("accept-language");
    if (acceptLanguage) {
      const languages = acceptLanguage.toLowerCase().split(",");
      for (const lang of languages) {
        const langPart = lang.split(";")[0].trim();
        const langCode = langPart.split("-")[0];
        
        // Check for full locale (e.g., de-DE, fr-FR)
        if (langPart.includes("-")) {
          const localeParts = langPart.split("-");
          const countryCode = localeParts[1]?.toUpperCase();
          if (countryCode) {
            const region = COUNTRY_CODE_TO_REGION[countryCode];
            if (region) {
              if (process.env.NODE_ENV === "development") {
                console.log("  → Detected from Accept-Language locale:", langPart, "→", region);
              }
              return region;
            }
          }
        }
        
        // Fallback to language code mapping
        if (LANGUAGE_TO_REGION[langCode]) {
          const region = LANGUAGE_TO_REGION[langCode];
          if (process.env.NODE_ENV === "development") {
            console.log("  → Detected from Accept-Language:", langCode, "→", region);
          }
          return region;
        }
      }
    }
    
    if (process.env.NODE_ENV === "development") {
      console.log("  → No region detected, using DEFAULT_REGION:", DEFAULT_REGION);
    }
  } catch (error) {
    console.error("Error detecting region:", error);
  }

  return DEFAULT_REGION;
}

