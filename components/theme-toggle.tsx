"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const ORDER = ["system", "light", "dark"] as const;
type ThemeChoice = (typeof ORDER)[number];

const META: Record<ThemeChoice, { icon: typeof Sun; label: string }> = {
  system: { icon: Monitor, label: "System" },
  light: { icon: Sun, label: "Light" },
  dark: { icon: Moon, label: "Dark" },
};

const noopSubscribe = () => () => {};

/** Cycles System → Light → Dark. Crossfades via the View Transitions API when available. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  // false during SSR/hydration, true afterwards (theme is only known on the client)
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const current: ThemeChoice = mounted && ORDER.includes(theme as ThemeChoice)
    ? (theme as ThemeChoice)
    : "system";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const Icon = META[current].icon;

  const handleClick = () => {
    const apply = () => setTheme(next);
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => unknown;
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (doc.startViewTransition && !reduce) doc.startViewTransition(apply);
    else apply();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Theme: ${META[current].label}. Switch to ${META[next].label}`}
      className={cn(
        "group/toggle inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 ease-quiet hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 transition-[transform,opacity] duration-300 ease-quiet group-hover/toggle:rotate-[15deg]",
          !mounted && "opacity-0"
        )}
        aria-hidden="true"
      />
    </button>
  );
}
