# Feature: Simplify ProductStage architecture viz

## Objective

Keep the interactive architecture diagram in the hero, but make it visually lighter: no side detail panel, fewer chrome boxes.

## Problem

The current ProductStage reads as a dense dual-column inspector (graph + lateral QUE SUCEDE / POR QUÉ / EN ESTA ETAPA panel, architecture chip boxes, double frame). Diego wants the architecture part kept, but simpler.

## Why

First viewport should show engineering without looking like a control-panel demo.

## Scope

- `components/hero/ProductStage.tsx`
- `tests/product-stage.test.ts`
- `lib/i18n/product-stage.ts` only if copy keys must change for the compact detail

Out of scope: hero photo / GitHub / email / LinkedIn (separate); do not remove or invent architecture stages/nodes.

## Constraints

- Dark Engineering Premium (ADR-014): solid white titles, cyan for action/focus, blue for depth; no violet hero gradients.
- Do not invent technologies or metrics; keep MDX/scene facts.
- Preserve activePath / forkBranchKeys / aria-pressed exploration.
- ES/EN/PT copy stays coherent.
- Respect `prefers-reduced-motion`.

## Tasks

- [x] T1: Remove lateral detail panel layout; put one compact selected-stage line under the graph (happens + optional tech; no three-section boxed aside)
- [x] T2: Reduce chrome boxes — architecture as compact text (not chip pills); drop offset double-frame; tighten StageNode density
- [x] T3: Trim ProductStage intro chrome above the card (fewer stacked helper paragraphs)
- [x] T4: Update `tests/product-stage.test.ts` for new composition; run focused vitest

## Acceptance

- No `lg:grid-cols-[minmax(0,1.05fr)_minmax(13.5rem,0.95fr)]` side panel.
- Selecting a node still updates readable stage detail below the graph.
- Architecture strip remains (documented pieces) without pill-chip wall.
- Scene graphs / links / captions / case links unchanged in meaning.
- `npx vitest run tests/product-stage.test.ts` passes.

## Route

Delegated writer (2+ non-trivial files: ProductStage + tests).

## Progress

Completed T1–T4 on `feat/simplify-product-stage-architecture`.
Verification: `npx vitest run tests/product-stage.test.ts` → 10 passed.
Work-unit commit on this branch: `refactor: simplify ProductStage architecture presentation` (`7338864bd0998c4699b3946de77e809a0d928238`).
