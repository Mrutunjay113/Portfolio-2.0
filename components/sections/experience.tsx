import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/lib/portfolio-data";
import { Section } from "./section";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading index="02" title="Experience" aside="2023 — Now" />
      <div className="grid grid-cols-12 gap-x-6">
        <div data-reveal className="col-span-12 md:col-span-4">
          <span className="mono text-mute">{experience.company}</span>
          <h3 className="mt-3 text-[30px] leading-[1.05] font-medium tracking-[-0.03em]">
            {experience.headline.lead} <span className="serif">{experience.headline.serif}</span>
          </h3>

          <ol className="relative mt-9 pl-[22px] before:absolute before:top-1.5 before:bottom-1.5 before:left-[3px] before:w-px before:bg-line before:content-['']">
            {experience.steps.map((step) => (
              <li
                key={step.when}
                className={
                  "relative mb-[26px] before:absolute before:top-1.5 before:-left-[22px] before:size-[7px] before:rounded-full before:border before:content-['']" +
                  (step.current
                    ? " before:border-signal before:bg-signal"
                    : " before:border-ink before:bg-background")
                }
              >
                <span className={"mono " + (step.current ? "text-signal" : "text-mute")}>
                  {step.when}
                </span>
                <div className="mt-0.5 text-[17px]">{step.title}</div>
              </li>
            ))}
          </ol>
        </div>

        <ul className="col-span-12 mt-12 md:col-span-7 md:col-start-6 md:mt-0">
          {experience.duties.map((duty) => (
            <li
              key={duty.label}
              data-reveal
              className="grid gap-1.5 border-t border-line py-[22px] last:border-b md:grid-cols-[120px_1fr] md:gap-6"
            >
              <span className="mono text-mute">{duty.label}</span>
              <p className="text-[17px] leading-normal text-pretty">{duty.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
