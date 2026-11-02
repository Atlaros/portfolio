import Link from "next/link";
import type { Project } from "@/domain/project";
import { CAPABILITY_ID } from "@/lib/capabilities/config";
import { resolveCapabilityEvidence } from "@/lib/capabilities/resolve-evidence";
import { capabilitiesCopy } from "@/lib/i18n/capabilities";
import type { Locale } from "@/lib/i18n/locales";

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

interface CapabilitiesProps {
  locale: Locale;
  projects: readonly Project[];
}

export function Capabilities({ locale, projects }: CapabilitiesProps) {
  const copy = capabilitiesCopy[locale];

  return (
    // ADR-015: Engineering Capabilities; id="approach" until Phase G renames the Hero hash.
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 pb-20 sm:px-8"
    >
      <p className="font-mono text-xs tracking-[0.22em] text-muted uppercase">{copy.eyebrow}</p>
      <h2
        id="approach-title"
        className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {copy.title}
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{copy.lead}</p>

      <div className="mt-8 border-t border-foreground/10">
        {copy.capabilities.map((capability) => (
          <CapabilityRow
            key={capability.id}
            locale={locale}
            name={capability.name}
            build={capability.build}
            evidenceLabel={copy.evidenceLabel}
            projects={resolveCapabilityEvidence(capability.id, projects)}
            accent={capability.id === CAPABILITY_ID.aiAgentic ? "cyan" : "default"}
          />
        ))}
      </div>
    </section>
  );
}

function CapabilityRow({
  locale,
  name,
  build,
  evidenceLabel,
  projects,
  accent,
}: {
  locale: Locale;
  name: string;
  build: string;
  evidenceLabel: string;
  projects: readonly Project[];
  accent: "cyan" | "default";
}) {
  const rail =
    accent === "cyan" ? "border-l-2 border-cyan pl-4" : "border-l border-foreground/20 pl-4";

  return (
    <article className="grid gap-3 border-b border-foreground/10 py-6 sm:grid-cols-[minmax(11rem,0.34fr)_minmax(0,0.66fr)] sm:gap-8 sm:py-7">
      <h3 className={`text-lg font-semibold tracking-tight text-foreground ${rail}`}>{name}</h3>
      <div className="min-w-0">
        <p className="max-w-prose text-sm leading-relaxed text-foreground/90 sm:text-[0.95rem]">
          {build}
        </p>
        {projects.length > 0 ? (
          <p className="mt-3 text-sm leading-relaxed">
            <span className="font-mono text-[0.65rem] tracking-[0.18em] text-blue uppercase">
              {evidenceLabel}
            </span>
            <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              {projects.map((project, index) => (
                <span key={project.slug} className="inline-flex items-center gap-x-2">
                  {index > 0 ? (
                    <span aria-hidden className="text-muted">
                      ·
                    </span>
                  ) : null}
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className={`${focusRing} font-medium text-foreground motion-safe:transition-colors hover:text-cyan`}
                  >
                    {project.title}
                  </Link>
                </span>
              ))}
            </span>
          </p>
        ) : null}
      </div>
    </article>
  );
}
