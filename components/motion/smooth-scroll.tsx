"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Duration (s) and easing for in-page anchor navigation. */
const ANCHOR_DURATION = 1.4;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Mounts a single Lenis instance and drives it from GSAP's ticker, following the
 * official Lenis + ScrollTrigger recipe:
 *  - lenis.on('scroll', ScrollTrigger.update)
 *  - gsap.ticker.add(time => lenis.raf(time * 1000))
 *  - gsap.ticker.lagSmoothing(0)
 *
 * In-page `#hash` links are handled here (instead of Lenis' `anchors` option) so the
 * browser's native instant jump is cancelled with preventDefault and Lenis alone
 * animates the scroll. The URL is deliberately left untouched: Next.js patches
 * history.pushState and would run its own hash scroll on top of Lenis' animation.
 *
 * Lenis honours `prefers-reduced-motion` by default (no smoothing, instant jumps),
 * which is intentional. Rendered once from the root layout; fully torn down on unmount.
 */
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ autoRaf: false });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;

      const hash = link.getAttribute("href") ?? "";
      const id = decodeURIComponent(hash.slice(1));
      // "#top" / "#" scroll to the very top (the sticky nav sits above <main id="top">).
      const target: HTMLElement | number | null =
        id === "" || id === "top" ? 0 : document.getElementById(id);
      if (target === null) return;

      event.preventDefault();
      lenis.scrollTo(target, { duration: ANCHOR_DURATION, easing: easeOutExpo });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP defaults
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}
