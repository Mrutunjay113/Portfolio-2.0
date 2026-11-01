import { SectionHeading } from "@/components/ui/section-heading";
import { facts } from "@/lib/portfolio-data";
import { Section } from "./section";

export function Profile() {
  return (
    <Section id="profile">
      <SectionHeading index="01" title="Profile" aside="About" />
      <div className="grid grid-cols-12 gap-x-6">
        <p
          data-reveal
          className="col-span-12 text-[clamp(24px,2.7vw,40px)] leading-[1.18] tracking-[-0.028em] text-pretty md:col-span-8 md:col-start-4"
        >
          I&apos;m a MERN stack developer with 3+ years of experience in{" "}
          <span className="serif">Next.js, React, Node, TypeScript</span> and MongoDB.{" "}
          <span className="text-mute">
            I build responsive, fast interfaces and secure REST APIs, and I care most about data
            modeling, auth and RBAC, and server-state. I own features from the first commit to the
            production release, and I measure success in page load, API latency and data
            consistency.
          </span>
        </p>

        <ul className="col-span-12 mt-16 grid grid-cols-3 gap-3.5 md:col-span-9 md:col-start-4 md:gap-6">
          {facts.map((fact) => (
            <li key={fact.label} data-reveal className="border-t border-line pt-3.5">
              <b className="mb-2.5 block text-[clamp(40px,4.4vw,64px)] leading-none font-medium tracking-[-0.05em]">
                {fact.value}
              </b>
              <span className="mono text-mute">{fact.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
