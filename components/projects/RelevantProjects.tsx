import Link from "next/link";
import type { Project } from "@/domain/project";
import { projectCopy } from "@/lib/i18n/projects";
import type { Locale } from "@/lib/i18n/locales";

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

interface RelevantProjectsProps {
  locale: Locale;
  projects: readonly Project[];
}

function clipLines(text: string, maxChars: number): string {
  if (text.length <= maxChars) {
    return text;
  }

  const clipped = text.slice(0, maxChars).trimEnd();
  const lastSpace = clipped.lastIndexOf(" ");
  return `${lastSpace > 40 ? clipped.slice(0, lastSpace) : clipped}…`;
}

export function RelevantProjects({ locale, projects }: RelevantProjectsProps) {
  const copy = projectCopy[locale];
  const relevant = projects
    .filter((project) => project.featured === false)
    .sort((left, right) => left.order - right.order);

  if (relevant.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="relevant-projects-title"
      className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8"
    >
      <h2
        id="relevant-projects-title"
        className="max-w-3xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {copy.relevantTitle}
      </h2>

      <ul className="mt-8 border-t border-foreground/10">
        {relevant.map((project) => {
          const technologies = project.technologies ?? [];
          const participation =
            project.participation !== undefined
              ? copy.participation[project.participation]
              : undefined;

          return (
            <li
              key={project.id}
              className="grid gap-3 border-b border-foreground/10 py-6 sm:grid-cols-[minmax(12rem,0.32fr)_minmax(0,0.68fr)] sm:gap-8 sm:py-7"
            >
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {project.title}
                </h3>
                {participation !== undefined ? (
                  <p className="mt-2 font-mono text-[0.65rem] tracking-[0.18em] text-muted uppercase">
                    {participation}
                  </p>
                ) : null}
              </div>

              <div className="min-w-0 space-y-3">
                <p className="max-w-prose text-sm leading-relaxed text-foreground/90">
                  <span className="font-mono text-[0.65rem] tracking-[0.16em] text-blue uppercase">
                    {copy.problem}
                  </span>
                  <span className="mt-1 block text-muted">
                    {clipLines(project.problem, 160)}
                  </span>
                </p>
                <p className="max-w-prose text-sm leading-relaxed text-foreground/90">
                  <span className="font-mono text-[0.65rem] tracking-[0.16em] text-blue uppercase">
                    {copy.solution}
                  </span>
                  <span className="mt-1 block text-muted">
                    {clipLines(project.solution, 160)}
                  </span>
                </p>

                {technologies.length > 0 ? (
                  <p className="font-mono text-xs leading-relaxed text-muted">
                    {technologies.join(" · ")}
                  </p>
                ) : null}

                <p className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className={`inline-flex text-cyan ${focusRing}`}
                  >
                    {copy.viewCase}
                  </Link>
                  {project.repositoryUrl !== undefined ? (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex text-cyan ${focusRing}`}
                    >
                      {copy.sourceCode}
                    </a>
                  ) : null}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
