"use client";

import * as React from "react";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CountryCode } from "@/types/cards";

const SESSION_STORAGE_KEY = "selected-country";

interface CountryContextType {
  country: CountryCode;
  setCountry: (country: CountryCode) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

interface CountryProviderProps {
  children: React.ReactNode;
  defaultCountry?: CountryCode;
}

export function CountryProvider({ children, defaultCountry = "usa" }: CountryProviderProps) {
  const [country, setCountryState] = useState<CountryCode>(defaultCountry);
  const [isLoading, setIsLoading] = useState(true);

  // Load from session storage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored && isValidCountryCode(stored)) {
      setCountryState(stored as CountryCode);
    }
  }, []);

  const setCountry = useCallback((newCountry: CountryCode) => {
    setCountryState(newCountry);
    sessionStorage.setItem(SESSION_STORAGE_KEY, newCountry);
  }, []);

  return (
    <CountryContext.Provider value={{ country, setCountry, isLoading, setIsLoading }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
}

function isValidCountryCode(value: string): value is CountryCode {
  return ["usa", "canada", "germany", "uk"].includes(value);
}
