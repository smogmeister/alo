"use client";

import * as React from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCountry } from "@/contexts/country-context";
import { CountryCode } from "@/types/cards";

interface CountryInfo {
  code: CountryCode;
  name: string;
  flagUrl: string;
}

const COUNTRIES: CountryInfo[] = [
  { code: "usa", name: "USA", flagUrl: "https://flagcdn.com/w40/us.png" },
  { code: "canada", name: "Canada", flagUrl: "https://flagcdn.com/w40/ca.png" },
  { code: "germany", name: "Germany", flagUrl: "https://flagcdn.com/w40/de.png" },
  { code: "uk", name: "UK", flagUrl: "https://flagcdn.com/w40/gb.png" },
];

export function CountryTabs() {
  const { country, setCountry, isLoading } = useCountry();

  return (
    <Tabs
      value={country}
      onValueChange={(value) => setCountry(value as CountryCode)}
      className="w-full"
    >
      <TabsList className={`w-full justify-start gap-1 ${isLoading ? "opacity-50" : ""}`}>
        {COUNTRIES.map((c) => (
          <TabsTrigger
            key={c.code}
            value={c.code}
            className="flex items-center gap-1.5 px-3"
            disabled={isLoading}
          >
            <Image
              src={c.flagUrl}
              alt={`${c.name} flag`}
              width={20}
              height={15}
              className="rounded-[2px]"
              unoptimized
            />
            <span>{c.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
