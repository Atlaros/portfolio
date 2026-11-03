# Phase G — Architectural cleanup

## Objective

Reduce obsolete code and redundancy without changing approved public UX or features.

## Problem

Phases C–F deferred dead Approach/HeroFlow surfaces, `#approach` hash rename, and empty `pending-evidence` stub.

## Scope

- Delete unreachable Approach + HeroFlow bundles and orphaned tests.
- Remove unused `pending-evidence.ts`; keep ML evidence via `config.ts`.
- Rename home section hash to `#capabilities` with temporary `#approach` compat anchor.
- Sync debt/ADR wording that still claims `#approach` as the only id.
- No Hero/showcase/Capabilities/Contact redesign; no MDX migration; no `docs/design/review/**` deletes.

## Constraints

- Same public functionality and experience.
- No new dependencies.
- No commit/push until Diego reviews.
- Base: `949fc68` on `feat/portfolio-dark-engineering`.

## Delivery

- Strategy: `ask-on-risk` (no commit this phase until review).
- Forecast: ~small (<400 authored lines).

## Tasks

- [x] G1 Delete Approach.tsx, lib/i18n/approach.ts, tests/approach-section.test.ts
- [x] G2 Delete HeroFlow.tsx, lib/i18n/hero-flow.ts, tests/hero-flow.test.ts
- [x] G3 Delete pending-evidence.ts; adjust capabilities-section tests
- [x] G4 id=capabilities + temporary #approach compat; update Hero + Header hrefs
- [x] G5 Update capabilities/product-stage tests for new ids; keep anti-regression asserts
- [x] G6 Sync ADR-015 + debt inventories C/D/E (+ Phase G inventory)
- [x] G7 lint, typecheck, tests, build; verify home + project routes; WebP + browser console

## Acceptance

- Dead modules gone; no broken imports.
- `#capabilities` is the canonical nav target; `#approach` still scrolls to the same section.
- No visual redesign; eight WebPs still resolve.
- All checks green.
