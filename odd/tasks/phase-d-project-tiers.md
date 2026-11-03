# Phase D — three-tier project hierarchy

## Objective

Ship a clear hierarchy on the home page: featured showcases (unchanged) → compact relevant projects → brief technical trajectory, without inventing evidence.

## Problem

All projects risk the same visual weight. Secondary engineering work and historical repos need a quieter surface than the three featured showcases.

## Why

Diego asked for three levels so InventoryIQ / TrustScore / AutoStory reinforce evidence without competing with TramitIA, AcademIA, and Partner Intelligence.

## Scope

- Level 1: leave showcases and Hero alone.
- Level 2: publish InventoryIQ, TrustScore, AutoStory Builder as MDX `featured: false` with verified repo URLs only (`Atlaros/AutoStory` public, not private `Autostory_builder`).
- Level 3: curated trajectory entries (AuditorIA, Talentify, Quipu AI, Feedback Classifier) as data + compact UI; no full MDX cases.
- Do not modify `components/capabilities/**` or showcase components.
- Capabilities ML slug wiring deferred to debt (Phase G / follow-up).

## Constraints

- ES / EN / PT. Dark Engineering Premium.
- No invented metrics, demos, or deployments.
- No private repos presented as public.
- No commit/push until Diego reviews.

## Delivery

- Strategy: `ask-on-risk`.
- Forecast: ~400–700 authored lines across MDX + UI + i18n + tests (advisory).
- Route: delegated writer.

## Checklist

- [x] `TASK-040` Optional `participation` on project schema + tests
- [x] `TASK-041` MDX ES/EN/PT for inventoryiq, trustscore, autostory-builder (`featured: false`)
- [x] `TASK-042` Compact RelevantProjects home section + i18n
- [x] `TASK-043` Trajectory data module + TechnicalTrajectory section + GitHub profile exit
- [x] `TASK-044` Wire home order; debt inventory; lint/typecheck/tests/build; responsive spot check

## Acceptance

- Home order: Featured → Relevant → Trajectory → Capabilities → Copilot.
- Level 2 rows show problem, technical solution, technologies, participation, real links.
- Level 3 rows are compact: name, specialty, context, participation, public repo link + Atlaros profile CTA.
- Hero, showcases, Capabilities files unchanged.
