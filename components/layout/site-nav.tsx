"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/portfolio-data";
import { ResumeButton } from "@/components/ui/resume-button";
import { SiteClock } from "./site-clock";
import { ThemeToggle } from "./theme-toggle";

const SCROLL_THRESHOLD = 16;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    update();
    // Lenis still drives the document scroll, so the window scroll event is enough.
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <nav
      aria-label="Primary"
      data-scrolled={scrolled || undefined}
      className={cn(
        "sticky top-0 z-20 flex items-center justify-between px-(--pad) py-[18px] transition-[background-color,backdrop-filter,border-color] duration-300",
        scrolled
          ? "bg-background shadow-2xs"
          : "border-transparent bg-transparent",
      )}
    >
      <a href="#top" className="mono">
        MY<span className="text-mute">/</span>Portfolio
      </a>

      <ul className="mono hidden gap-7 md:flex">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="ulink hover:text-signal">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3 md:gap-5">
        {/* Mobile: resume download. Desktop: Mumbai clock. */}
        <ResumeButton variant="nav" className="md:hidden" />
        <div className="hidden md:block">
          <SiteClock />
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
