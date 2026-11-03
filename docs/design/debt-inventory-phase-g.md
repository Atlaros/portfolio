# Phase G debt inventory — architectural cleanup

**Date:** 2026-11-02  
**Scope:** Remove dead home surfaces, canonical `#capabilities` hash, sync ADR/debt docs. No Hero/showcase redesign.

## Removed

| Path | Reason |
| --- | --- |
| `components/approach/Approach.tsx` | Unused since Phase C (Capabilities shipped) |
| `lib/i18n/approach.ts` | Orphan i18n for deleted Approach |
| `tests/approach-section.test.ts` | Guarded archival; home never mounted Approach |
| `components/hero/HeroFlow.tsx` | Replaced by `ProductStage`; not imported |
| `lib/i18n/hero-flow.ts` | Orphan i18n for deleted HeroFlow |
| `tests/hero-flow.test.ts` | Tests deleted module |
| `lib/capabilities/pending-evidence.ts` | Empty stub; ML slugs live in `config.ts` |

MDX frontmatter field `approach` (architecture narrative) is unchanged.

## Shipped navigation

- Primary section: `id="capabilities"`, heading `id="capabilities-title"`.
- Hero secondary CTA and header capabilities link: `#capabilities` / `/${locale}#capabilities`.
- Temporary zero-height `id="approach"` anchor before the section for legacy inbound links (remove when safe).

## Still deferred

- **Showcase / ProductStage drift** vs blueprint (Iteration B scope; not Phase G).
- **Profile MDX loader** for `content/profile.mdx` and `content/experience.mdx` (Phase E note).
- **Design kit folder** (`cursor-dark-engineering-premium-kit/`) still references deleted components — kit sync optional.
- **Engineering Explorer** (interactive architecture diagram) per UX blueprint §5; Capability Strip remains the shipped home section (ADR-015).

## Verification

Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`. Manual: home scroll targets, project routes, eight WebPs, browser console clean.
