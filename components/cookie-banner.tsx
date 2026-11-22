"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CookiePreferencesDialog } from "@/components/cookie-preferences-dialog";
import {
  ALL_ACCEPTED,
  NECESSARY_ONLY,
  hasConsentDecision,
  savePreferences,
} from "@/lib/consent";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // localStorage is client-only; decide after mount to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!hasConsentDecision()) setIsVisible(true);
  }, []);

  const decide = (accept: boolean) => {
    savePreferences(accept ? ALL_ACCEPTED : NECESSARY_ONLY);
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="animate-quiet-enter fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-border bg-card p-4 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[340px]"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs leading-relaxed text-muted-foreground">
              This site uses cookies for analytics and affiliate tracking.{" "}
              <a
                href="https://beautified.app/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="-my-3 inline-block min-w-11 py-3 text-center underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Privacy
              </a>
            </p>
            <button
              type="button"
              onClick={() => decide(false)}
              aria-label="Decline and close"
              className="-mt-3 -mr-3 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-11 px-3 text-xs text-muted-foreground"
              onClick={() => setIsSettingsOpen(true)}
            >
              Settings
            </Button>
            <div className="flex-1" />
            <Button
              variant="outline"
              size="sm"
              className="h-11 px-4 text-xs shadow-none"
              onClick={() => decide(false)}
            >
              Decline
            </Button>
            <Button size="sm" className="h-11 px-4 text-xs" onClick={() => decide(true)}>
              Accept
            </Button>
          </div>
        </div>
      )}

      <CookiePreferencesDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        onSaved={() => setIsVisible(false)}
      />
    </>
  );
}
