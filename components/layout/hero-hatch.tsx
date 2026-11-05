"use client";

import { usePathname } from "next/navigation";

/**
 * Full-viewport-width diagonal hatch behind the sticky nav + hero.
 * Breaks out of the centered max-width shell via w-screen + centered translate.
 * A soft cloudy fog at the bottom dissolves the pattern into the page background
 * (mask-composite fades were too abrupt / inconsistent across browsers).
 * Animated via [data-hero-hatch] in page-animations.tsx.
 */
export function HeroHatch() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div
      aria-hidden
      data-hero-hatch
      className="pointer-events-none absolute top-0 left-1/2 z-0 h-[110svh] w-screen -translate-x-1/2 overflow-hidden"
    >
      <div className="hero-hatch absolute inset-0" />

      {/* Layered fog — long gradient + blurred cloud blobs for a soft dissolve. */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-b from-transparent via-background/55 to-background" />
      <div className="absolute -bottom-[18%] left-[-10%] h-[48%] w-[70%] rounded-[100%] bg-background/75 blur-3xl" />
      <div className="absolute -bottom-[22%] right-[-8%] h-[52%] w-[65%] rounded-[100%] bg-background/70 blur-3xl" />
      <div className="absolute -bottom-[12%] left-1/2 h-[40%] w-[90%] -translate-x-1/2 rounded-[100%] bg-background/80 blur-[48px]" />
    </div>
  );
}
