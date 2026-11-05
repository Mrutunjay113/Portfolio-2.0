import { cn } from "@/lib/utils";
import { projectTypeLabels, type ProjectType } from "@/lib/portfolio-data";

export function TypeBadge({ type, className }: { type: ProjectType; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <i
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          type === "client" && "bg-signal",
          type === "product" && "bg-ink",
          type === "side" && "border border-ink bg-transparent",
        )}
      />
      {projectTypeLabels[type]}
    </span>
  );
}

export function ProjectTitle({
  title,
  serifClassName,
}: {
  title: { lead: string; serif: string; tail?: string };
  serifClassName?: string;
}) {
  return (
    <>
      {title.lead}{" "}
      <span className={cn("serif", serifClassName ?? "text-mute")}>{title.serif}</span>
      {title.tail ? ` ${title.tail}` : null}
    </>
  );
}
