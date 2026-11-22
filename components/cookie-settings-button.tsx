"use client";

import { useState } from "react";
import { CookiePreferencesDialog } from "@/components/cookie-preferences-dialog";

export function CookieSettingsButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        Cookies
      </button>
      <CookiePreferencesDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
