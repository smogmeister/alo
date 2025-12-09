"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRegion } from "@/components/region-client-wrapper";
import type { Region } from "@/types/regions";

const COOKIE_CONSENT_KEY = "cookie-consent";
const COOKIE_PREFERENCES_KEY = "cookie-preferences";

export type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true, // Always enabled
  functional: false,
  analytics: false,
  marketing: false,
};

// European countries that require GDPR cookie consent
const EUROPEAN_COUNTRIES: Region[] = ["UK", "Germany", "France"];

export function CookieBanner() {
  const { currentRegion } = useRegion();
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const isMobile = useIsMobile();
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Only show banner for European countries
    if (!EUROPEAN_COUNTRIES.includes(currentRegion)) {
      return;
    }
    
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      
      if (savedPreferences) {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      }
      
      if (!consent) {
        setIsVisible(true);
      }
    } catch (error) {
      console.error("Error checking cookie consent:", error);
    }
  }, [currentRegion]);

  const savePreferences = (newPreferences: CookiePreferences) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences));
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
      setPreferences(newPreferences);
      setIsVisible(false);
      setIsSettingsOpen(false);
      
      // Here you would typically trigger cookie loading based on preferences
      // For example: loadAnalyticsCookies(newPreferences.analytics);
    } catch (error) {
      console.error("Error saving cookie preferences:", error);
    }
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };


  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Cannot disable necessary cookies
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0]?.clientY ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = e.touches[0]?.clientY - touchStartY.current;
    if (deltaY > 40) {
      setIsSettingsOpen(false);
      touchStartY.current = null;
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 w-[320px] max-w-[calc(100vw-2rem)] bg-background border rounded-lg shadow-lg p-3 space-y-2 animate-in slide-in-from-bottom-2 fade-in-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs text-muted-foreground leading-relaxed">
            We use cookies to enhance your experience.{" "}
            <Link 
              href="/privacy" 
              className="underline hover:text-primary transition-colors"
            >
              Learn more
            </Link>
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAcceptAll}
            className="h-10 w-10 shrink-0"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-primary" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            className="h-10 w-10 shrink-0"
            aria-label="Cookie Settings"
          >
            <Settings className="h-4 w-4 text-primary" />
          </Button>
          <Button
            size="sm"
            onClick={handleAcceptAll}
            className="text-xs h-10 px-4 flex-1"
          >
            Accept
          </Button>
        </div>
      </div>

      {isMobile ? (
        <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <SheetContent
            side="bottom"
            className="max-h-[90vh] overflow-y-auto p-0 rounded-t-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div className="flex justify-center pt-3 pb-1">
              <button
                type="button"
                aria-label="Close cookie settings"
                onClick={() => setIsSettingsOpen(false)}
                className="h-1.5 w-12 rounded-full bg-muted-foreground/40 hover:bg-muted-foreground/60 transition-colors"
              />
            </div>
            <SheetHeader className="px-4 pt-1 pb-2">
              <SheetTitle>Cookie Settings</SheetTitle>
              <SheetDescription>
                Manage your cookie preferences. You can enable or disable different types of cookies below.
              </SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-4 space-y-6">
              {/* Necessary Cookies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">Necessary Cookies</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Essential for the website to function properly. These cannot be disabled.
                    </p>
                  </div>
                  <div className="ml-4 shrink-0">
                    <div className="h-5 w-9 rounded-full bg-primary opacity-50 cursor-not-allowed flex items-center">
                      <div className="h-4 w-4 rounded-full bg-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">Functional Cookies</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enable enhanced functionality and personalization.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference("functional")}
                    className={`ml-4 shrink-0 h-5 w-9 rounded-full transition-colors ${
                      preferences.functional ? "bg-primary" : "bg-muted"
                    }`}
                    aria-label="Toggle functional cookies"
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        preferences.functional ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">Analytics Cookies</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference("analytics")}
                    className={`ml-4 shrink-0 h-5 w-9 rounded-full transition-colors ${
                      preferences.analytics ? "bg-primary" : "bg-muted"
                    }`}
                    aria-label="Toggle analytics cookies"
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        preferences.analytics ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">Marketing Cookies</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Used to deliver personalized advertisements and track campaign performance.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference("marketing")}
                    className={`ml-4 shrink-0 h-5 w-9 rounded-full transition-colors ${
                      preferences.marketing ? "bg-primary" : "bg-muted"
                    }`}
                    aria-label="Toggle marketing cookies"
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        preferences.marketing ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
            <SheetFooter className="gap-2 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setPreferences(DEFAULT_PREFERENCES);
                }}
                className="text-xs h-10"
              >
                Reset to Default
              </Button>
              <Button onClick={handleSavePreferences} className="text-xs h-10">
                Save Preferences
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cookie Settings</DialogTitle>
              <DialogDescription>
                Manage your cookie preferences. You can enable or disable different types of cookies below.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              {/* Necessary Cookies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">Necessary Cookies</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Essential for the website to function properly. These cannot be disabled.
                    </p>
                  </div>
                  <div className="ml-4 shrink-0">
                    <div className="h-5 w-9 rounded-full bg-primary opacity-50 cursor-not-allowed flex items-center">
                      <div className="h-4 w-4 rounded-full bg-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">Functional Cookies</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enable enhanced functionality and personalization.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference("functional")}
                    className={`ml-4 shrink-0 h-5 w-9 rounded-full transition-colors ${
                      preferences.functional ? "bg-primary" : "bg-muted"
                    }`}
                    aria-label="Toggle functional cookies"
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        preferences.functional ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">Analytics Cookies</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference("analytics")}
                    className={`ml-4 shrink-0 h-5 w-9 rounded-full transition-colors ${
                      preferences.analytics ? "bg-primary" : "bg-muted"
                    }`}
                    aria-label="Toggle analytics cookies"
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        preferences.analytics ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">Marketing Cookies</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Used to deliver personalized advertisements and track campaign performance.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference("marketing")}
                    className={`ml-4 shrink-0 h-5 w-9 rounded-full transition-colors ${
                      preferences.marketing ? "bg-primary" : "bg-muted"
                    }`}
                    aria-label="Toggle marketing cookies"
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        preferences.marketing ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setPreferences(DEFAULT_PREFERENCES);
                }}
                className="text-xs h-10"
              >
                Reset to Default
              </Button>
              <Button onClick={handleSavePreferences} className="text-xs h-10">
                Save Preferences
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
