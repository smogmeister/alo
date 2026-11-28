// Run with `npm test` (Node's built-in runner, no extra dependencies).
// Guards the one legal-risk rule on the site: analytics stays off unless the
// visitor explicitly allowed it.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ALL_ACCEPTED,
  CONSENT_EVENT,
  COOKIE_PREFERENCES_KEY,
  NECESSARY_ONLY,
  readPreferences,
  savePreferences,
} from "./consent.ts";

const store = new Map<string, string>();
Object.assign(globalThis, {
  localStorage: {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
  },
  window: new EventTarget(),
});

test("analytics is off when nothing was chosen", () => {
  store.clear();
  assert.equal(readPreferences().analytics, false);
});

test("analytics is off after declining", () => {
  store.clear();
  savePreferences(NECESSARY_ONLY);
  assert.equal(readPreferences().analytics, false);
});

test("analytics is on only after accepting", () => {
  store.clear();
  savePreferences(ALL_ACCEPTED);
  assert.equal(readPreferences().analytics, true);
});

test("broken stored data falls back to analytics off", () => {
  store.clear();
  store.set(COOKIE_PREFERENCES_KEY, "{not json");
  assert.equal(readPreferences().analytics, false);
});

test("saving announces the change so open components update", () => {
  store.clear();
  let fired = 0;
  (globalThis as unknown as { window: EventTarget }).window.addEventListener(
    CONSENT_EVENT,
    () => fired++
  );
  savePreferences(NECESSARY_ONLY);
  assert.equal(fired, 1);
});
