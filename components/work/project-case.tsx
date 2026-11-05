"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { gsap } from "gsap";
import {
  displaySummary,
  padIndex,
  projectCategory,
  projectCrumb,
  projectDisplayName,
  projectEngagement,
  projectRoleLabel,
  type Project,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { ProjectLinks } from "./project-links";
import { MediaSlot } from "./project-preview";

interface ProjectCaseProps {
  project: Project | null;
  visible: Project[];
  onClose: () => void;
  onStep: (delta: number) => void;
}

function lockScroll(locked: boolean) {
  window.dispatchEvent(
    new CustomEvent("portfolio:scroll-lock", { detail: locked }),
  );
  document.body.style.overflow = locked ? "hidden" : "";
}

const REVEAL_EASE = "expo.out";

export function ProjectCase({
  project,
  visible,
  onClose,
  onStep,
}: ProjectCaseProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const [displayed, setDisplayed] = useState<Project | null>(null);
  const open = Boolean(project);
  const shown = project ?? displayed;

  if (project && displayed?.id !== project.id) {
    setDisplayed(project);
  }

  useLayoutEffect(() => {
    const el = shellRef.current;
    if (!el || !shown) return;

    if (open) {
      wasOpen.current = true;
      lockScroll(true);
      gsap.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.9,
        ease: REVEAL_EASE,
        overwrite: true,
      });
      return;
    }

    if (!wasOpen.current) return;

    const tween = gsap.to(el, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 0.7,
      ease: REVEAL_EASE,
      overwrite: true,
      onComplete: () => {
        wasOpen.current = false;
        setDisplayed(null);
        lockScroll(false);
      },
    });

    return () => {
      tween.kill();
    };
  }, [open, shown]);

  useEffect(() => {
    return () => lockScroll(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    scrollerRef.current?.scrollTo({ top: 0 });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, shown?.id, onClose, onStep]);

  if (typeof document === "undefined" || !shown) return null;

  const next = visible.find((item) => item.id === shown.id)
    ? visible[
        (visible.findIndex((item) => item.id === shown.id) + 1) %
          visible.length
      ]
    : visible[0];

  return createPortal(
    <div
      ref={shellRef}
      role="dialog"
      aria-modal={open}
      aria-hidden={!open}
      aria-labelledby="work-case-title"
      className="fixed inset-0 z-50 flex w-full flex-col overflow-x-hidden bg-background [clip-path:inset(100%_0%_0%_0%)]"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-(--pad) py-4">
        <p className="mono min-w-0 truncate text-mute">
          Work
          <span className="mx-2 text-line">/</span>
          <span className="text-ink">{projectCrumb(shown)}</span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <CaseButton onClick={() => onStep(-1)} disabled={visible.length < 2}>
            <ArrowLeft aria-hidden className="size-3.5" />
            Prev
          </CaseButton>
          <CaseButton onClick={() => onStep(1)} disabled={visible.length < 2}>
            Next
            <ArrowRight aria-hidden className="size-3.5" />
          </CaseButton>
          <CaseButton ref={closeRef} onClick={onClose} solid>
            Close
            <X aria-hidden className="size-3.5" />
          </CaseButton>
        </div>
      </header>

      <div
        ref={scrollerRef}
        className="min-h-0 flex-1 overflow-y-auto px-(--pad) py-10 md:py-14"
      >
        <div className="mx-auto w-full min-w-0 max-w-[1280px]">
          <div className="flex items-center justify-between gap-4">
            <p className="mono text-mute">({shown.index})</p>
            <ProjectLinks project={shown} />
          </div>
          <h2
            id="work-case-title"
            className="mt-6 max-w-[16ch] text-[clamp(44px,8vw,108px)] leading-[0.9] font-medium tracking-[-0.055em]"
          >
            {projectDisplayName(shown)}
          </h2>

          <dl className="mt-12 grid grid-cols-2 border-t border-ink md:grid-cols-4">
            <Meta label="Category" value={projectCategory(shown)} />
            <Meta
              label="Type"
              value={projectEngagement(shown.type)}
              accent={shown.type === "client"}
            />
            <Meta label="Role" value={projectRoleLabel(shown)} />
            <Meta
              label="Core stack"
              value={shown.tags.slice(0, 3).join(", ")}
              last
            />
          </dl>

          <MediaSlot
            src={shown.image}
            caption={`${projectDisplayName(shown)} cover`}
            className="mt-8 aspect-16/8 min-h-[200px]"
          />

          <CaseBlock label="Overview">
            <p className="max-w-[28ch] text-[clamp(26px,3.2vw,44px)] leading-[1.15] tracking-[-0.035em] text-pretty md:max-w-[22ch] lg:max-w-[28ch]">
              {displaySummary(shown.summary)}
            </p>
          </CaseBlock>

          <CaseBlock label="What I built">
            <ol className="divide-y divide-line border-y border-line">
              {shown.points.map((point, i) => (
                <li
                  key={point}
                  className="grid min-w-0 grid-cols-[40px_minmax(0,1fr)] gap-4 py-5 text-[15px] leading-relaxed text-pretty md:text-base"
                >
                  <span className="mono pt-0.5 text-signal">
                    {padIndex(i + 1)}
                  </span>
                  {point}
                </li>
              ))}
            </ol>
          </CaseBlock>

          <div className="mt-16 grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
            <MediaSlot
              src={shown.images?.[0]}
              caption={`${projectDisplayName(shown)} wide`}
              className="min-w-0 w-full aspect-4/3 md:col-span-7"
            />
            <MediaSlot
              src={shown.images?.[1]}
              caption={`${projectDisplayName(shown)} detail`}
              className="min-w-0 w-full aspect-3/4 md:col-span-5"
            />
          </div>

          <CaseBlock label="Tech stack">
            <ul className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 md:grid-cols-4">
              {shown.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-r border-b border-line px-4 py-3 text-[15px] tracking-[-0.02em]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </CaseBlock>

          {next && next.id !== shown.id ? (
            <button
              type="button"
              onClick={() => onStep(1)}
              className="group mt-20 w-full border-t border-ink pt-8 text-left"
            >
              <span className="mono text-mute">
                Next project{" "}
                <ArrowUpRight
                  aria-hidden
                  className="inline size-3.5 align-[-0.1em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
                />
              </span>
              <span className="mt-4 block text-[clamp(36px,6vw,88px)] leading-[0.92] font-medium tracking-[-0.05em] transition-colors group-hover:text-signal">
                {projectDisplayName(next)}
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Meta({
  label,
  value,
  last,
  accent,
}: {
  label: string;
  value: string;
  last?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "py-4 pr-5",
        !last &&
          "border-b border-line md:border-r md:border-b-0 md:nth-[n+2]:pl-5",
        last && "md:pl-5",
      )}
    >
      <dt className="mono text-mute">{label}</dt>
      <dd
        className={cn(
          "mt-1.5 text-[15px] tracking-[-0.02em]",
          accent && "text-signal",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function CaseBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-16 grid gap-6 md:grid-cols-[minmax(0,160px)_1fr] md:gap-10">
      <h3 className="mono text-mute">{label}</h3>
      <div>{children}</div>
    </div>
  );
}

function CaseButton({
  onClick,
  disabled,
  solid,
  children,
  ref,
}: {
  onClick: () => void;
  disabled?: boolean;
  solid?: boolean;
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "mono inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 transition-colors disabled:pointer-events-none disabled:opacity-40",
        solid
          ? "border-ink bg-ink text-background hover:border-signal hover:bg-signal hover:text-white"
          : "border-line hover:border-ink",
      )}
    >
      {children}
    </button>
  );
}
