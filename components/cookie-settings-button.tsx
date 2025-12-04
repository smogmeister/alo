"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { CookiePreferences } from "./cookie-banner";

const COOKIE_PREFERENCES_KEY = "cookie-preferences";

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export function CookieSettingsButton() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPreferences) {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      }
    } catch (error) {
      console.error("Error loading cookie preferences:", error);
    }
  }, [isSettingsOpen]);

  const savePreferences = (newPreferences: CookiePreferences) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
      setIsSettingsOpen(false);
      
      // Here you would typically trigger cookie loading based on preferences
      // For example: loadAnalyticsCookies(newPreferences.analytics);
    } catch (error) {
      console.error("Error saving cookie preferences:", error);
    }
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Cannot disable necessary cookies
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSettingsOpen(true)}
        className="h-6 w-6"
        aria-label="Cookie Settings"
      >
        <Settings className="h-3 w-3 text-primary" />
      </Button>

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
                    preferences.functional
                      ? "bg-primary"
                      : "bg-muted"
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
                    preferences.analytics
                      ? "bg-primary"
                      : "bg-muted"
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
                    preferences.marketing
                      ? "bg-primary"
                      : "bg-muted"
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
              className="text-xs"
            >
              Reset to Default
            </Button>
            <Button onClick={handleSavePreferences} className="text-xs">
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

