import Link from "next/link";
import { CardEntrance } from "@/components/motion/CardEntrance";
import { ProjectCard, projectCardSpansRow } from "@/components/projects/ProjectCard";
import { PROJECT_CATEGORY, type Project, type ProjectCategory } from "@/domain/project";
import { projectCopy } from "@/lib/i18n/projects";
import type { Locale } from "@/lib/i18n/locales";

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

interface ProjectCatalogProps {
  locale: Locale;
  projects: Project[];
  activeArea: ProjectCategory | undefined;
  allCurrent: boolean;
  showEmpty: boolean;
}

interface CatalogHomeLinkProps {
  locale: Locale;
}

export function CatalogHomeLink({ locale }: CatalogHomeLinkProps) {
  const copy = projectCopy[locale];

  return (
    <Link
      href={`/${locale}/projects`}
      className={`text-sm text-cyan ${focusRing}`}
    >
      {copy.catalogTitle}
    </Link>
  );
}

export function ProjectCatalog({
  locale,
  projects,
  activeArea,
  allCurrent,
  showEmpty,
}: ProjectCatalogProps) {
  const copy = projectCopy[locale];

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-16 pb-24 sm:px-8">
      <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
        {copy.catalogTitle}
      </h1>
      <nav aria-label={copy.catalogTitle} className="mt-8">
        <ul className="flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
          <li>
            <Link
              href={`/${locale}/projects`}
              aria-current={allCurrent ? "page" : undefined}
              className={filterClass(allCurrent)}
            >
              {copy.allAreas}
            </Link>
          </li>
          {Object.values(PROJECT_CATEGORY).map((category) => {
            const current = activeArea === category;

            return (
              <li key={category}>
                <Link
                  href={`/${locale}/projects?area=${category}`}
                  aria-current={current ? "page" : undefined}
                  className={filterClass(current)}
                >
                  {copy.categories[category]}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {showEmpty ? (
        <p className="mt-8 text-sm leading-relaxed text-muted">{copy.emptyArea}</p>
      ) : null}
      {projects.length > 0 ? (
        <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2">
          {projects.map((project, index) => (
            <li
              key={project.id}
              className={
                projectCardSpansRow(project) ? "md:col-span-2" : undefined
              }
            >
              <CardEntrance index={index}>
                <ProjectCard
                  locale={locale}
                  project={project}
                  headingLevel="h2"
                />
              </CardEntrance>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function filterClass(current: boolean): string {
  return current
    ? `${focusRing} text-sm text-foreground underline underline-offset-4`
    : `${focusRing} text-sm text-foreground`;
}
