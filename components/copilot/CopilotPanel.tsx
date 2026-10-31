"use client";

import { useId, useState } from "react";
import type { Project } from "@/domain/project";
import { answerQuestion, type AnswerResult } from "@/lib/copilot/answer";
import { copilotCopy, type CopilotCopy } from "@/lib/i18n/copilot";
import type { Locale } from "@/lib/i18n/locales";

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

interface CopilotPanelProps {
  locale: Locale;
  projects: readonly Project[];
}

interface CopilotAnswerProps {
  result: AnswerResult;
  copy: CopilotCopy;
}

export function CopilotPanel({ locale, projects }: CopilotPanelProps) {
  const copy = copilotCopy[locale];
  const labelId = useId();
  const inputId = useId();
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<AnswerResult | null>(null);

  function ask(next: string) {
    setQuestion(next);
    setResult(answerQuestion(next, projects, locale));
  }

  return (
    <section
      id="copilot"
      aria-labelledby={labelId}
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 pb-24 sm:px-8"
    >
      <h2
        id={labelId}
        className="font-mono text-xs tracking-[0.22em] text-muted uppercase"
      >
        {copy.label}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{copy.note}</p>
      <form
        className="mt-8 flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          ask(question);
        }}
      >
        <input
          id={inputId}
          value={question}
          placeholder={copy.placeholder}
          aria-labelledby={labelId}
          onChange={(event) => setQuestion(event.target.value)}
          className={`${focusRing} min-w-0 flex-1 border border-foreground/10 bg-surface px-3 py-2 text-sm text-foreground`}
        />
        <button
          type="submit"
          className={`${focusRing} cursor-pointer border border-foreground/10 bg-surface px-3 py-2 text-sm text-foreground`}
        >
          {copy.ask}
        </button>
      </form>
      <ul className="mt-4 flex list-none flex-col gap-2 p-0 sm:flex-row sm:flex-wrap">
        {copy.suggestions.map((suggestion) => (
          <li key={suggestion}>
            <button
              type="button"
              onClick={() => ask(suggestion)}
              className={`${focusRing} cursor-pointer border border-foreground/10 px-3 py-2 text-left text-sm text-muted hover:text-foreground`}
            >
              {suggestion}
            </button>
          </li>
        ))}
      </ul>
      {result ? <CopilotAnswer result={result} copy={copy} /> : null}
    </section>
  );
}

function CopilotAnswer({ result, copy }: CopilotAnswerProps) {
  if (!result.ok) {
    const message = result.reason === "empty" ? copy.empty : copy.tooLong;
    return (
      <p role="status" className="mt-8 text-sm leading-relaxed text-foreground">
        {message}
      </p>
    );
  }

  if (result.kind === "refusal") {
    return (
      <p role="status" className="mt-8 text-sm leading-relaxed text-foreground">
        {copy.refusal}
      </p>
    );
  }

  return (
    <ul className="mt-8 flex list-none flex-col gap-4 p-0">
      {result.items.map((item) => (
        <li key={item.id} className="border border-foreground/10 bg-surface p-5 sm:p-6">
          <h3 className="text-lg font-medium tracking-tight text-foreground">{item.title}</h3>
          <p className="mt-2 font-mono text-xs tracking-[0.22em] text-muted uppercase">
            {copy.maturity[item.maturity]}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground">{item.excerpt}</p>
        </li>
      ))}
    </ul>
  );
}
