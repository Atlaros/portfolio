"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { CaptureFrame, CaptureImage } from "@/components/projects/CaptureFrame";
import { focusRing, ProjectLinks } from "@/components/projects/ProjectLinks";
import type { Project } from "@/domain/project";
import { showcaseCopy } from "@/lib/i18n/showcase";
import type { Locale } from "@/lib/i18n/locales";

function stackClass(index: number, active: number): string {
  if (index === active) {
    return "xl:top-0 xl:left-[14%] xl:z-30 xl:w-[80%] xl:opacity-100";
  }

  if (index < active) {
    return "xl:top-8 xl:left-0 xl:z-10 xl:w-[64%] xl:opacity-55";
  }

  return "xl:top-14 xl:right-0 xl:z-20 xl:w-[58%] xl:opacity-70";
}

function AcademShowcase({ locale, project }: { locale: Locale; project: Project }) {
  const copy = showcaseCopy[locale];
  const shots = project.screenshots ?? [];
  const labels = copy.states["academ-ia"];
  const [index, setIndex] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = shots[index] ?? shots[0];
  const baseId = `${project.slug}-states`;

  if (selected === undefined) {
    return null;
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (index + 1) % shots.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (index - 1 + shots.length) % shots.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? shots.length - 1
              : null;

    if (next === null) {
      return;
    }

    event.preventDefault();
    setIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <article className="grid items-start gap-8 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] xl:gap-10">
      <div>
        <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">{project.tagline}</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{project.summary}</p>
        <div
          role="tablist"
          aria-label={project.title}
          onKeyDown={onKeyDown}
          className="mt-6 flex flex-wrap gap-2"
        >
          {labels.map((label, labelIndex) => {
            const active = labelIndex === index;

            return (
              <button
                key={label}
                ref={(node) => {
                  tabs.current[labelIndex] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-${labelIndex}`}
                aria-selected={active}
                aria-controls={`${baseId}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => setIndex(labelIndex)}
                className={`${focusRing} min-h-11 cursor-pointer border px-4 text-sm font-medium ${
                  active
                    ? "border-cyan bg-cyan text-background"
                    : "border-foreground/15 bg-surface text-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-${index}`} className="mt-4">
          <p className="text-sm leading-relaxed text-foreground/90">{selected.caption}</p>
        </div>
        <ProjectLinks locale={locale} project={project} />
      </div>
      <div className="xl:relative xl:min-h-[32rem]">
        {shots.map((shot, shotIndex) => {
          const active = shotIndex === index;

          return (
            <div
              key={shot.src}
              className={`${active ? "block" : "hidden"} motion-safe:transition-[transform,opacity] motion-safe:duration-300 xl:absolute xl:block ${stackClass(shotIndex, index)}`}
            >
              <CaptureFrame>
                <CaptureImage src={shot.src} alt={active ? shot.alt : ""} />
              </CaptureFrame>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export { AcademShowcase };
