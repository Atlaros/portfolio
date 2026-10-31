import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isPublished, projectSchema, type Project } from "@/domain/project";
import { locales, type Locale } from "@/lib/i18n/locales";

function projectsDirectory(locale: Locale): string {
  return path.join(process.cwd(), "content", locale, "projects");
}

function readFrontmatter(source: string): unknown {
  const data: unknown = matter(source).data;
  return data;
}

function loadProjects(locale: Locale): Project[] {
  const files = readdirSync(projectsDirectory(locale)).filter((file) =>
    file.endsWith(".mdx"),
  );

  return files.map((file) => {
    const source = readFileSync(path.join(projectsDirectory(locale), file), "utf8");
    const project: Project = projectSchema.parse(readFrontmatter(source));
    return project;
  });
}

function getPublishedProjects(locale: Locale): Project[] {
  return loadProjects(locale)
    .filter((project) => isPublished(project))
    .sort((left, right) => left.order - right.order);
}

function getProject(locale: Locale, slug: string): Project | null {
  const project = loadProjects(locale).find((item) => item.slug === slug);

  if (project === undefined || !isPublished(project)) {
    return null;
  }

  return project;
}

function publishedProjectParams(): Array<{ locale: Locale; slug: string }> {
  return Object.values(locales).flatMap((locale) =>
    getPublishedProjects(locale).map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export { getProject, getPublishedProjects, publishedProjectParams };
