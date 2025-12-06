// Client-side Google Analytics helpers
// Safe no-op if gtag is not available (e.g. during SSR or before script load)

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type GAEventParams = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: string | number | undefined;
};

export function trackEvent({
  action,
  category,
  label,
  value,
  ...rest
}: GAEventParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    ...rest,
  });
}



