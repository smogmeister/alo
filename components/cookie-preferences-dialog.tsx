"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  type CookiePreferences,
  NECESSARY_ONLY,
  PREFERENCE_OPTIONS,
  readPreferences,
  savePreferences,
} from "@/lib/consent";
import { cn } from "@/lib/utils";

function PreferenceRow({
  id,
  title,
  description,
  checked,
  locked,
  onToggle,
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onToggle: () => void;
}) {
  const labelId = `cookie-pref-${id}`;
  return (
    <div className="flex items-start justify-between gap-6 py-3.5">
      <div>
        <p id={labelId} className="text-sm font-medium">
          {title}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        disabled={locked}
        onClick={onToggle}
        className={cn(
          // 44px hit area around a 20×36 track
          "relative mt-0.5 h-5 w-9 shrink-0 rounded-full before:absolute before:-inset-3 before:content-[''] transition-colors duration-150 ease-quiet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-foreground" : "bg-border"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-background transition-transform duration-150 ease-quiet",
            checked && "translate-x-4"
          )}
        />
      </button>
    </div>
  );
}

function DialogBody({ onDone }: { onDone: () => void }) {
  // Mounted only while the dialog is open, so this reads fresh storage each time.
  const [prefs, setPrefs] = useState<CookiePreferences>(() => readPreferences());

  const save = (next: CookiePreferences) => {
    savePreferences(next);
    onDone();
  };

  return (
    <DialogContent className="max-w-[calc(100vw-1.5rem)] gap-0 rounded-2xl border-border bg-card p-6 shadow-none sm:max-w-sm">
      <DialogHeader className="text-left">
        <DialogTitle className="text-base font-semibold">Cookie preferences</DialogTitle>
        <DialogDescription className="text-xs">
          Choose which cookies this site may use.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-3 divide-y divide-border">
        {PREFERENCE_OPTIONS.map((option) => (
          <PreferenceRow
            key={option.key}
            id={option.key}
            title={option.title}
            description={option.description}
            locked={option.locked}
            checked={prefs[option.key]}
            onToggle={() =>
              setPrefs((p) =>
                option.locked ? p : { ...p, [option.key]: !p[option.key] }
              )
            }
          />
        ))}
      </div>

      <DialogFooter className="mt-5 flex-row gap-2 sm:space-x-0">
        <Button
          variant="ghost"
          size="sm"
          className="h-11 flex-1"
          onClick={() => save(NECESSARY_ONLY)}
        >
          Decline all
        </Button>
        <Button size="sm" className="h-11 flex-1" onClick={() => save(prefs)}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

interface CookiePreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CookiePreferencesDialog({
  open,
  onOpenChange,
}: CookiePreferencesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {open && (
        <DialogBody onDone={() => onOpenChange(false)} />
      )}
    </Dialog>
  );
}
