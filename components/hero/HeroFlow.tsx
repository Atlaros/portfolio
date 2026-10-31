"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useEntranceEnabled } from "@/components/motion/use-entrance-enabled";
import { heroFlowCopy } from "@/lib/i18n/hero-flow";
import type { Locale } from "@/lib/i18n/locales";

const PANEL_SECONDS = 0.28;
const PANEL_RISE_PX = 8;
const LAST_STEP_INDEX = heroFlowCopy.es.steps.length - 1;

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

interface HeroFlowProps {
  locale: Locale;
}

interface ProductStepCopy {
  linkLabel: string;
  linkHref: string;
}

type HeroFlowStep = (typeof heroFlowCopy)[Locale]["steps"][number];

export function HeroFlow({ locale }: HeroFlowProps) {
  const copy = heroFlowCopy[locale];
  const play = useEntranceEnabled();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [index, setIndex] = useState(0);
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const labelId = `${baseId}-label`;
  const step = copy.steps[index] ?? copy.steps[0];

  function selectStep(next: number) {
    setIndex(next);
  }

  function onTabsKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const next = stepFromKey(event.key, index);

    if (next === null) {
      return;
    }

    event.preventDefault();
    selectStep(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="w-full min-w-0 lg:w-[min(100%,34rem)] lg:shrink-0">
      <p
        id={labelId}
        className="font-mono text-xs tracking-[0.22em] text-muted uppercase"
      >
        {copy.label}
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{copy.note}</p>
      <div className="mt-6 grid grid-cols-1 items-start gap-6 md:grid-cols-[9.5rem_minmax(0,1fr)] md:gap-8">
        <div
          role="tablist"
          aria-labelledby={labelId}
          aria-orientation="vertical"
          onKeyDown={onTabsKeyDown}
          className="flex flex-col border-l border-foreground/10"
        >
          {copy.steps.map((item, stepIndex) => {
            const selected = stepIndex === index;
            const tabId = `${baseId}-tab-${stepIndex}`;

            return (
              <button
                key={item.title}
                ref={(node) => {
                  tabRefs.current[stepIndex] = node;
                }}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectStep(stepIndex)}
                className={`${focusRing} relative cursor-pointer py-2 pr-2 pl-4 text-left text-sm font-medium ${
                  selected ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {selected ? <ActiveBar play={play} /> : null}
                {item.title}
              </button>
            );
          })}
        </div>
        <StepPanel
          play={play}
          panelId={panelId}
          labelledBy={`${baseId}-tab-${index}`}
          step={step}
          stepKey={index}
        />
      </div>
    </div>
  );
}

function ActiveBar({ play }: { play: boolean }) {
  if (!play) {
    return <span aria-hidden className="absolute inset-y-0 -left-px w-0.5 bg-cyan" />;
  }

  return (
    <motion.span
      aria-hidden
      layoutId="hero-flow-bar"
      className="absolute inset-y-0 -left-px w-0.5 bg-cyan"
      transition={{ duration: PANEL_SECONDS, ease: "easeOut" }}
    />
  );
}

function StepPanel({
  play,
  panelId,
  labelledBy,
  step,
  stepKey,
}: {
  play: boolean;
  panelId: string;
  labelledBy: string;
  step: HeroFlowStep;
  stepKey: number;
}) {
  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={labelledBy}
      tabIndex={0}
      className={`${focusRing} min-w-0 border border-foreground/10 bg-surface p-5 sm:p-6`}
    >
      {play ? (
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={stepKey}
            initial={{ opacity: 0, y: PANEL_RISE_PX }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: PANEL_SECONDS, ease: "easeOut" }}
          >
            <StepCopy step={step} />
          </motion.div>
        </AnimatePresence>
      ) : (
        <StepCopy step={step} />
      )}
    </div>
  );
}

function StepCopy({ step }: { step: HeroFlowStep }) {
  return (
    <>
      <h2 className="text-lg font-medium tracking-tight text-foreground">{step.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-foreground">{step.body}</p>
      <p className="mt-4 border-t border-foreground/10 pt-4 text-sm leading-relaxed text-muted">
        {step.evidence}
      </p>
      {isProductStep(step) ? (
        <a
          href={step.linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${focusRing} mt-4 inline-flex text-sm font-medium text-cyan`}
        >
          {step.linkLabel}
        </a>
      ) : null}
    </>
  );
}

function isProductStep(step: HeroFlowStep): step is HeroFlowStep & ProductStepCopy {
  return "linkHref" in step && "linkLabel" in step;
}

function stepFromKey(key: string, index: number): number | null {
  if (key === "ArrowDown") {
    return Math.min(index + 1, LAST_STEP_INDEX);
  }

  if (key === "ArrowUp") {
    return Math.max(index - 1, 0);
  }

  if (key === "Home") {
    return 0;
  }

  if (key === "End") {
    return LAST_STEP_INDEX;
  }

  return null;
}
