"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEntranceEnabled } from "@/components/motion/use-entrance-enabled";
import { approachCopy } from "@/lib/i18n/approach";
import type { Locale } from "@/lib/i18n/locales";

const TOUR_INTERVAL_MS = 2800;
const PANEL_SECONDS = 0.28;
const PANEL_RISE_PX = 8;
const LAST_STEP_INDEX = approachCopy.es.steps.length - 1;

const focusRing =
  "rounded-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan";

interface ApproachProps {
  locale: Locale;
}

type ApproachStep = (typeof approachCopy)[Locale]["steps"][number];

export function Approach({ locale }: ApproachProps) {
  const copy = approachCopy[locale];
  const play = useEntranceEnabled();
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tourCancelled = useRef(false);
  const inView = useInView(sectionRef, { amount: "some", initial: false });
  const [index, setIndex] = useState(0);
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const step = copy.steps[index] ?? copy.steps[0];

  useEffect(() => {
    if (!play || !inView || tourCancelled.current || index >= LAST_STEP_INDEX) {
      return;
    }

    const node = sectionRef.current;

    if (node && sectionIsEngaged(node)) {
      tourCancelled.current = true;
      return;
    }

    const timer = window.setTimeout(() => {
      const current = sectionRef.current;

      if (tourCancelled.current) {
        return;
      }

      if (current && sectionIsEngaged(current)) {
        tourCancelled.current = true;
        return;
      }

      setIndex((currentIndex) =>
        currentIndex >= LAST_STEP_INDEX ? currentIndex : currentIndex + 1,
      );
    }, TOUR_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [play, inView, index]);

  function cancelTour() {
    tourCancelled.current = true;
  }

  function selectStep(next: number) {
    cancelTour();
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
    <section
      id="approach"
      ref={sectionRef}
      aria-labelledby="approach-title"
      onMouseEnter={cancelTour}
      onFocus={cancelTour}
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 pb-24 sm:px-8"
    >
      <p className="font-mono text-xs tracking-[0.22em] text-muted uppercase">
        {copy.eyebrow}
      </p>
      <h2
        id="approach-title"
        className="mt-4 max-w-3xl text-2xl font-medium tracking-tight text-foreground sm:text-3xl"
      >
        {copy.title}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
        {copy.lead}
      </p>
      <div className="mt-12 grid grid-cols-1 items-start gap-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-16">
        <div
          role="tablist"
          aria-labelledby="approach-title"
          aria-orientation="vertical"
          onKeyDown={onTabsKeyDown}
          className="flex flex-wrap gap-x-5 gap-y-2 md:flex-col md:flex-nowrap md:gap-1"
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
                className={`${focusRing} relative cursor-pointer py-2 pr-2 pl-4 text-left text-base font-medium md:w-full ${
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
    </section>
  );
}

function ActiveBar({ play }: { play: boolean }) {
  if (!play) {
    return (
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-0.5 bg-cyan"
      />
    );
  }

  return (
    <motion.span
      aria-hidden
      layoutId="approach-active-bar"
      className="absolute inset-y-0 left-0 w-0.5 bg-cyan"
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
  step: ApproachStep;
  stepKey: number;
}) {
  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={labelledBy}
      tabIndex={0}
      className={`${focusRing} min-w-0 border border-foreground/10 bg-surface p-6 sm:p-8`}
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

function StepCopy({ step }: { step: ApproachStep }) {
  return (
    <>
      <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
        {step.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-foreground">{step.body}</p>
      <p className="mt-6 border-t border-foreground/10 pt-6 text-sm leading-relaxed text-muted">
        {step.evidence}
      </p>
    </>
  );
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

function sectionIsEngaged(node: HTMLElement): boolean {
  if (node.matches(":hover")) {
    return true;
  }

  const active = document.activeElement;

  return active instanceof Node && node.contains(active);
}
