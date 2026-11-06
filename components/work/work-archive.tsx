"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { createPortal } from "react-dom";
import { ProjectLinks } from "./project-links";
import { IndexHoverVis, ProjectPreview } from "./project-preview";
import {
  displaySummary,
  padIndex,
  projects,
  projectTypeLabels,
  workPage,
  type Project,
  type ProjectType,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { ProjectCase } from "./project-case";
import { ProjectTitle, TypeBadge } from "./type-badge";

type ViewMode = "index" | "grid";
type Filter = "all" | ProjectType;

const FILTERS: Filter[] = ["all", "product", "client", "side"];
const VIEW_KEY = "my-work-view";

function countFor(filter: Filter) {
  if (filter === "all") return projects.length;
  return projects.filter((project) => project.type === filter).length;
}

function subscribeView(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(VIEW_KEY, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(VIEW_KEY, onStoreChange);
  };
}

function getView(): ViewMode {
  const saved = window.localStorage.getItem(VIEW_KEY);
  return saved === "grid" ? "grid" : "index";
}

function subscribeHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
}

function getOpenId() {
  const hash = window.location.hash.slice(1);
  return projects.some((project) => project.id === hash) ? hash : null;
}

export function WorkArchive() {
  const [filter, setFilter] = useState<Filter>("all");
  const view = useSyncExternalStore(
    subscribeView,
    getView,
    () => "index" as ViewMode,
  );
  const openId = useSyncExternalStore(subscribeHash, getOpenId, () => null);
  const [hovered, setHovered] = useState<Project | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.type === filter),
    [filter],
  );

  const openProject = visible.find((project) => project.id === openId) ?? null;

  const setViewMode = (next: ViewMode) => {
    window.localStorage.setItem(VIEW_KEY, next);
    window.dispatchEvent(new Event(VIEW_KEY));
  };

  const open = (id: string) => {
    window.history.replaceState(null, "", `#${id}`);
    window.dispatchEvent(new Event("hashchange"));
  };

  const close = () => {
    window.history.replaceState(null, "", window.location.pathname);
    window.dispatchEvent(new Event("hashchange"));
  };

  const step = (delta: number) => {
    if (!visible.length) return;
    const current = visible.findIndex((project) => project.id === openId);
    const next = visible[(current + delta + visible.length) % visible.length];
    open(next.id);
  };

  return (
    <>
      <header
        data-reveal
        className="grid items-end gap-8 pt-[clamp(56px,10vh,120px)] md:grid-cols-[1fr_auto]"
      >
        <h1 className="flex items-start text-[clamp(80px,17vw,220px)] leading-[0.8] font-medium tracking-[-0.06em]">
          Work
          <span className="serif mt-[0.12em] ml-[0.12em] text-[0.26em] text-signal">
            ({padIndex(visible.length)})
          </span>
        </h1>
        <p className="max-w-[30ch] pb-[0.6em] text-[clamp(18px,1.6vw,22px)] leading-[1.3] tracking-[-0.015em]">
          Everything I&apos;ve built, <span className="serif">from</span> client
          analytics platforms to products I made on my own.
        </p>
      </header>

      <div className="sticky top-[72px] z-10 mt-14 flex flex-col items-start justify-between gap-4 border-t border-ink border-b border-b-line bg-background py-3.5 md:flex-row md:items-center">
        <div
          className="flex flex-wrap gap-1.5"
          role="tablist"
          aria-label="Project type"
        >
          {FILTERS.map((key) => {
            const on = filter === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(key)}
                className={cn(
                  "mono rounded-full border px-3 py-[7px] transition-colors",
                  on
                    ? "border-ink bg-ink text-background"
                    : "border-line hover:border-ink",
                )}
              >
                {projectTypeLabels[key]}
                <sup
                  className={cn(
                    "ml-0.5 text-[9px] tracking-normal",
                    on ? "text-background/60" : "text-mute",
                  )}
                >
                  {padIndex(countFor(key))}
                </sup>
              </button>
            );
          })}
        </div>
        <ViewToggle view={view} onChange={setViewMode} />
      </div>

      {view === "index" ? (
        <IndexView
          projects={visible}
          onOpen={open}
          onHover={setHovered}
        />
      ) : (
        <GridView projects={visible} onOpen={open} />
      )}

      {visible.length === 0 ? (
        <p className="mono py-20 text-center text-mute">
          No projects in this category yet.
        </p>
      ) : null}

      <div
        data-reveal
        className="mt-[clamp(100px,14vh,180px)] flex flex-wrap items-end justify-between gap-6"
      >
        <span className="mono text-mute">{workPage.ctaNote}</span>
        <Link
          href="/#contact"
          className="text-[clamp(40px,7vw,120px)] leading-[0.95] font-medium tracking-[-0.055em] transition-opacity hover:opacity-70"
        >
          Let&apos;s <span className="serif text-signal">talk</span> →
        </Link>
      </div>

      <footer className="mono mt-[clamp(100px,14vh,180px)] flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7 pb-7 text-mute">
        <span>© 2026 Mrutunjay Yadav</span>
        <Link href="/" className="ulink hover:text-signal">
          ← Back home
        </Link>
      </footer>

      <IndexCursor project={view === "index" && !openProject ? hovered : null} />

      <ProjectCase
        project={openProject}
        visible={visible}
        onClose={close}
        onStep={step}
      />
    </>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 3, width: 60 });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const active = wrap.querySelector<HTMLButtonElement>(
      `[data-view="${view}"]`,
    );
    if (!active) return;
    setPill({ left: active.offsetLeft, width: active.offsetWidth });
  }, [view]);

  return (
    <div
      ref={wrapRef}
      className="relative flex rounded-full border border-line p-[3px]"
      role="group"
      aria-label="Layout"
    >
      <span
        aria-hidden
        className="absolute top-[3px] bottom-[3px] rounded-[30px] bg-ink transition-[left,width] duration-[400ms] ease-expo-out"
        style={{ left: pill.left, width: pill.width }}
      />
      {(["index", "grid"] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          data-view={mode}
          aria-pressed={view === mode}
          onClick={() => onChange(mode)}
          className={cn(
            "mono relative z-1 rounded-[30px] px-3 py-[5px] transition-colors",
            view === mode ? "text-background" : "text-ink",
          )}
        >
          {mode === "index" ? "Index" : "Grid"}
        </button>
      ))}
    </div>
  );
}

