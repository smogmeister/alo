"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TopBarProps {
  name: string;
  image: string;
}

/**
 * Fixed 48px bar, invisible at the top of the page. Once the profile header
 * scrolls away it gains a translucent surface and the avatar + name fade in.
 */
export function TopBar({ name, image }: TopBarProps) {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const target = document.getElementById("profile");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCondensed(!entry.isIntersecting),
      { rootMargin: "-48px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-40 h-12 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ease-quiet",
        condensed
          ? "border-border bg-background/80 backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1040px] items-center justify-between px-5 md:px-8">
        <a
          href="#top"
          tabIndex={condensed ? 0 : -1}
          aria-hidden={!condensed}
          className={cn(
            "flex min-h-11 items-center gap-2.5 rounded-full pr-2 text-sm font-medium transition-opacity duration-300 ease-quiet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            condensed ? "pointer-events-auto opacity-100" : "opacity-0"
          )}
        >
          <span className="relative h-6 w-6 overflow-hidden rounded-full bg-muted">
            <Image src={image} alt="" fill sizes="24px" className="object-cover" />
          </span>
          {name}
        </a>
      </div>
    </div>
  );
}
