"use client";

import * as React from "react";
import { Card as CardComponent } from "./card";
import { CardSkeleton } from "./card-skeleton";
import { CountrySelect } from "./country-tabs";
import { useCountry } from "@/contexts/country-context";
import { Card } from "@/types/cards";

interface CardGridProps {
  cards: Card[];
}

export function CardGrid({ cards }: CardGridProps) {
  const { country, isLoading } = useCountry();

  // Filter cards that have a link for the current country
  const filteredCards = cards.filter((card) => card.links[country]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <CountrySelect />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (filteredCards.length === 0) {
    return (
      <div className="space-y-4">
        <CountrySelect />
        <div className="text-center py-12 text-muted-foreground">
          <p>No products available for this region.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CountrySelect />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {filteredCards.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            country={country}
          />
        ))}
      </div>
    </div>
  );
}

