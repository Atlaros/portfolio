import Link from "next/link";
import { ProjectAccess } from "@/components/projects/ProjectCard";
import type { Project } from "@/domain/project";
import { projectCopy } from "@/lib/i18n/projects";
import type { Locale } from "@/lib/i18n/locales";

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

interface CaseStudyProps {
  locale: Locale;
  project: Project;
}

interface NarrativeBlock {
  title: string;
  body: string;
}

export function CaseStudy({ locale, project }: CaseStudyProps) {
  const copy = projectCopy[locale];
  const narrative: NarrativeBlock[] = [
    { title: copy.problem, body: project.problem },
  ];

  if (project.whyItMatters) {
    narrative.push({ title: copy.whyItMatters, body: project.whyItMatters });
  }

  narrative.push(
    { title: copy.solution, body: project.solution },
    { title: copy.approach, body: project.approach },
  );

  const decisions = project.engineeringDecisions ?? [];
  const technologies = project.technologies ?? [];

  return (
    <article className="mx-auto w-full max-w-6xl px-5 pt-12 pb-24 sm:px-8 sm:pt-16">
      <Link href={`/${locale}`} className={`text-sm text-cyan ${focusRing}`}>
        {copy.backHome}
      </Link>
      <p className="mt-8 font-mono text-xs tracking-[0.18em] text-cyan uppercase">
        {project.categories
          .map((category) => copy.categories[category])
          .join(" · ")}
      </p>
      <h1 className="mt-4 max-w-4xl text-4xl leading-[1.08] font-medium tracking-tight text-foreground sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground">
        {project.tagline}
      </p>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
        {project.summary}
      </p>
      <div className="mt-6">
        <ProjectAccess locale={locale} project={project} />
      </div>
      <div className="mt-12 flex max-w-3xl flex-col gap-10">
        {narrative.map((block) => (
          <section key={block.title}>
            <h2 className="text-xl font-medium tracking-tight text-foreground">
              {block.title}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{block.body}</p>
          </section>
        ))}
        {decisions.length > 0 ? (
          <section>
            <h2 className="text-xl font-medium tracking-tight text-foreground">
              {copy.engineeringDecisions}
            </h2>
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-muted">
              {decisions.map((decision) => (
                <li key={decision} className="leading-relaxed">
                  {decision}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {project.validation ? (
          <section>
            <h2 className="text-xl font-medium tracking-tight text-foreground">
              {copy.validation}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{project.validation}</p>
          </section>
        ) : null}
        <section>
          <h2 className="text-xl font-medium tracking-tight text-foreground">
            {copy.benefits}
          </h2>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-muted">
            {project.benefits.map((benefit) => (
              <li key={benefit} className="leading-relaxed">
                {benefit}
              </li>
            ))}
          </ul>
        </section>
        {project.limitations ? (
          <section>
            <h2 className="text-xl font-medium tracking-tight text-foreground">
              {copy.limitations}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{project.limitations}</p>
          </section>
        ) : null}
        {technologies.length > 0 ? (
          <section>
            <h2 className="text-xl font-medium tracking-tight text-foreground">
              {copy.technologies}
            </h2>
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-muted">
              {technologies.map((technology) => (
                <li key={technology} className="leading-relaxed">
                  {technology}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
