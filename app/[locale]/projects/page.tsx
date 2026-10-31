import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProjectCatalog } from "@/components/projects/ProjectCatalog";
import {
  PROJECT_CATEGORY,
  type Project,
  type ProjectCategory,
} from "@/domain/project";
import { isLocale } from "@/lib/i18n/locales";
import { filterProjects } from "@/lib/projects/filter-projects";
import { getPublishedProjects } from "@/lib/projects/repository";

const projectCategories: ReadonlySet<string> = new Set(
  Object.values(PROJECT_CATEGORY),
);

interface AreaQuery {
  activeArea: ProjectCategory | undefined;
  allCurrent: boolean;
  unrecognized: boolean;
}

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function isProjectCategory(value: string): value is ProjectCategory {
  return projectCategories.has(value);
}

function readArea(value: string | string[] | undefined): AreaQuery {
  if (value === undefined) {
    return { activeArea: undefined, allCurrent: true, unrecognized: false };
  }

  if (typeof value === "string" && isProjectCategory(value)) {
    return { activeArea: value, allCurrent: false, unrecognized: false };
  }

  return { activeArea: undefined, allCurrent: false, unrecognized: true };
}

function projectsForArea(published: Project[], area: AreaQuery): Project[] {
  if (area.unrecognized) {
    return [];
  }

  return filterProjects(published, area.activeArea);
}

export const instant = false;

export default async function ProjectsPage({
  params,
  searchParams,
}: ProjectsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const { area } = await searchParams;
  const selection = readArea(area);
  const projects = projectsForArea(getPublishedProjects(locale), selection);

  return (
    <>
      <SiteHeader locale={locale} current="catalog" />
      <main>
        <ProjectCatalog
          locale={locale}
          projects={projects}
          activeArea={selection.activeArea}
          allCurrent={selection.allCurrent}
          showEmpty={projects.length === 0}
        />
      </main>
    </>
  );
}
