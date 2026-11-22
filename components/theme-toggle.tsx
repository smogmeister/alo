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

/** Cycles System → Light → Dark. System (follow the OS) is the default. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  // false during SSR/hydration, true afterwards (theme is only known on the client)
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const current: ThemeChoice = mounted && ORDER.includes(theme as ThemeChoice)
    ? (theme as ThemeChoice)
    : "system";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const Icon = META[current].icon;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${META[current].label}. Switch to ${META[next].label}`}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 ease-quiet hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <Icon
        className={cn("h-[18px] w-[18px]", !mounted && "opacity-0")}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </button>
  );
}
