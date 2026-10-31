"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useEntranceEnabled } from "@/components/motion/use-entrance-enabled";
import type { Locale } from "@/lib/i18n/locales";
import {
  ragDemoCopy,
  runSimulation,
  type QuestionId,
  type SimulationResult,
} from "@/lib/rag/simulation";

const STAGE_SECONDS = 0.28;
const STAGE_RISE_PX = 8;

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

interface RagDemoProps {
  locale: Locale;
}

type RagCopy = (typeof ragDemoCopy)[Locale];

export function RagDemo({ locale }: RagDemoProps) {
  const copy = ragDemoCopy[locale];
  const play = useEntranceEnabled();
  const labelId = useId();
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [questionId, setQuestionId] = useState<QuestionId>(copy.questions[0].id);
  const result = runSimulation(locale, questionId);

  function onGroupKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = copy.questions.findIndex((question) => question.id === questionId);
    const next = questionIndexFromKey(event.key, index, copy.questions.length);
    const question = next === null ? undefined : copy.questions[next];

    if (next === null || !question) {
      return;
    }

    event.preventDefault();
    setQuestionId(question.id);
    optionRefs.current[next]?.focus();
  }

  return (
    <section
      id="simulacion"
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 pb-24 sm:px-8"
    >
      <h2
        id={labelId}
        className="font-mono text-xs tracking-[0.22em] text-muted uppercase"
      >
        {copy.label}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{copy.note}</p>
      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-10">
        <div
          role="radiogroup"
          aria-labelledby={labelId}
          onKeyDown={onGroupKeyDown}
          className="flex flex-col gap-2"
        >
          {copy.questions.map((question, index) => {
            const checked = question.id === questionId;

            return (
              <button
                key={question.id}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                type="button"
                role="radio"
                aria-checked={checked}
                tabIndex={checked ? 0 : -1}
                onClick={() => setQuestionId(question.id)}
                className={`${focusRing} cursor-pointer border border-foreground/10 px-3 py-2 text-left text-sm ${
                  checked ? "bg-surface text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {question.prompt}
              </button>
            );
          })}
        </div>
        <StageBlock play={play} copy={copy} result={result} />
      </div>
    </section>
  );
}

function StageBlock({
  play,
  copy,
  result,
}: {
  play: boolean;
  copy: RagCopy;
  result: SimulationResult;
}) {
  if (!play) {
    return <SimulationStages copy={copy} result={result} />;
  }

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={result.questionId}
        initial={{ opacity: 0, y: STAGE_RISE_PX }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: STAGE_SECONDS, ease: "easeOut" }}
      >
        <SimulationStages copy={copy} result={result} />
      </motion.div>
    </AnimatePresence>
  );
}

function SimulationStages({ copy, result }: { copy: RagCopy; result: SimulationResult }) {
  const selected = result.selected[0];

  if (!selected) {
    return null;
  }

  return (
    <div className="border border-foreground/10 bg-surface p-5 sm:p-6">
      <Stage title={copy.stages.representation}>
        <p className="text-sm leading-relaxed text-muted">{copy.termsCaption}</p>
        <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
          {result.terms.map((term) => (
            <li
              key={term}
              className="border border-foreground/10 px-2 py-1 text-sm text-foreground"
            >
              {term}
            </li>
          ))}
        </ul>
      </Stage>
      <Stage title={copy.stages.retrieval}>
        <ul className="flex list-none flex-col gap-4 p-0">
          {result.retrieved.map((fragment) => (
            <li key={fragment.id}>
              <p className="text-sm leading-relaxed text-foreground">{fragment.text}</p>
              <p className="mt-2 text-sm text-muted">{fragment.source}</p>
              <p className={`mt-2 text-sm ${fragment.matched ? "text-cyan" : "text-muted"}`}>
                {fragment.matched ? copy.match : copy.miss}
              </p>
            </li>
          ))}
        </ul>
      </Stage>
      <Stage title={copy.stages.selection}>
        <p className="text-sm leading-relaxed text-foreground">{selected.text}</p>
      </Stage>
      <Stage title={copy.stages.cited}>
        <figure>
          <blockquote>
            <p className="text-sm leading-relaxed text-foreground">{result.answer}</p>
          </blockquote>
          <figcaption className="mt-3 text-sm text-cyan">{selected.source}</figcaption>
        </figure>
      </Stage>
    </div>
  );
}

function Stage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-foreground/10 py-5 first:border-t-0 first:pt-0 last:pb-0">
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function questionIndexFromKey(key: string, index: number, length: number): number | null {
  if (length === 0) {
    return null;
  }

  if (key === "ArrowDown" || key === "ArrowRight") {
    return (index + 1) % length;
  }

  if (key === "ArrowUp" || key === "ArrowLeft") {
    return (index - 1 + length) % length;
  }

  if (key === "Home") {
    return 0;
  }

  if (key === "End") {
    return length - 1;
  }

  return null;
}
