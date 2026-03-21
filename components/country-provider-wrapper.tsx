"use client";

import * as React from "react";
import { CountryProvider } from "@/contexts/country-context";
import { useGeoLocation } from "@/hooks/use-geo-location";

function GeoLocationInitializer({ children }: { children: React.ReactNode }) {
  useGeoLocation();
  return <>{children}</>;
}

interface CountryProviderWrapperProps {
  children: React.ReactNode;
}

export function CountryProviderWrapper({ children }: CountryProviderWrapperProps) {
  return (
    <CountryProvider>
      <GeoLocationInitializer>
        {children}
      </GeoLocationInitializer>
    </CountryProvider>
  );
}
