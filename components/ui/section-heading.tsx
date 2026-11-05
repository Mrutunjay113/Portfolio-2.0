import type { ReactNode } from "react";

interface SectionHeadingProps {
  index: string;
  title: string;
  aside: ReactNode;
}

/** Editorial section header: hairline rule, "(01) Title" on the left, quiet note on the right. */
export function SectionHeading({ index, title, aside }: SectionHeadingProps) {
  return (
    <div
      data-section-head
      className="relative mb-14 flex items-baseline justify-between gap-6 pt-4"
    >
      <span
        data-head-line
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-line"
      />
      <h2 data-head-text className="mono">
        ({index}) {title}
      </h2>
      <p data-head-text className="mono text-right text-mute">
        {aside}
      </p>
    </div>
  );
}
