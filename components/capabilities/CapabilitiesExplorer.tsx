"use client";

import Link from "next/link";
import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useEntranceEnabled } from "@/components/motion/use-entrance-enabled";
import type { Project } from "@/domain/project";
import { pendingEvidenceFor } from "@/lib/capabilities/pending-evidence";
import {
  collectProjectTechnologies,
  resolveCapabilityEvidence,
} from "@/lib/capabilities/resolve-evidence";
import { capabilitiesCopy } from "@/lib/i18n/capabilities";
import { projectCopy } from "@/lib/i18n/projects";
import type { Locale } from "@/lib/i18n/locales";

const PANEL_SECONDS = 0.22;

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

interface CapabilitiesExplorerProps {
  locale: Locale;
  projects: readonly Project[];
  labelledBy: string;
}

export function CapabilitiesExplorer({
  locale,
  projects,
  labelledBy,
}: CapabilitiesExplorerProps) {
  const copy = capabilitiesCopy[locale];
  const projectsCopy = projectCopy[locale];
  const play = useEntranceEnabled();
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [index, setIndex] = useState(0);
  const capability = copy.capabilities[index] ?? copy.capabilities[0];
  const evidence = resolveCapabilityEvidence(capability.id, projects);
  const pending = pendingEvidenceFor(capability.id);
  const technologies = collectProjectTechnologies(evidence);
  const panelId = `${baseId}-panel`;

  function selectCapability(next: number) {
    setIndex(next);
  }

  function onTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const next = indexFromKey(event.key, index, copy.capabilities.length);

    if (next === null) {
      return;
    }

    event.preventDefault();
    selectCapability(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
      <div
        role="tablist"
        aria-labelledby={labelledBy}
        aria-orientation="vertical"
        onKeyDown={onTabsKeyDown}
        className="flex flex-col gap-2"
      >
        {copy.capabilities.map((item, capabilityIndex) => {
          const selected = capabilityIndex === index;

          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[capabilityIndex] = node;
              }}
              id={`${baseId}-tab-${capabilityIndex}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectCapability(capabilityIndex)}
              className={`${focusRing} min-h-11 cursor-pointer border px-4 py-3 text-left transition-colors ${
                selected
                  ? "border-cyan bg-cyan/10 text-foreground"
                  : "border-foreground/10 bg-surface text-muted hover:border-blue/40 hover:text-foreground"
              }`}
            >
              <span className="block font-mono text-[0.65rem] tracking-[0.18em] text-cyan">
                {String(capabilityIndex + 1).padStart(2, "0")}
              </span>
              <span className="mt-1 block text-sm font-medium tracking-tight text-foreground">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${index}`}
        className="relative min-w-0 border border-cyan/25 bg-surface-raised p-6 shadow-[0_24px_64px_rgb(11_16_27/0.45)] sm:p-8"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={capability.id}
            initial={play ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={play ? { opacity: 0, y: -6 } : undefined}
            transition={{ duration: play ? PANEL_SECONDS : 0 }}
          >
            <p className="text-base leading-relaxed text-foreground">{capability.build}</p>

            <div className="mt-8 border-t border-foreground/10 pt-6">
              <p className="font-mono text-xs tracking-[0.22em] text-blue uppercase">
                {copy.evidenceLabel}
              </p>

              {evidence.length > 0 ? (
                <ul className="mt-4 flex list-none flex-col gap-4 p-0">
                  {evidence.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/${locale}/projects/${project.slug}`}
                        className={`${focusRing} group block border-l-2 border-blue/50 pl-4 transition-colors hover:border-cyan`}
                      >
                        <span className="block text-base font-medium text-foreground group-hover:text-cyan">
                          {project.title}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted">
                          {project.summary}
                        </span>
                        <span className="mt-2 inline-block text-sm text-blue group-hover:text-cyan">
                          {projectsCopy.viewCase}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : pending.length > 0 ? (
                <div className="mt-4">
                  <p className="font-mono text-[0.65rem] tracking-[0.18em] text-cyan uppercase">
                    {copy.pendingLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{copy.pendingNote}</p>
                  <ul className="mt-4 flex list-none flex-col gap-3 p-0">
                    {pending.map((candidate) => (
                      <li
                        key={candidate.id}
                        className="border border-dashed border-foreground/15 bg-surface px-4 py-3"
                      >
                        <span className="block text-base font-medium text-foreground">
                          {candidate.name}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted">
                          {candidate.focus[locale]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-muted">{copy.emptyEvidence}</p>
              )}
            </div>

            {technologies.length > 0 ? (
              <div className="mt-8 border-t border-foreground/10 pt-6">
                <p className="font-mono text-xs tracking-[0.22em] text-muted uppercase">
                  {projectsCopy.technologies}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2 p-0">
                  {technologies.map((tech) => (
                    <li
                      key={tech}
                      className="list-none border border-foreground/10 px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function indexFromKey(key: string, index: number, count: number): number | null {
  if (key === "ArrowRight" || key === "ArrowDown") {
    return (index + 1) % count;
  }

  if (key === "ArrowLeft" || key === "ArrowUp") {
    return (index - 1 + count) % count;
  }

  if (key === "Home") {
    return 0;
  }

  if (key === "End") {
    return count - 1;
  }

  return null;
}
