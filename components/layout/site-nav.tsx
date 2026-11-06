"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/portfolio-data";
import { ResumeButton } from "@/components/ui/resume-button";
import { SiteClock } from "./site-clock";
import { ThemeToggle } from "./theme-toggle";

const SCROLL_THRESHOLD = 16;

function BrandLogo() {
  return (
    <>
      <Image
        src="/nav-logo-dark.png"
        alt="MY Portfolio"
        width={54}
        height={36}
        priority
        className="h-9 w-auto dark:hidden"
      />
      <Image
        src="/nav-logo.png"
        alt=""
        width={54}
        height={36}
        priority
        aria-hidden
        className="hidden h-9 w-auto dark:block"
      />
    </>
  );
}

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
        <a href="#top" aria-label="MY Portfolio home">
          <BrandLogo />
        </a>
      ) : (
        <Link href="/" aria-label="MY Portfolio home">
          <BrandLogo />
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
