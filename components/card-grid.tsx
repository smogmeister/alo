"use client";

import * as React from "react";
import { Card as CardComponent } from "./card";
import { CardSkeleton } from "./card-skeleton";
import { Card } from "@/types/cards";

interface CardGridProps {
  cards: Card[];
  loading?: boolean;
}

export function CardGrid({ cards, loading = false }: CardGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No cards available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
      {cards.map((card) => (
        <CardComponent
          key={card.id}
          card={card}
        />
      ))}
    </div>
  );
}

