# Debt inventory — Phase F (case studies)

## Resolved in Phase F

- Featured case MDX historically duplicated the YAML narrative in Markdown body sections (`## Problem` / `## Solution` / …). Case pages read frontmatter only, so those bodies were dead content. Bodies are now empty after the closing `---` to avoid drift.
- Pre-commit audit vs `f27f5d9` bodies for TramitIA, AcademIA, and Partner Intelligence: the removed Markdown only restated frontmatter `problem` / `solution` / `approach` (Partner lacked Approach in the body). No unique technical facts were present only in the body; architecture, decisions, validation, and limitations live in frontmatter.

## AcademIA hosting honesty

Portfolio case copy distinguishes (1) the application packaged for a single-instance AWS EC2 path (Docker + Caddy), (2) the editorial catalog curated primarily in local Postgres, and (3) program rows marked published inside that catalog. No public demo URL is listed. Screenshot catalog counts remain non-KPI.

## Open / watch

- Optional future MDX body renderer: if case pages ever render the MDX body, restore a deliberate body contract instead of frontmatter-only narrative.
- Showcase vs case AcademIA drift closed in Phase G pre-commit: Product Stage ES/EN/PT now matches case honesty (EC2-ready app, local editorial catalog, no listed public demo).
- If Diego later authorizes a stable public AcademIA URL, add `liveUrl` only after verification.
- RAG demo AcademIA fragment may still say “local machine”; out of Phase G showcase scope — revisit in Phase H if needed.
