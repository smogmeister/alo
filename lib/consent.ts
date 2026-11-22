// Cookie consent storage. Keys are unchanged from the previous version so
// visitors' existing choices survive the redesign.

export const COOKIE_CONSENT_KEY = "cookie-consent";
export const COOKIE_PREFERENCES_KEY = "cookie-preferences";

export type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const NECESSARY_ONLY: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export const ALL_ACCEPTED: CookiePreferences = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: true,
};

export const PREFERENCE_OPTIONS: {
  key: keyof CookiePreferences;
  title: string;
  description: string;
  locked?: boolean;
}[] = [
  {
    key: "necessary",
    title: "Necessary",
    description: "Required for the site to work. Always on.",
    locked: true,
  },
  {
    key: "functional",
    title: "Functional",
    description: "Remember choices such as your theme.",
  },
  {
    key: "analytics",
    title: "Analytics",
    description: "Help understand which picks are useful.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description: "Measure affiliate campaign performance.",
  },
];

export function readPreferences(): CookiePreferences {
  try {
    const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    return saved
      ? { ...NECESSARY_ONLY, ...JSON.parse(saved), necessary: true }
      : NECESSARY_ONLY;
  } catch {
    return NECESSARY_ONLY;
  }
}

export function hasConsentDecision(): boolean {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
  } catch {
    return false;
  }
}

export function savePreferences(prefs: CookiePreferences) {
  try {
    localStorage.setItem(
      COOKIE_PREFERENCES_KEY,
      JSON.stringify({ ...prefs, necessary: true })
    );
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
  } catch (error) {
    console.error("Error saving cookie preferences:", error);
  }
}
