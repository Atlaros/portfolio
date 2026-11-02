# ADR-015 — Engineering Capabilities on the home page

**Status:** Accepted (2026-11-02)

## Decision

The home section formerly titled «Ingeniería en acción» (five work steps) is replaced by **Engineering Capabilities** (`Capacidades de ingeniería`).

The four capabilities are:

1. AI & Agentic Engineering
2. Data Engineering & Analytics
3. Full-Stack Engineering
4. Machine Learning

Each capability states what Diego builds and links only to projects published in MDX. Technologies stay secondary and come from project frontmatter when shown.

The section keeps `id="approach"` in this phase so the Hero secondary CTA (`#approach`) remains valid without editing the approved Hero. Navigation label and secondary CTA copy refer to capabilities.

## Context

Iteration A shipped an interactive Hero. Iteration B shipped product showcases. The five-step «Ingeniería en acción» list duplicated narrative already covered by the Hero and the cases. The PDF portfolio groups practice as RAG/agents, full-stack products, and predictive ML/data pipelines. The design kit lists a Capability Strip anchored in real projects (ADR-014 follow-on work).

## Options not chosen

1. **Keep the five-step list.** Redundant with Hero storytelling and case studies.
2. **Build the architecture explorer («Ingeniería en acción» from the blueprint) in this phase.** Out of Phase C scope; Hero already shows product topologies.
3. **Publish PDF-only ML projects (InventoryIQ, TrustScore, Quipu AI) as featured evidence without MDX.** Would invent catalog entries and risk unverified metrics.

## Motives

- Recruiters need a clear map of capabilities tied to shipped evidence, not another process slogan list.
- MDX remains the source of truth for project facts.
- Machine Learning stays visible as a capability; when no featured MDX case exists, the UI says so instead of inventing a project chip.

## Consequences

- `Approach.tsx` and `lib/i18n/approach.ts` are unused on the home page until Phase G removes or archives them.
- Docs that still require a separate Engineering Approach + Capabilities pair must treat Capabilities as the shipped home section; the architecture explorer remains optional later work, not a duplicate of the Hero.
- Phase G may rename the section id to `capabilities` and update the Hero hash together.

## Review

Reopen if a featured Machine Learning case is published in MDX, or if the Hero CTA hash is allowed to change.
