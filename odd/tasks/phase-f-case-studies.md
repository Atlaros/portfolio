# Phase F — Case study depth

## Objective

Strengthen TramitIA, AcademIA, and Partner Intelligence case pages with verified technical narrative without redesigning the home.

## Scope

- Enrich `content/{es,en,pt}/projects/{tramit-ia,academ-ia,partner-intelligence}.mdx` frontmatter (case page reads YAML only).
- Minimal CaseStudy + i18n support for Architecture / Validation / Limitations labels if needed.
- Do not edit Hero, Capabilities, Profile, contact, InventoryIQ/TrustScore/AutoStory, showcases.

## Checklist

- [x] `TASK-060` CaseStudy + schema/i18n for validation/limitations; approach labeled Architecture
- [x] `TASK-061` Rewrite three featured cases ES/EN/PT
- [x] `TASK-062` Debt Phase G (dead MDX bodies); verify lint/typecheck/tests/build + case routes
