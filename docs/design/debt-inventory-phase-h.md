# Phase H — Design and publication debt inventory

## SEO and domain

- Production domain is still pending final choice.
- Set `NEXT_PUBLIC_SITE_URL` on Vercel (and locally in `.env`) before launch so canonical URLs, Open Graph links, and `sitemap.xml` resolve to the public origin (without it, URLs fall back to `VERCEL_URL` or `http://localhost:3000`).

## Content

- RAG AcademIA marketing fragment still says “local machine” in `lib/rag/simulation.ts`; deferred while `RagDemo` stays unmounted on the public home.
- Published TrustScore/InventoryIQ MDX bodies remain unused by `CaseStudy` (frontmatter-only); optional cleanup later.

## Engineering

- CI workflow (lint, typecheck, test, build on PR) is still missing from the repository.
- Lighthouse performance on local production (`/es`): ~64 — LCP ~3.8s and TBT elevated under headless audit; treat as post-launch optimization, not a content blocker.
- Favicon added as `app/icon.svg` (Phase H QA) after console 404 on `/favicon.ico`.

## Hosting

- Documented target: **Vercel** (`docs/07-DEPLOYMENT.md`). Not GitHub Pages (no `output: 'export'`; Node/`next start` path).
