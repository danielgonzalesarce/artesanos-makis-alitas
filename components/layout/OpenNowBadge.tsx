"use client";

import { useSyncExternalStore } from "react";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

let clientCache: OpenStatus | null = null;

function getClientSnapshot(): OpenStatus {
  const next = getOpenStatus();
  if (
    clientCache &&
    clientCache.open === next.open &&
    clientCache.label === next.label
  ) {
    return clientCache;
  }
  clientCache = next;
  return next;
}

const serverSnapshot: OpenStatus = { open: false, label: "…" };

function getServerSnapshot(): OpenStatus {
  return serverSnapshot;
}

export function OpenNowBadge({ className = "" }: { className?: string }) {
  const status = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const pending = status.label === "…";

  if (pending) {
    return (
      <span
        className={`inline-flex min-h-8 items-center rounded-full bg-white/10 px-3 text-xs text-cream/60 ${className}`}
        aria-hidden="true"
      >
        …
      </span>
    );
  }

  return (
    <span
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold ${
        status.open ? "bg-orange text-ink" : "bg-white/10 text-cream/80"
      } ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${status.open ? "bg-ink" : "bg-cream/50"}`}
        aria-hidden="true"
      />
      {status.label}
    </span>
  );
}
