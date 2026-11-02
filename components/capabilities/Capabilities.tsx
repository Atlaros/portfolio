import type { Project } from "@/domain/project";
import { capabilitiesCopy } from "@/lib/i18n/capabilities";
import type { Locale } from "@/lib/i18n/locales";
import { CapabilitiesExplorer } from "./CapabilitiesExplorer";

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
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 pb-24 sm:px-8"
    >
      <p className="font-mono text-xs tracking-[0.22em] text-muted uppercase">{copy.eyebrow}</p>
      <h2
        id="approach-title"
        className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {copy.title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{copy.lead}</p>
      <CapabilitiesExplorer
        locale={locale}
        projects={projects}
        labelledBy="approach-title"
      />
    </section>
  );
}
