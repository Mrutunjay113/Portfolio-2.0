import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Anchor with correct attributes for off-site (http/https) targets. mailto:/tel:/hash
 * links are passed through untouched so they don't open a blank tab.
 */
export function ExternalLink({ href, className, children, ...props }: ComponentProps<"a">) {
  const isWeb = typeof href === "string" && /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      className={cn(className)}
      {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      {...props}
    >
      {children}
    </a>
  );
}