function IndexView({
  projects: rows,
  onOpen,
  onHover,
}: {
  projects: Project[];
  onOpen: (id: string) => void;
  onHover: (project: Project | null) => void;
}) {
  return (
    <section aria-label="Project index">
      <div className="mono hidden grid-cols-[56px_minmax(0,1.6fr)_140px_minmax(0,1.3fr)_88px] gap-6 py-3.5 text-mute md:grid">
        <span>No.</span>
        <span>Project</span>
        <span>Type</span>
        <span>Stack</span>
        <span>Links</span>
      </div>
      <div
        className="group/rows"
        onMouseLeave={() => onHover(null)}
      >
        {rows.map((project) => (
          <article
            key={project.id}
            data-project={project.id}
            onMouseEnter={() => onHover(project)}
            className="group/row relative grid cursor-pointer grid-cols-[36px_1fr_auto] items-center gap-6 border-t border-line py-[26px] transition-[opacity,padding] duration-[350ms] ease-expo-out last:border-b group-hover/rows:opacity-32 hover:opacity-100 hover:md:pl-3 md:grid-cols-[56px_minmax(0,1.6fr)_140px_minmax(0,1.3fr)_88px]"
          >
            <button
              type="button"
              onClick={() => onOpen(project.id)}
              className="absolute inset-0 z-0 cursor-pointer"
              aria-label={`Open ${project.title.lead}`}
            />
            <span className="pointer-events-none relative mono text-mute">
              {project.index}
            </span>
            <span className="pointer-events-none relative text-[clamp(24px,3vw,44px)] leading-[1.02] font-medium tracking-[-0.04em]">
              <ProjectTitle title={project.title} />
            </span>
            <span className="pointer-events-none relative mono hidden md:block">
              <TypeBadge type={project.type} />
            </span>
            <span className="pointer-events-none relative hidden truncate text-[15px] text-mute md:block">
              {project.tags.slice(0, 4).join(" · ")}
            </span>
            <div className="relative z-1 justify-self-end md:justify-self-start">
              <ProjectLinks project={project} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function GridView({
  projects: cards,
  onOpen,
}: {
  projects: Project[];
  onOpen: (id: string) => void;
}) {
  return (
    <section
      aria-label="Project grid"
      className="grid grid-cols-1 gap-x-6 gap-y-14 pt-10 md:grid-cols-2"
    >
      {cards.map((project) => (
        <article
          key={project.id}
          className={cn("group/card", project.wide && "md:col-span-2")}
        >
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="w-full text-left"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-md bg-card",
                project.wide ? "aspect-4/3 md:aspect-21/9" : "aspect-4/3",
              )}
            >
              <ProjectPreview
                project={project}
                className="absolute inset-0 transition-transform duration-[800ms] ease-expo-out group-hover/card:scale-[1.025]"
              />
              <span className="mono absolute top-3 right-3.5 z-2 mix-blend-difference text-white">
                {project.index}
              </span>
              <ul
                aria-label="Technologies"
                className="absolute inset-y-3 left-3 z-2 flex max-w-[min(100%,220px)] flex-col items-start gap-1.5 opacity-0 transition-opacity duration-[350ms] ease-expo-out group-hover/card:opacity-100"
              >
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Badge
                      variant="outline"
                      className="h-auto rounded-full border-line bg-background/90 px-2.5 py-[5px] font-mono text-[11px] font-normal tracking-[0.02em] text-ink uppercase backdrop-blur-sm"
                    >
                      {tag}
                    </Badge>
                  </li>
                ))}
              </ul>
              <span className="mono absolute right-3.5 bottom-3.5 z-2 translate-y-2 rounded-full bg-background px-3.5 py-2 opacity-0 transition-[opacity,transform] duration-[350ms] ease-expo-out group-hover/card:translate-y-0 group-hover/card:opacity-100">
                View case →
              </span>
            </div>
          </button>
          <div className="mt-4 flex items-start justify-between gap-4">
            <button
              type="button"
              onClick={() => onOpen(project.id)}
              className="min-w-0 text-left"
            >
              <h2 className="text-[clamp(24px,2.4vw,34px)] leading-[1.05] font-medium tracking-[-0.035em]">
                <ProjectTitle title={project.title} />
              </h2>
              <p className="mt-2 max-w-[52ch] text-[15px] text-pretty text-mute">
                {displaySummary(project.summary)}
              </p>
            </button>
            <ProjectLinks project={project} className="shrink-0 pt-1" />
          </div>
        </article>
      ))}
    </section>
  );
}

function IndexCursor({ project }: { project: Project | null }) {
  const node = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      target.current = { x: event.clientX + 200, y: event.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = node.current;
    if (!el) return;
    let fx = 0;
    let fy = 0;
    let frame = 0;
    const loop = () => {
      fx += (target.current.x - fx) * 0.14;
      fy += (target.current.y - fy) * 0.14;
      el.style.left = `${fx}px`;
      el.style.top = `${fy}px`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={node}
      aria-hidden
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[80] w-[360px] max-md:hidden",
        "transition-[opacity,transform] duration-[350ms] ease-expo-out",
        project ? "opacity-100" : "opacity-0",
      )}
      style={{
        transform: project
          ? "translate(-50%, -50%) scale(1) rotate(-2deg)"
          : "translate(-50%, -50%) scale(0.85)",
      }}
    >
      {project ? <IndexHoverVis project={project} /> : null}
    </div>,
    document.body,
  );
}
