"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/portfolio-data";

const EASE = "expo.out";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface ProjectItemProps {
  project: Project;
  defaultOpen?: boolean;
}

/**
 * Accessible accordion row (button → aria-expanded/aria-controls → region).
 * Each project toggles independently, exactly like the original design.
 *
 * Expand/collapse height is tweened by GSAP only – the panel has no CSS transition,
 * and GSAP never touches the +/− icon (that keeps its own CSS transform transition).
 */
export function ProjectItem({ project, defaultOpen = false }: ProjectItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastOpen = useRef(open);
  const uid = useId();
  const buttonId = `${uid}-trigger`;
  const panelId = `${uid}-panel`;

  // Fixed once so React never re-writes `style.height` after GSAP has taken over.
  const [initialStyle] = useState(() => (defaultOpen ? undefined : { height: 0 }));

  useEffect(() => {
    const panel = panelRef.current;
    // Skip mount (and StrictMode's re-run): only animate real open/close changes.
    if (!panel || lastOpen.current === open) return;
    lastOpen.current = open;

    const reduce = prefersReducedMotion();
    const items = panel.querySelectorAll("[data-pin-item]");
    const refresh = () => ScrollTrigger.refresh();

    const tween = gsap.to(panel, {
      height: open ? "auto" : 0,
      duration: reduce ? 0 : open ? 0.7 : 0.5,
      ease: EASE,
      overwrite: true,
      onComplete: refresh,
    });

    let itemsTween: gsap.core.Tween | undefined;
    if (open && !reduce) {
      itemsTween = gsap.fromTo(
        items,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, ease: EASE, stagger: 0.05, delay: 0.12 },
      );
    }

    return () => {
      tween.kill();
      itemsTween?.kill();
    };
  }, [open]);

  return (
    <article
      data-reveal
      data-open={open}
      className="group/proj border-t border-line last:border-b"
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="grid w-full cursor-pointer grid-cols-[36px_1fr_40px] items-center gap-6 py-[30px] text-left transition-[padding] duration-[400ms] ease-expo-out group-hover/proj:pl-3.5 md:grid-cols-[60px_1fr_auto_40px]"
        >
          <span className="mono text-mute">{project.index}</span>
          <span className="text-[clamp(26px,3.4vw,52px)] leading-none font-medium tracking-[-0.04em]">
            {project.title.lead} <span className="serif text-mute">{project.title.serif}</span>
            {project.title.tail ? ` ${project.title.tail}` : null}
          </span>
          <span className="mono hidden text-right text-mute md:block">{project.kind}</span>
          <span
            aria-hidden
            className="relative size-10 rounded-full border border-line transition-[transform,background-color,border-color] duration-[400ms] group-hover/proj:border-signal group-hover/proj:bg-signal group-data-[open=true]/proj:rotate-45 before:absolute before:top-1/2 before:left-1/2 before:h-px before:w-3 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-ink before:transition-colors before:content-[''] after:absolute after:top-1/2 after:left-1/2 after:h-px after:w-3 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-90 after:bg-ink after:transition-colors after:content-[''] group-hover/proj:before:bg-white group-hover/proj:after:bg-white"
          />
        </button>
      </h3>

      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        style={initialStyle}
        className="overflow-hidden"
      >
        <div className="grid gap-6 pb-11 md:grid-cols-[60px_1fr_1fr]">
          <div data-pin-item className="text-[22px] leading-[1.3] tracking-[-0.02em] text-pretty md:col-start-2">
            {project.summary}
            <ul className="mt-7 flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Badge
                    variant="outline"
                    className="h-auto rounded-full px-2.5 py-[5px] font-mono text-[11px] font-normal tracking-[0.02em] uppercase"
                  >
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
          <ul className="md:col-start-3">
            {project.points.map((point, i) => (
              <li
                key={point}
                data-pin-item
                className="grid grid-cols-[28px_1fr] border-t border-line py-3 text-[15px] leading-normal text-mute"
              >
                <span className="pt-[3px] font-mono text-[11px] text-ink">
                  {String.fromCharCode(97 + i)}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
