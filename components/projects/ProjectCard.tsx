import Link from "next/link";
import type { Project } from "@/domain/project";
import { projectCopy, type ProjectCopy } from "@/lib/i18n/projects";
import type { Locale } from "@/lib/i18n/locales";

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

const CARD_HEADING = {
  h2: "h2",
  h3: "h3",
} as const;

type CardHeading = (typeof CARD_HEADING)[keyof typeof CARD_HEADING];

const EXTERNAL_PROJECT = {
  tramit: "tramit-ia",
  partner: "partner-intelligence",
} as const;

interface ProjectCardProps {
  locale: Locale;
  project: Project;
  headingLevel: CardHeading;
}

interface ProjectAccessProps {
  locale: Locale;
  project: Project;
}

function projectCardSpansRow(project: Project): boolean {
  return (
    project.slug === EXTERNAL_PROJECT.tramit && project.liveUrl !== undefined
  );
}

function externalLabel(slug: string, copy: ProjectCopy): string | undefined {
  if (slug === EXTERNAL_PROJECT.tramit) {
    return copy.openPilot;
  }

  if (slug === EXTERNAL_PROJECT.partner) {
    return copy.invitePlatform;
  }

  return undefined;
}

export function ProjectAccess({ locale, project }: ProjectAccessProps) {
  const copy = projectCopy[locale];
  const label = externalLabel(project.slug, copy);
  const liveUrl = project.liveUrl;

  if (liveUrl !== undefined && label !== undefined) {
    return (
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex w-fit text-sm text-cyan ${focusRing}`}
      >
        {label}
      </a>
    );
  }

  return <p className="text-sm leading-relaxed text-muted">{copy.noPublicDemo}</p>;
}

export function ProjectCard({
  locale,
  project,
  headingLevel,
}: ProjectCardProps) {
  const copy = projectCopy[locale];
  const wide = projectCardSpansRow(project);
  const titleClass = "mt-4 text-xl font-medium tracking-tight text-foreground";

  return (
    <article className="flex h-full flex-col border border-foreground/10 bg-surface p-6">
      <div
        className={
          wide
            ? "grid h-full grid-cols-1 gap-6 md:grid-cols-2 md:items-end"
            : "flex h-full flex-col"
        }
      >
        <div className="flex h-full flex-col">
          <p className="font-mono text-xs tracking-[0.18em] text-cyan uppercase">
            {project.categories
              .map((category) => copy.categories[category])
              .join(" · ")}
          </p>
          {headingLevel === CARD_HEADING.h2 ? (
            <h2 className={titleClass}>{project.title}</h2>
          ) : (
            <h3 className={titleClass}>{project.title}</h3>
          )}
          <p className="mt-2 text-base leading-relaxed text-foreground">
            {project.tagline}
          </p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {project.summary}
          </p>
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className={`mt-6 inline-flex w-fit text-sm text-cyan ${focusRing}`}
          >
            {copy.viewCase}
          </Link>
        </div>
        <div className={wide ? "md:flex md:justify-end" : "mt-6"}>
          <ProjectAccess locale={locale} project={project} />
        </div>
      </div>
    </article>
  );
}

export { projectCardSpansRow };
