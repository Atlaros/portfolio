import { AcademShowcase } from "@/components/projects/AcademShowcase";
import { PartnerShowcase } from "@/components/projects/PartnerShowcase";
import { TramitShowcase } from "@/components/projects/TramitShowcase";
import type { Project } from "@/domain/project";
import { projectCopy } from "@/lib/i18n/projects";
import type { Locale } from "@/lib/i18n/locales";

interface FeaturedProjectsProps {
  locale: Locale;
  projects: Project[];
}

function ProjectShowcase({ locale, project }: { locale: Locale; project: Project }) {
  if (project.slug === "tramit-ia") {
    return <TramitShowcase locale={locale} project={project} />;
  }

  if (project.slug === "academ-ia") {
    return <AcademShowcase locale={locale} project={project} />;
  }

  if (project.slug === "partner-intelligence") {
    return <PartnerShowcase locale={locale} project={project} />;
  }

  return null;
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
        className="scroll-mt-28 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {copy.sectionTitle}
      </h2>
      <div className="mt-12 flex flex-col gap-20 xl:gap-28">
        {projects.map((project) => (
          <ProjectShowcase key={project.id} locale={locale} project={project} />
        ))}
      </div>
    </section>
  );
}
