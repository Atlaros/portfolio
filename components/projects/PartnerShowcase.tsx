import { CaptureFrame, CaptureImage } from "@/components/projects/CaptureFrame";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import type { Project } from "@/domain/project";
import { showcaseCopy } from "@/lib/i18n/showcase";
import type { Locale } from "@/lib/i18n/locales";

function PartnerShowcase({ locale, project }: { locale: Locale; project: Project }) {
  const copy = showcaseCopy[locale];
  const [programs, organizations] = project.screenshots ?? [];

  if (programs === undefined || organizations === undefined) {
    return null;
  }

  return (
    <article className="grid items-start gap-8 xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] xl:gap-12">
      <div>
        <p className="font-mono text-xs tracking-[0.18em] text-cyan uppercase">{copy.internship}</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-2 text-lg text-foreground">{project.tagline}</p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{project.whyItMatters}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{project.approach}</p>
        <p className="mt-6 font-mono text-[0.65rem] tracking-[0.16em] text-muted uppercase">
          {copy.explanatory}
        </p>
        <ol className="mt-3 grid list-none gap-2 p-0 sm:grid-cols-2">
          {copy.flow.map((step, stepIndex) => (
            <li
              key={step}
              className="border border-blue/35 bg-surface px-3 py-3 text-sm leading-snug text-foreground"
            >
              <span className="font-mono text-[0.65rem] text-cyan">{stepIndex + 1}</span>
              <span className="mt-1 block">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 border border-dashed border-muted/50 px-3 py-3 text-sm text-muted">
          <span className="font-mono text-[0.65rem] tracking-[0.14em] text-cyan uppercase">
            {copy.outsideScore}
          </span>
          <span className="mt-1 block">{copy.modelNote}</span>
        </p>
        <ProjectLinks locale={locale} project={project} />
      </div>
      <div className="relative pb-8 sm:pb-14">
        <div className="relative z-10">
          <CaptureFrame>
            <CaptureImage src={programs.src} alt={programs.alt} />
          </CaptureFrame>
          <p className="mt-2 text-sm leading-snug text-muted">{programs.caption}</p>
        </div>
        <div className="relative z-20 mt-4 ml-4 sm:absolute sm:right-0 sm:bottom-0 sm:mt-0 sm:ml-0 sm:w-[72%]">
          <CaptureFrame>
            <CaptureImage src={organizations.src} alt={organizations.alt} />
          </CaptureFrame>
          <p className="mt-2 text-sm leading-snug text-muted">{organizations.caption}</p>
        </div>
      </div>
    </article>
  );
}

export { PartnerShowcase };
