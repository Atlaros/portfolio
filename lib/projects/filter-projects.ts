import type { ProjectCategory } from "@/domain/project";

interface FilterableProject {
  categories: readonly ProjectCategory[];
}

function filterProjects<T extends FilterableProject>(
  projects: readonly T[],
  area: ProjectCategory | undefined,
): T[] {
  if (area === undefined) {
    return [...projects];
  }

  return projects.filter((project) =>
    project.categories.some((category) => category === area),
  );
}

export { filterProjects };
