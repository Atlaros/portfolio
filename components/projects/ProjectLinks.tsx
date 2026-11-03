import type { Project } from "@/domain/project";
import { projectCopy } from "@/lib/i18n/projects";
import type { Locale } from "@/lib/i18n/locales";

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

function ProjectLinks({ locale, project }: { locale: Locale; project: Project }) {
  const access = projectCopy[locale];
  const invited = project.slug === "partner-intelligence";

  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
      <a
        href={`/${locale}/projects/${project.slug}`}
        className={`${focusRing} inline-flex min-h-11 items-center text-sm text-cyan`}
      >
        {access.viewCase}
      </a>
      {project.liveUrl === undefined ? (
        <p className="inline-flex min-h-11 items-center text-sm text-muted">{access.noPublicDemo}</p>
      ) : (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${focusRing} inline-flex min-h-11 items-center text-sm text-foreground`}
        >
          {invited ? access.invitePlatform : access.openPilot}
        </a>
      )}
    </div>
  );
}

export { ProjectLinks, focusRing };
