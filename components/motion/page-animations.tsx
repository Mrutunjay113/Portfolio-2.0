"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EXPO_OUT = "expo.out";

/**
 * Page-level GSAP choreography, driven by data attributes so section components
 * stay presentational.
 *
 * Hero name lines are animated with fromTo only (no prior gsap.set / CSS hide).
 * A pre-set translateY left names permanently clipped when matchMedia.revert()
 * killed the tween mid-flight (React Strict Mode / remount). With fromTo alone,
 * a killed tween restores the natural visible state instead.
 */
export function PageAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (document.querySelector("[data-hero-status]")) {
          gsap
            .timeline({ defaults: { ease: EXPO_OUT } })
            .fromTo(
              "[data-hero-hatch]",
              { clipPath: "circle(0% at 100% 0%)" },
              {
                clipPath: "circle(160% at 100% 0%)",
                duration: 1.6,
                ease: "power2.out",
              },
              0,
            )
            .fromTo(
              "[data-hero-status]",
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.9 },
              0.15,
            )
            .fromTo(
              "[data-hero-line]",
              { yPercent: 105 },
              {
                yPercent: 0,
                duration: 1.2,
                stagger: 0.09,
                // Keep the final transform inline — do NOT clearProps. Clearing
                // let any leftover CSS translateY(105%) snap the name back off-screen.
              },
              0.2,
            )
            .fromTo(
              "[data-hero-meta]",
              { opacity: 0, y: 18 },
              { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 },
              0.7,
            );
        }

        ScrollTrigger.batch("[data-section-head]", {
          start: "top 92%",
          once: true,
          onEnter: (heads) => {
            heads.forEach((head) => {
              gsap
                .timeline({ defaults: { ease: EXPO_OUT } })
                .fromTo(
                  head.querySelector("[data-head-line]"),
                  { scaleX: 0 },
                  { scaleX: 1, duration: 1.3 },
                )
                .fromTo(
                  head.querySelectorAll("[data-head-text]"),
                  { opacity: 0, y: 14 },
                  { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 },
                  0.1,
                );
            });
          },
        });

        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          interval: 0.1,
          batchMax: 6,
          onEnter: (items) =>
            gsap.fromTo(
              items,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: EXPO_OUT,
                stagger: 0.07,
                overwrite: true,
              },
            ),
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (document.querySelector("[data-hero-hatch]")) {
          gsap.set("[data-hero-hatch]", { clearProps: "clipPath" });
        }
        if (document.querySelector("[data-hero-line]")) {
          gsap.set("[data-hero-line]", { clearProps: "transform" });
        }
        if (document.querySelector("[data-hero-status], [data-hero-meta]")) {
          gsap.to("[data-hero-status], [data-hero-meta]", {
            opacity: 1,
            duration: 0.6,
            ease: "power1.out",
            stagger: 0.04,
          });
        }

        ScrollTrigger.batch(
          "[data-section-head] [data-head-text], [data-reveal]",
          {
            start: "top 92%",
            once: true,
            interval: 0.1,
            batchMax: 6,
            onEnter: (items) =>
              gsap.to(items, {
                opacity: 1,
                duration: 0.6,
                ease: "power1.out",
                stagger: 0.04,
                overwrite: true,
              }),
          },
        );
      });

      void document.fonts?.ready.then(() => ScrollTrigger.refresh());
    });

    return () => ctx.revert();
  }, []);

  return null;
}
