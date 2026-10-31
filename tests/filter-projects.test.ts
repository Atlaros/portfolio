import { describe, expect, it } from "vitest";
import { PROJECT_CATEGORY } from "@/domain/project";
import { filterProjects } from "@/lib/projects/filter-projects";

const aiProject = {
  id: "ai-sample",
  categories: [PROJECT_CATEGORY.ai],
};

const engineeringProject = {
  id: "engineering-sample",
  categories: [PROJECT_CATEGORY["data-engineering"]],
};

const projects = [aiProject, engineeringProject];

describe("filterProjects", () => {
  it("returns both sample projects when area is undefined", () => {
    expect(filterProjects(projects, undefined)).toEqual([
      aiProject,
      engineeringProject,
    ]);
  });

  it("returns only the AI project when area is ai", () => {
    expect(filterProjects(projects, PROJECT_CATEGORY.ai)).toEqual([aiProject]);
  });

  it("returns an empty list when no sample project has analytics", () => {
    expect(filterProjects(projects, PROJECT_CATEGORY.analytics)).toEqual([]);
  });
});
