import { CardEntrance } from "@/components/motion/CardEntrance";
import { ProjectCard, projectCardSpansRow } from "@/components/projects/ProjectCard";
import type { Project } from "@/domain/project";
import { projectCopy } from "@/lib/i18n/projects";
import type { Locale } from "@/lib/i18n/locales";

interface FeaturedProjectsProps {
  locale: Locale;
  projects: Project[];
}

export function FeaturedProjects({ locale, projects }: FeaturedProjectsProps) {
  const copy = projectCopy[locale];

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="featured-projects"
      className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8"
    >
      <h2
        id="featured-projects"
        className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        {copy.sectionTitle}
      </h2>
      <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2">
        {projects.map((project, index) => (
          <li
            key={project.id}
            className={projectCardSpansRow(project) ? "md:col-span-2" : undefined}
          >
            <CardEntrance index={index}>
              <ProjectCard
                locale={locale}
                project={project}
                headingLevel="h3"
              />
            </CardEntrance>
          </li>
        ))}
      </ul>
    </section>
  );
}
