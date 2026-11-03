# Iteration C — debt inventory

**Date:** 2026-11-02  
**Scope:** Phase C — Engineering Capabilities on the home page (ADR-015)

## Shipped

- Home section `Capacidades de ingeniería` / `Engineering capabilities` / `Capacidades de engenharia` via `components/capabilities/*`.
- Section id was `approach` during Phase C; **Phase G** renamed canonical hash to `#capabilities` (Hero + header) with a temporary `#approach` compat anchor.
- Header nav label uses capabilities copy; href is now `/${locale}#capabilities`.
- Evidence slugs limited to published MDX: `tramit-ia`, `academ-ia`, `partner-intelligence`. Machine Learning shows an honest empty note.

## Deferred to Phase G — **done (2026-11-02)**

- Removed `components/approach/Approach.tsx` and `lib/i18n/approach.ts`.
- Renamed section id to `capabilities`; Hero and header use `#capabilities`; temporary `#approach` compat anchor retained.
- Optional **Engineering Explorer** (blueprint §5): interactive architecture diagram distinct from Hero `ProductStage` — not part of Phase C.
- `lib/capabilities/pending-evidence.ts` was removed in Phase G; ML slugs live in `lib/capabilities/config.ts` only.

## Doc drift

- `docs/design/UX-UI-BLUEPRINT.md` §5 still describes the architecture explorer as the replacement for Approach; Phase C shipped the Capability Strip instead (ADR-015).
- `docs/design/IMPLEMENTATION-ROADMAP.md` Hito 4 checklist partially satisfied by capabilities; explorer remains open.

## Content gaps

- No featured MDX case for **Machine Learning**; do not invent InventoryIQ, TrustScore, or Quipu AI as catalog evidence.
- Capabilities section shows **project name links only** — no taglines and no aggregated `project.technologies` (those stacks are case-level and misattribute UI/auth tools to a specialty).
- Specialty tech lines need either a curated `CAPABILITY_TECH_FOCUS` allowlist or MDX `capabilityTech` scoped to the claim; not implemented until a specialty needs that line.

## Observed during Phase C

- Hydration overlay in Cursor browser: false positive. Diff is only injected `data-cursor-ref` attributes. Clean headless Chrome shows no hydration error. ProductStage was not changed.
- Unused legacy Approach bundle deleted in Phase G (see `docs/design/debt-inventory-phase-g.md`).
- Staged Iteration A set and untracked Iteration B/C assets remain uncommitted by user request.
- ML evidence slugs: `inventoryiq`, `trustscore` in `CAPABILITY_EVIDENCE_SLUGS.ml`; not catalog invention.
