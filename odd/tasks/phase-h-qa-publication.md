# Phase H — Final QA and publication readiness

## Objective

Validate the portfolio is production-ready without redesign or scope expansion.

## Base

- Branch: `feat/portfolio-dark-engineering`
- Commit: `09c0d0f` (+ uncommitted Phase H SEO/favicon fixes pending review)
- Phases A–G closed.

## Scope

- Functional audit (home, cases, nav, copilot, links, images)
- Technical gates + browser/responsive/a11y/performance
- SEO/metadata proven gaps only
- Security/env/hosting audit
- Git/deploy procedure (no merge/push/deploy)

## Constraints

- No redesign, new sections, or unrelated refactors.
- No commit/push until Diego reviews the GO/NO-GO report.
- Exclude `.codegraph/`, `docs/design/review/**`, temp files from any future commit.
- Do not invent AcademIA public demo.

## Tasks

- [x] H1 Functional route and content audit ES/EN/PT
- [x] H2 Automated gates (lint, typecheck, tests, build)
- [x] H3 Browser QA (viewports, keyboard, reduced motion, console)
- [x] H4 SEO/metadata audit; fix proven gaps (metadata, sitemap, robots, icon, `.env.example` un-ignore)
- [x] H5 Security, env, copilot failure mode, hosting reality
- [x] H6 Git vs main + deploy procedure (documented; not executed)
- [x] H7 Deliver GO/NO-GO report

## Delivery

- Strategy: ask-on-risk; no commit until report approval.

## Deploy procedure (do not execute until approved)

1. Commit Phase H working tree (exclude `.codegraph/`, `docs/design/review/**`).
2. Push `feat/portfolio-dark-engineering` to `origin`.
3. Open PR into `main` (6 commits ahead of `main` plus H commit).
4. Connect/confirm Vercel project for `Atlaros/portfolio`.
5. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
6. Merge PR → Vercel production deploy.
7. Smoke-check `/es`, `/sitemap.xml`, `/robots.txt`, favicon, contact links.
