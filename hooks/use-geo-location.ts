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

interface IpApiResponse {
  status: string;
  countryCode: string;
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
        const response = await fetch("http://ip-api.com/json/?fields=status,countryCode");
        const data: IpApiResponse = await response.json();
        
        if (data.status === "success") {
          const mappedCountry = mapCountryCodeToTab(data.countryCode);
          setCountry(mappedCountry);
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
