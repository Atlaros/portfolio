import { approachCopy } from "@/lib/i18n/approach";
import type { Locale } from "@/lib/i18n/locales";

interface ApproachProps {
  locale: Locale;
}

export function Approach({ locale }: ApproachProps) {
  const copy = approachCopy[locale];

  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 pb-24 sm:px-8"
    >
      <p className="font-mono text-xs tracking-[0.22em] text-muted uppercase">
        {copy.eyebrow}
      </p>
      <h2
        id="approach-title"
        className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {copy.title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{copy.lead}</p>
      <ol className="mt-10 flex list-none flex-col gap-4 p-0">
        {copy.steps.map((step, index) => (
          <li
            key={step.title}
            className="grid gap-3 border border-foreground/10 bg-surface p-5 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:p-6"
          >
            <span className="font-mono text-sm text-cyan">{index + 1}</span>
            <div>
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{step.body}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.evidence}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
