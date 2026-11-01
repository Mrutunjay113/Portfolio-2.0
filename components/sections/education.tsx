import { SectionHeading } from "@/components/ui/section-heading";
import { education } from "@/lib/portfolio-data";
import { Section } from "./section";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading index="05" title="Education" aside="Academic" />
      <ul>
        {education.map((item) => (
          <li
            key={item.index}
            data-reveal
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 border-t border-line py-[26px] last:border-b md:grid-cols-[120px_1.4fr_1fr_auto]"
          >
            <span className="mono hidden text-mute md:inline">{item.index}</span>
            <h4 className="text-[30px] font-medium tracking-[-0.035em]">
              {item.degree.lead}
              {"serif" in item.degree && (
                <>
                  {" "}
                  <span className="serif">{item.degree.serif}</span>
                </>
              )}
            </h4>
            <span className="order-last col-span-2 text-mute md:order-none md:col-span-1">
              {item.institution}
            </span>
            <span className="text-[30px] tracking-[-0.035em]">
              {item.score.value} <span className="mono text-mute">{item.score.scale}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
