import Link from "next/link";
import { ProjectItem } from "@/components/projects/project-item";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProjects } from "@/lib/portfolio-data";
import { Section } from "./section";

export function Work() {
  return (
    <Section id="work">
      <SectionHeading
        index="03"
        title="Selected Work"
        aside={
          <Link href="/work" className="ulink hover:text-signal">
            View all
          </Link>
        }
      />
      <div>
        {featuredProjects.map((project, i) => (
          <ProjectItem key={project.id} project={project} defaultOpen={i === 0} />
        ))}
      </div>
    </Section>
  );
}
