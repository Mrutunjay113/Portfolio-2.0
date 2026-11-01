import { ProjectItem } from "@/components/projects/project-item";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/lib/portfolio-data";
import { Section } from "./section";

export function Work() {
  return (
    <Section id="work">
      <SectionHeading index="03" title="Selected Work" aside="Click a project to expand" />
      <div>
        {projects.map((project, i) => (
          <ProjectItem key={project.id} project={project} defaultOpen={i === 0} />
        ))}
      </div>
    </Section>
  );
}
