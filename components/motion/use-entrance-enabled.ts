"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// SSR and hydration stay on the visible tree. Opacity 0 is applied only after
// the client confirms that motion is allowed, so reduced motion cannot leave
// content stuck invisible.
function serverPrefersReducedMotion(): boolean {
  return true;
}

export function useEntranceEnabled(): boolean {
  const reduced = useSyncExternalStore(
    subscribe,
    prefersReducedMotion,
    serverPrefersReducedMotion,
  );

  return !reduced;
}
