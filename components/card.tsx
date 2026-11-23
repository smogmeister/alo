"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { Card as CardType } from "@/types/cards";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface CardProps {
  card: CardType;
  /** Position in the grid; the first row loads eagerly for a faster LCP. */
  index?: number;
  variant?: "default" | "hero";
}

const EAGER_COUNT = 5;

export function Card({ card, index = 0, variant = "default" }: CardProps) {
  const isEager = index < EAGER_COUNT;
  const [imageError, setImageError] = useState(false);
  // Above-the-fold images render visible from the server HTML so they count
  // for LCP straight away; only lazy images below the fold fade in on load.
  const [imageLoading, setImageLoading] = useState(!isEager);

  const link = card.links.usa;
  const title = card.title.trim();
  const isHero = variant === "hero";
  const displayIndex = String(index + 1).padStart(2, "0");

  if (!link) return null;

  const handleClick = () => {
    trackEvent({
      action: "card_click",
      category: "engagement",
      label: title,
      card_id: card.id,
      card_title: title,
      url: link,
      country: "usa",
    });
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={handleClick}
      aria-label={`${title}: view on Amazon (opens in a new tab)`}
      className="group flex h-full flex-col focus-visible:outline-none"
    >
      {/* Image well */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl bg-well",
          "[transition:background-color_var(--dur-base)_var(--ease),scale_120ms_var(--ease)]",
          "group-hover:bg-well-hover group-active:scale-[0.99]",
          "outline-offset-[3px] group-focus-visible:outline-2 group-focus-visible:outline-solid group-focus-visible:outline-ring",
          "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-inset after:ring-hairline",
          isHero ? "aspect-[4/3] md:aspect-auto md:min-h-0 md:flex-1" : "aspect-[4/5]"
        )}
      >
        {!imageError ? (
          <>
            {imageLoading && (
              <div className="animate-shimmer absolute inset-0" aria-hidden="true" />
            )}
            <Image
              src={card.image}
              alt={title}
              fill
              quality={90}
              className={cn(
                "object-contain mix-blend-multiply",
                isHero ? "p-[10%]" : "p-[12%]",
                "[transition:opacity_var(--dur-base)_var(--ease),scale_var(--dur-base)_var(--ease)] group-hover:scale-[1.025]",
                imageLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              sizes={
                isHero
                  ? "(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 520px"
                  : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 250px"
              }
              loading={isEager ? "eager" : "lazy"}
              fetchPriority={index < 2 ? "high" : undefined}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <ImageOff className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
            <span className="sr-only">Image unavailable</span>
          </div>
        )}
      </div>

      {/* Meta row */}
      <div className="mt-3 flex items-center justify-between text-xs tabular-nums text-muted-foreground">
        <span>{displayIndex}</span>
        <span
          className="opacity-0 transition-opacity duration-300 ease-quiet group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
          aria-hidden="true"
        >
          Amazon{" "}
          <span className="inline-block transition-transform duration-300 ease-quiet group-hover:translate-x-px group-hover:-translate-y-px">
            ↗
          </span>
        </span>
      </div>

      <h3
        className={cn(
          "font-medium text-balance",
          isHero
            ? "mt-1 text-xl leading-snug tracking-normal"
            : "mt-1 line-clamp-2 min-h-[2.7em] text-[15px] leading-[1.35] tracking-normal"
        )}
      >
        {title}
      </h3>
    </a>
  );
}
