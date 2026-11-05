import { CodeXml, Globe } from "lucide-react";
import { ExternalLink } from "@/components/ui/external-link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/portfolio-data";

export function ProjectLinks({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <IconLink href={project.live} label={`${project.title.lead} live site`}>
        <Globe aria-hidden className="size-3.5" />
      </IconLink>
      <IconLink href={project.code} label={`${project.title.lead} source code`}>
        <CodeXml aria-hidden className="size-3.5" />
      </IconLink>
    </div>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
}) {
  const className = cn(
    "relative z-2 grid size-8 place-items-center rounded-full border transition-colors",
    href
      ? "cursor-pointer border-line text-ink hover:border-signal hover:bg-signal hover:text-white"
      : "pointer-events-none border-line/70 text-mute opacity-35",
  );

  if (!href) {
    return (
      <span className={className} aria-disabled title={label}>
        {children}
      </span>
    );
  }

  return (
    <ExternalLink
      href={href}
      aria-label={label}
      title={label}
      className={className}
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      {children}
    </ExternalLink>
  );
}
