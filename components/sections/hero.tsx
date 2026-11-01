import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ResumeButton } from "@/components/ui/resume-button";
import { ExternalLink } from "@/components/ui/external-link";
import { hero, heroSocials } from "@/lib/portfolio-data";

/** Masked headline line — GSAP slides the inner `[data-hero-line]` span up. */
function HeadlineLine({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden py-[0.06em] leading-[0.92]">
      <span data-hero-line className="block">
        {children}
      </span>
    </span>
  );
}

function StackBadges({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Stack">
      {items.map((item) => (
        <li key={item}>
          <Badge
            variant="outline"
            className="h-auto rounded-full border-line px-2.5 py-[5px] font-mono text-[11px] font-normal tracking-[0.02em] text-ink uppercase"
          >
            {item}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

function HeroCodeCard() {
  const { caption, objectName, fields } = hero.code;
  const lastKey = fields[fields.length - 1]?.key;

  return (
    <aside
      data-hero-meta
      aria-label="Profile at a glance"
      className="w-full shrink-0 rounded-2xl border border-line bg-card p-7 font-mono text-[14px] leading-[1.8] text-mute md:w-[min(100%,420px)] lg:text-[15px]"
    >
      <div className="mb-3 text-mute/80">{caption}</div>
      <div>
        <span className="text-signal">const</span> {objectName} = {"{"}
      </div>
      {fields.map((field) => {
        const isArray = Array.isArray(field.value);
        const trailing = field.key !== lastKey ? "," : "";

        return (
          <div key={field.key} className="pl-6 text-ink">
            {isArray ? (
              <>
                <div>{field.key}: [</div>
                <StackBadges items={field.value} />
                <div>]{trailing}</div>
              </>
            ) : (
              <>
                {field.key}:{" "}
                <span className="text-mute">&quot;{field.value}&quot;</span>
                {trailing}
              </>
            )}
          </div>
        );
      })}
      <div>{"}"}</div>
    </aside>
  );
}

export function Hero() {
  return (
    <header className="relative flex min-h-[calc(100svh-72px)] flex-col justify-between gap-12 pt-[clamp(40px,8vh,96px)] pb-8">
      <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Left: status, name, lede */}
        <div className="flex min-w-0 flex-1 flex-col gap-7">
          <span
            data-hero-status
            className="mono inline-flex w-fit items-center gap-2.5 rounded-full border border-line px-[18px] py-2.5 text-signal"
          >
            <span className="relative size-[7px] rounded-full bg-signal after:absolute after:-inset-1 after:animate-status-ping after:rounded-full after:border after:border-signal after:content-['']" />
            {hero.status}
          </span>

          <h1 className="text-[clamp(56px,9vw,128px)] font-bold tracking-[-0.04em]">
            <HeadlineLine>{hero.firstName}</HeadlineLine>
            <HeadlineLine>{hero.lastName}</HeadlineLine>
          </h1>

          <p
            data-hero-meta
            className="max-w-[34ch] text-[clamp(20px,2vw,26px)] leading-[1.35] tracking-[-0.015em] text-mute"
          >
            {hero.lede.before}
            <span className="text-[1.15em] font-semibold text-signal">
              {hero.lede.accent}
            </span>
            {hero.lede.after}
          </p>
        </div>

        {/* Right: code card */}
        <HeroCodeCard />
      </div>

      {/* Bottom bar: CTAs left, scroll cue right */}
      <div
        data-hero-meta
        className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4"
      >
        <div className="flex flex-wrap items-center gap-4">
          <ResumeButton />
          {heroSocials.map((social) => (
            <ExternalLink
              key={social.label}
              href={social.href}
              className="group inline-flex items-center gap-1 text-[15px] text-mute transition-colors duration-300 hover:text-ink focus-visible:text-ink"
            >
              {social.label}
              <ArrowUpRight
                aria-hidden
                className="size-3.5 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
              />
            </ExternalLink>
          ))}
        </div>

        <a
          href="#profile"
          className="mono group inline-flex items-center gap-2 text-mute transition-colors duration-300 hover:text-signal focus-visible:text-signal"
        >
          Scroll to explore
          <ArrowDown
            aria-hidden
            className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
          />
        </a>
      </div>
    </header>
  );
}
