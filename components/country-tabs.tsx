"use client";

import * as React from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function CountrySelect() {
  const { country, setCountry, isLoading } = useCountry();

  const selectedCountry = COUNTRIES.find((c) => c.code === country);

  return (
    <Select
      value={country}
      onValueChange={(value) => setCountry(value as CountryCode)}
      disabled={isLoading}
    >
      <SelectTrigger className={`w-[160px] ${isLoading ? "opacity-50" : ""}`}>
        <SelectValue>
          {selectedCountry && (
            <span className="flex items-center gap-2">
              <Image
                src={selectedCountry.flagUrl}
                alt={`${selectedCountry.name} flag`}
                width={20}
                height={15}
                className="rounded-[2px]"
                unoptimized
              />
              <span>{selectedCountry.name}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {COUNTRIES.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            <span className="flex items-center gap-2">
              <Image
                src={c.flagUrl}
                alt={`${c.name} flag`}
                width={20}
                height={15}
                className="rounded-[2px]"
                unoptimized
              />
              <span>{c.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
