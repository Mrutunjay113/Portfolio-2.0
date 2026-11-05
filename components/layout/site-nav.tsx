"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/portfolio-data";
import { ResumeButton } from "@/components/ui/resume-button";
import { SiteClock } from "./site-clock";
import { ThemeToggle } from "./theme-toggle";

const SCROLL_THRESHOLD = 16;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    update();
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
      {isHome ? (
        <a href="#top" className="mono">
          MY<span className="text-mute">/</span>Portfolio
        </a>
      ) : (
        <Link href="/" className="mono">
          MY<span className="text-mute">/</span>Portfolio
        </Link>
      )}

      <ul className="mono hidden gap-7 md:flex">
        {navLinks.map((link) => {
          const isRoute = link.href.startsWith("/");
          const href = isRoute || isHome ? link.href : `/${link.href}`;
          const active = isRoute && pathname === link.href;
          const className = cn(
            "ulink hover:text-signal",
            active && "text-signal",
          );

          return (
            <li key={link.href}>
              {isRoute ? (
                <Link href={href} className={className}>
                  {link.label}
                </Link>
              ) : (
                <a href={href} className={className}>
                  {link.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3 md:gap-5">
        <ResumeButton variant="nav" className="md:hidden" />
        <div className="hidden md:block">
          <SiteClock />
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
