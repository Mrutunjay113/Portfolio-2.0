import { SectionHeading } from "@/components/ui/section-heading";
import { stack } from "@/lib/portfolio-data";
import { Section } from "./section";

export function Stack() {
  return (
    <Section id="stack">
      <SectionHeading index="04" title="Stack" aside="Tools I use daily" />
      <div className="grid grid-cols-2 border-t border-ink md:grid-cols-5">
        {stack.map((group) => (
          <div
            key={group.label}
            data-reveal
            className="border-b border-line pt-[18px] pr-5 pb-7 md:border-r md:border-b-0 md:pl-5 md:first:pl-0 md:last:border-r-0"
          >
            <h3 className="mono mb-7 block text-mute">{group.label}</h3>
            <ul>
              {group.items.map((item) => (
                <li
                  key={item}
                  className="w-fit text-[clamp(20px,1.8vw,26px)] leading-[1.35] tracking-[-0.025em] transition-[color,transform] duration-300 hover:translate-x-1 hover:text-signal"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
