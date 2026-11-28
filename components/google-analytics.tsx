"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import { CONSENT_EVENT, readPreferences } from "@/lib/consent";

const GA_ID = "G-RY7BWXYRMZ";

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange); // choice made in another tab
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Loads Google Analytics only after the visitor allowed analytics cookies. */
export function GoogleAnalytics() {
  const allowed = useSyncExternalStore(
    subscribe,
    () => readPreferences().analytics,
    () => false
  );

  // Consent withdrawn after GA loaded: Google's documented opt-out flag stops
  // further hits for the rest of this page view.
  useEffect(() => {
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !allowed;
  }, [allowed]);

  if (!allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
