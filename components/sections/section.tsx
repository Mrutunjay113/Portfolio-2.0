import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {
  id: string;
}

/** Consistent vertical rhythm + hash target for every content section. */
export function Section({ id, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("pt-[clamp(80px,12vh,150px)]", className)}
      {...props}
    >
      {children}
    </section>
  );
}
