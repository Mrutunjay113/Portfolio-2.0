"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

const getSnapshot = () =>
  new Date().toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
  });

const getServerSnapshot = () => "--:--";

/** Live IST clock. Renders a placeholder on the server to avoid hydration mismatch. */
export function SiteClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <span className="mono">
      <span className="text-mute">Mumbai</span> <span suppressHydrationWarning>{time}</span>
    </span>
  );
}
