"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "my-theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

// The head script sets data-theme before paint; the server can't know it.
const getServerSnapshot = (): Theme => "light";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode) – theme still applies for the session */
    }
  }

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggle}
      className="relative inline-flex size-9 shrink-0 cursor-pointer items-center justify-center text-ink transition-colors duration-300 hover:text-signal focus-visible:text-signal"
    >
      {/* Sun in light mode (click → dark). Moon in dark mode (click → light). */}
      <Sun
        aria-hidden
        className={
          "size-[18px] transition-[opacity,transform] duration-300 " +
          (isDark
            ? "absolute scale-75 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100")
        }
      />
      <Moon
        aria-hidden
        className={
          "size-[18px] transition-[opacity,transform] duration-300 " +
          (isDark
            ? "scale-100 rotate-0 opacity-100"
            : "absolute -rotate-90 scale-75 opacity-0")
        }
      />
    </button>
  );
}
