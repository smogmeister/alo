"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, ImageOff, Star } from "lucide-react";
import { Card as CardType } from "@/types/cards";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface CardProps {
  card: CardType;
  /** Position in the grid; the first row loads eagerly for a faster LCP. */
  index?: number;
}

const EAGER_COUNT = 4;

export function Card({ card, index = 0 }: CardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const link = card.links.usa;
  const title = card.title.trim();

  const handleClick = () => {
    trackEvent({
      action: "card_click",
      category: "engagement",
      label: title,
      card_id: card.id,
      card_title: title,
      url: link || "",
      country: "usa",
    });
  };

  // Don't render if no link for this country
  if (!link) {
    return null;
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      aria-label={`${title}: view on Amazon (opens in a new tab)`}
      className="group flex h-full flex-col rounded-2xl bg-card p-1.5 ring-1 ring-border transition-all duration-300 ease-out hover:-translate-y-1 hover:ring-[oklch(0.82_0.04_55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-2"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
        {card.featured && (
          <div className="absolute left-2 top-2 z-10 inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-[11px] font-semibold text-background">
            <Star className="h-3 w-3 fill-current text-[oklch(0.85_0.12_75)]" aria-hidden="true" />
            <span>Favourite</span>
          </div>
        )}

        {!imageError ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden="true" />
            )}
            <Image
              src={card.image}
              alt={`${title} - Recommended by Smog`}
              fill
              className={cn(
                "object-contain p-3 transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:p-4",
                imageLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 280px"
              loading={index < EAGER_COUNT ? "eager" : "lazy"}
              fetchPriority={index < 2 ? "high" : undefined}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
            <ImageOff className="h-6 w-6" aria-hidden="true" />
            <span className="text-xs">Image unavailable</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 items-end justify-between gap-2 px-1.5 pb-1.5 pt-3 md:px-2">
        <div className="min-w-0">
          <h3 className="line-clamp-2 font-sans text-[15px] font-semibold leading-snug md:text-base">
            {title}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">View on Amazon</p>
        </div>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
          aria-hidden="true"
        >
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
        </span>
      </div>
    </a>
  );
}
