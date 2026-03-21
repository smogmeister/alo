"use client";

import { useEffect } from "react";
import { CountryCode } from "@/types/cards";
import { useCountry } from "@/contexts/country-context";

const SESSION_STORAGE_KEY = "selected-country";

// European country codes that map to Germany tab
const EUROPEAN_COUNTRIES = [
  "DE", "AT", "CH", "FR", "IT", "ES", "NL", "BE", "PL", 
  "SE", "NO", "DK", "FI", "PT", "IE", "CZ", "GR", "HU", "RO"
];

interface IpWhoIsResponse {
  success: boolean;
  country_code: string;
}

function mapCountryCodeToTab(countryCode: string): CountryCode {
  switch (countryCode) {
    case "US":
      return "usa";
    case "CA":
      return "canada";
    case "GB":
      return "uk";
    default:
      if (EUROPEAN_COUNTRIES.includes(countryCode)) {
        return "germany";
      }
      // Default to USA for all other countries
      return "usa";
  }
}

export function useGeoLocation() {
  const { setCountry, setIsLoading } = useCountry();

  useEffect(() => {
    // Check if country was already set in session
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      setIsLoading(false);
      return;
    }

    async function detectCountry() {
      try {
        // Using ipwhois.app - free HTTPS API with no key required
        const response = await fetch("https://ipwho.is/?fields=success,country_code");
        const data: IpWhoIsResponse = await response.json();
        
        if (data.success) {
          const mappedCountry = mapCountryCodeToTab(data.country_code);
          setCountry(mappedCountry);
          console.log(`IP detected country: ${data.country_code} -> ${mappedCountry}`);
        }
      } catch (error) {
        // On error, default to USA (already set)
        console.error("Failed to detect country:", error);
      } finally {
        setIsLoading(false);
      }
    }

    detectCountry();
  }, [setCountry, setIsLoading]);
}
