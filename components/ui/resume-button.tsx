import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resume } from "@/lib/portfolio-data";

interface ResumeButtonProps {
  /** Compact mono link for the mobile nav; default is the outlined pill used in the hero. */
  variant?: "pill" | "nav";
  className?: string;
}

/** Real file download of /public/resume.pdf (not a scripted fake). */
export function ResumeButton({ variant = "pill", className }: ResumeButtonProps) {
  if (variant === "nav") {
    return (
      <a
        href={resume.href}
        download={resume.filename}
        className={cn(
          "mono group inline-flex items-center gap-1.5 text-ink transition-colors duration-300 hover:text-signal focus-visible:text-signal",
          className,
        )}
      >
        <Download
          aria-hidden
          className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
        />
        Resume
      </a>
    );
  }

  return (
    <Button
      variant="editorial"
      size="pill"
      nativeButton={false}
      className={className}
      render={<a href={resume.href} download={resume.filename} />}
    >
      <Download
        aria-hidden
        className="transition-transform duration-300 group-hover/button:translate-y-0.5"
      />
      Download Resume
    </Button>
  );
}
