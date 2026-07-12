"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card as CardType, CountryCode } from "@/types/cards";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface CardProps {
  card: CardType;
  country: CountryCode;
}

export function Card({ card, country }: CardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const link = card.links[country];

  const handleClick = () => {
    trackEvent({
      action: "card_click",
      category: "engagement",
      label: card.title,
      card_id: card.id,
      card_title: card.title,
      url: link || "",
      country: country,
    });
  };

  // Don't render if no link for this country
  if (!link) {
    return null;
  }

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      aria-label={`View ${card.title} on Amazon`}
      title={card.title}
      className="group block mb-3"
    >
      <div className="cursor-pointer h-full flex flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-white">
          {card.id === "card-1" && (
            <div className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 rounded-full bg-primary/90 text-primary-foreground border border-primary px-2 py-0.5 text-[10px] font-medium">
              <Star className="h-3 w-3 text-primary-foreground" />
              <span>Favourite</span>
            </div>
          )}
          {!imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
              )}
              <Image
                src={card.image}
                alt={`${card.title} - Recommended by Smog`}
                fill
                className={`object-cover rounded-lg ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground rounded-lg">
              <span className="text-sm">Image unavailable</span>
            </div>
          )}
        </div>
        <h3 className="font-sans font-semibold text-[16px] leading-snug line-clamp-2 text-left pl-1 group-hover:underline">
          {card.title}
        </h3>
      </div>
    </Link>
  );
}

