import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { projectDisplayName, type Project } from "@/lib/portfolio-data";

const BAR_HEIGHTS = [42, 58, 51, 66, 72, 48, 80, 63, 70, 88, 61, 74];
const SHOP_ITEMS = [
  { name: "UI Kit", price: "$29" },
  { name: "Icon Pack", price: "$12" },
  { name: "E-book", price: "$9" },
] as const;

function visKind(id: string) {
  if (id === "campus-occupancy-identity") return "floors";
  if (id === "digital-marketplace") return "shop";
  return "bars";
}

/** Mini dashboard from the Work index reference — used as the hover follower. */
export function IndexHoverVis({ project }: { project: Project }) {
  const src = project.image?.trim();
  if (src) {
    return (
      <div className="relative aspect-4/3 overflow-hidden rounded-[6px] border border-line bg-card shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]">
        <Image src={src} alt="" fill unoptimized sizes="360px" className="object-cover" />
      </div>
    );
  }

  const kind = visKind(project.id);

  return (
    <div className="flex aspect-4/3 flex-col gap-3 overflow-hidden rounded-[6px] border border-line bg-card p-[18px] font-mono text-[10px] tracking-[0.02em] text-mute uppercase shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]">
      {kind === "floors" ? <FloorsVis /> : kind === "shop" ? <ShopVis /> : <BarsVis />}
    </div>
  );
}

function BarsVis() {
  return (
    <>
      <div className="flex items-center justify-between">
        <span>Productive hrs / dept</span>
        <span>12 wk</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-sans text-[28px] leading-none font-medium tracking-[-0.05em] text-ink normal-case">
          7.4h
        </span>
        <span>Avg / day</span>
      </div>
      <div className="flex flex-1 items-end gap-[5px] border-b border-line">
        {BAR_HEIGHTS.map((height, i) => (
          <span
            key={i}
            className={cn(
              "w-full rounded-t-[2px]",
              i === 9 ? "bg-signal" : "bg-ink opacity-85",
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span>Eng</span>
        <span>Ops</span>
        <span>Sales</span>
        <span>Design</span>
      </div>
    </>
  );
}

function FloorsVis() {
  return (
    <>
      <div className="flex items-center justify-between">
        <span>● Live — Block B</span>
        <span>Floors 1–5</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-sans text-[28px] leading-none font-medium tracking-[-0.05em] text-ink normal-case">
          1,284
        </span>
        <span>On campus</span>
      </div>
      <div className="grid flex-1 grid-cols-12 grid-rows-5 gap-[3px]">
        {Array.from({ length: 60 }, (_, i) => {
          const opacity = [0.08, 0.15, 0.3, 0.55, 0.85][(i * 7 + Math.floor(i / 5)) % 5];
          const accent = i === 23 || i === 41;
          return (
            <span
              key={i}
              className={cn("rounded-[2px]", accent ? "bg-signal" : "bg-ink")}
              style={{ opacity: accent ? 1 : opacity }}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <span>Assembly pt. A — 212</span>
        <span>SSE ✓</span>
      </div>
    </>
  );
}

function ShopVis() {
  return (
    <>
      <div className="flex items-center justify-between">
        <span>Catalog</span>
        <span>3 items</span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {SHOP_ITEMS.map((item) => (
          <div
            key={item.name}
            className="flex flex-col rounded border border-line bg-background p-2"
          >
            <i
              aria-hidden
              className="mb-2 flex-1 rounded-[2px] bg-[repeating-linear-gradient(135deg,var(--line)_0_1px,transparent_1px_7px)]"
            />
            <span className="normal-case">
              {item.name}
              <br />
              <span className="text-ink">{item.price}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between rounded bg-ink px-3 py-2 text-background">
        <span>Stripe checkout</span>
        <span className="font-medium text-signal">Signed URL ✓</span>
      </div>
    </>
  );
}

/** Cover for hover preview, grid, and case. Uses `project.image` when set. */
export function ProjectPreview({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const src = project.image?.trim();

  return (
    <div className={cn("relative overflow-hidden bg-card", className)}>
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          unoptimized
          sizes="320px"
          className="object-cover"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-[repeating-linear-gradient(135deg,color-mix(in_oklab,var(--ink)_12%,transparent)_0,color-mix(in_oklab,var(--ink)_12%,transparent)_1px,transparent_1px,transparent_11px)]"
          />
          <span className="mono absolute top-3 left-3.5 text-mute">
            {project.index}
          </span>
          <span className="absolute right-4 bottom-4 max-w-[70%] text-right text-[15px] leading-tight font-medium tracking-[-0.03em]">
            {projectDisplayName(project)}
          </span>
        </>
      )}
    </div>
  );
}

export function MediaSlot({
  src,
  caption,
  className,
}: {
  src?: string;
  caption: string;
  className?: string;
}) {
  const url = src?.trim();

  if (url) {
    return (
      <div
        className={cn(
          "relative min-w-0 w-full overflow-hidden rounded-[4px] bg-card",
          className,
        )}
      >
        <Image
          src={url}
          alt={caption}
          fill
          unoptimized
          sizes="(max-width: 900px) 100vw, 900px"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-w-0 items-center justify-center overflow-hidden rounded-[4px] border border-dashed border-line bg-card px-6 text-center",
        className,
      )}
    >
      <div className="mono text-mute">
        <ImageIcon aria-hidden className="mx-auto mb-2 size-5 opacity-50" />
        <p>{caption}</p>
      </div>
    </div>
  );
}
