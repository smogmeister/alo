"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card as UICard } from "@/components/ui/card";
import { RegionCardContent } from "@/types/cards";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface CardProps {
  content: RegionCardContent;
  id: string;
  region?: string;
}

export function Card({ content, id, region }: CardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleClick = () => {
    trackEvent({
      action: "card_click",
      category: "engagement",
      label: content.title,
      card_id: id,
      card_title: content.title,
      region,
      url: content.link,
    });
  };

  return (
    <Link
      href={content.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      <UICard className="group overflow-hidden transition-transform card-elevated hover:scale-[1.01] cursor-pointer h-full flex flex-col">
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          {!imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <Image
                src={content.image}
                alt={content.title}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
              <span className="text-sm">Image unavailable</span>
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex items-center">
          <h3 className="font-sans font-semibold text-xs line-clamp-2 md:text-base">
            {content.title}
          </h3>
        </div>
      </UICard>
    </Link>
  );
}

