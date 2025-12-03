"use client";

import * as React from "react";
import { Card } from "./card";
import { CardSkeleton } from "./card-skeleton";
import { RegionCardContent } from "@/types/cards";
import { Region } from "@/types/regions";

interface CardGridProps {
  cards: Array<{
    id: string;
    content: RegionCardContent;
  }>;
  loading?: boolean;
  region?: Region;
}

export function CardGrid({ cards, loading = false, region }: CardGridProps) {
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
        <p>No cards available for this region.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
      {cards.map((card) => (
        <Card
          key={card.id}
          content={card.content}
          id={card.id}
          region={region}
        />
      ))}
    </div>
  );
}

