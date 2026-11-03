import { trajectoryCopy } from "@/lib/i18n/trajectory";
import type { Locale } from "@/lib/i18n/locales";
import { trajectoryEntries } from "@/lib/trajectory/entries";

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

interface TechnicalTrajectoryProps {
  locale: Locale;
}

export function TechnicalTrajectory({ locale }: TechnicalTrajectoryProps) {
  const copy = trajectoryCopy[locale];

  return (
    <section
      aria-labelledby="technical-trajectory-title"
      className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8"
    >
      <h2
        id="technical-trajectory-title"
        className="max-w-3xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {copy.title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{copy.lead}</p>

      <ul className="mt-6 border-t border-foreground/10">
        {trajectoryEntries.map((entry) => (
          <li
            key={entry.id}
            className="flex flex-col gap-1 border-b border-foreground/10 py-3.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3 sm:gap-y-1"
          >
            <a
              href={entry.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`shrink-0 text-sm font-medium text-cyan ${focusRing}`}
            >
              {entry.name}
            </a>
            <span className="hidden text-muted sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="text-sm text-foreground/90">{entry.specialty[locale]}</span>
            <span className="hidden text-muted sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="text-sm text-muted">{entry.context[locale]}</span>
            <span className="font-mono text-[0.65rem] tracking-[0.16em] text-muted uppercase sm:ml-auto">
              {copy.participation[entry.participation]}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-5">
        <a
          href={copy.githubProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex text-sm text-cyan ${focusRing}`}
        >
          {copy.githubProfileLabel}
        </a>
      </p>
    </section>
  );
}
