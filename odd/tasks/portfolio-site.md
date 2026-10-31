# Portfolio site

## Objective

Ship the V1 portfolio site for Diego Borges: a trilingual page that presents case studies and links out to deployed projects.

## Problem

The repository is a product definition. There is no Next.js app, so nothing can be opened in a browser.

## Why

ADR-011 is accepted (`es`, `en`, `pt`, default `es`). The implementation plan says the next step is `TASK-001`.

## Scope

- `TASK-001` is done.
- This pass: rebuild the approach section so it stops reading as five empty slogans. Use the two real projects as evidence. No new metrics, portrait, or social links.

## Constraints

- Preserve `README.md`, `AGENTS.md`, `docs/`, `CHANGELOG-DOCS.md`, and the existing placeholder MDX files.
- Do not move `content/profile.mdx`, `content/experience.mdx`, or `content/projects/_template.mdx` in this task.
- Next.js 16 uses `proxy.ts`, not `middleware.ts`.
- Locales are a const object in `lib/i18n/locales.ts`, not a bare union type.
- UI strings for the scaffold page exist in `es`, `en`, and `pt`.
- This directory is not a git repository. Do not run `git init` and do not commit.

## Delivery

- Strategy: `ask-on-risk`.
- Forecast for `TASK-001`: under 400 authored lines, lockfile excluded.
- Route: delegated writer. Trigger: new app touches many non-trivial files.

## Checklist

- [x] `TASK-001` Create the Next.js base and locale routes
  - Acceptance: met. Next.js 16.4.3, React 19.3.0, Tailwind 4.
  - Risk: medium. Writer self-check plus parent spot check.
  - Checks: `npm test` passed (3 tests, re-run by parent). Writer reported `typecheck`, `lint`, and `build` passed. Browser: `/` returns 307 to `/es`; `/en` and `/pt` render; Enter on Português opens `/pt`.
  - Commit: skipped. The folder is not a git repository.

- [x] `TASK-002` Design tokens and base UI. Typography accepted: Geist Sans + Geist Mono via `next/font`. Route: delegated writer.
  - Acceptance: met. ADR-013 accepted. Tokens in `app/globals.css`. `Geist` and `Geist_Mono` on `app/[locale]/layout.tsx`.
  - Risk: medium. Writer self-check. Presentational change.
  - RED/GREEN: does not apply. No new function. The change is presentational and `tests/locales.test.ts` is the regression check.
  - Checks: `npm test` passed (1 file, 3 tests). `npm run typecheck` passed. `npm run lint` passed. `npm run build` passed (Next.js 16.4.3, Cache Components on, static `/es`, `/en`, `/pt`).
  - Commit: skipped. The folder is not a git repository.
- [x] `TASK-003` Navbar, hero, and motion base. Same pass as `TASK-002`, because the scaffold page is still the only screen. Route: delegated writer.
  - Acceptance: met. Sticky header with locale switcher. Hero copy in `es`, `en`, and `pt`. Gradient only on line 2. CSS fade disabled under `prefers-reduced-motion: reduce`. Scaffold sentence removed.
  - Risk: medium. Writer self-check. Presentational change.
  - RED/GREEN: does not apply. No new function. The change is presentational and `tests/locales.test.ts` is the regression check.
  - Checks: same run as `TASK-002`. `npm test` passed (1 file, 3 tests). `npm run typecheck` passed. `npm run lint` passed. `npm run build` passed. Built HTML contains the locale headlines and `hero-highlight`; CSS contains `#080a12`, `#985cff`, and `prefers-reduced-motion`. Parent re-ran `npm test` (3 passed) and checked `/es` in the browser at desktop and 390px: header, headline, and language links are visible.
  - Commit: skipped. The folder is not a git repository.
- [x] `TASK-004` Project content model. Zod schema, MDX under `content/<locale>/projects/`, published projects only. Route: delegated writer.
  - Acceptance: met. `zod` 4.6.7 and `gray-matter` 4.0.3. Categories, status, and maturity are const objects. Quantitative metrics require `source` when the value contains a digit. Empty `liveUrl` parses as absent. Published projects: `tramit-ia` (`demo`, `ai`) and `academ-ia` (`prototype`, `data-engineering`) in `es`, `en`, and `pt`.
  - Risk: medium. Writer self-check. Schema plus content loading.
  - RED/GREEN: RED was `Cannot find package '@/domain/project' imported from tests/project-schema.test.ts` (0 tests in that file; locales file still 3 passed). GREEN: `npm test` passed (2 files, 8 tests).
  - Checks: `npm test` passed (2 files, 8 tests). `npm run typecheck` passed. `npm run lint` passed. `npm run build` passed (Next.js 16.4.3, Cache Components on). `generateStaticParams` prerendered `/es`, `/en`, and `/pt` for `tramit-ia` and `academ-ia`. `export const instant = false` was not required on the case page.
  - Commit: skipped. The folder is not a git repository.
- [x] `TASK-005` Featured projects on the home page, from that model. Same pass.
  - Acceptance: met. Home section Proyectos / Projects / Projetos under the hero. One card per featured published project. Link label Ver el caso / View the case / Ver o caso. No Live Demo control.
  - Risk: medium. Writer self-check. Presentational change fed by the published loader.
  - RED/GREEN: does not apply. No new schema assertion. Covered by the same `npm test` run as `TASK-004`.
  - Checks: same run as `TASK-004`. Prerendered `/es`, `/en`, and `/pt` include the section title, both project titles, and the case link. `Live Demo` is absent.
  - Commit: skipped. The folder is not a git repository.
- [x] `TASK-006` Dynamic case study for a published slug. Same pass.
  - Acceptance: met. Unknown slug calls `notFound()`. Published page order: problem, why it matters, solution, approach, engineering decisions, benefits, technologies. Back link to `/${locale}`.
  - Risk: medium. Writer self-check. Route plus content rendering.
  - RED/GREEN: does not apply. No new schema assertion. Covered by the same `npm test` run as `TASK-004`.
  - Checks: same run as `TASK-004`. Prerendered HTML for `/es/projects/tramit-ia` keeps that section order, and `/en/projects/academ-ia` includes the engineering decisions and technologies.
  - Commit: skipped. The folder is not a git repository.
- [x] `TASK-007` Catalog and area filters. Route: delegated writer.
  - Acceptance: met. `/${locale}/projects` lists every published project. Filters are links for all, `analytics`, `data-science`, `ai`, and `data-engineering`. An unknown `area` shows the empty sentence and does not throw. Home stays hero plus featured projects, with a catalog link on that section. Header link sits between the name and the language switcher. No Live Demo.
  - Risk: medium. Writer self-check. Pure filter plus presentational routes.
  - RED: `Cannot find package '@/lib/projects/filter-projects' imported from /home/borges/Documentos/GitHub/portfolio/tests/filter-projects.test.ts`. That file loaded 0 tests. `Test Files  1 failed | 2 passed (3)`. `Tests  8 passed (8)`.
  - GREEN: `npm test` passed (3 files, 11 tests).
  - Checks: `npm test` passed (3 files, 11 tests). `npm run typecheck` passed. `npm run lint` passed. `npm run build` passed (Next.js 16.4.3, Cache Components on). `/[locale]/projects` is dynamic: the page awaits `searchParams` and sets `instant = false`, so the filtered HTML is in the document. Browser: `/es/projects` shows TramitIA and AcademIA; `?area=ai` shows only TramitIA; `?area=analytics` keeps the filter nav and the empty sentence; the home Catálogo link opens `/es/projects`. `Live Demo` is absent.
  - Commit: skipped. The folder is not a git repository.
- [x] Motion pass. `motion` with `prefers-reduced-motion`. No invented photo or social URLs. Route: delegated writer.
  - Acceptance: met. `motion` 14.6.0. Locale layout wraps body children in a client `MotionConfig` with `reducedMotion="user"`. Hero fades and rises 8px over 0.4s. CSS `.hero-fade` removed so it does not double the entrance. Gradient stays on the second headline line. Home and catalog cards fade in, staggered by 0.08s and capped so the last card starts within 0.2s. Below 768px the stagger delay is 0. Hover lifts the card 4px, with no tilt. Reduced motion keeps the server-visible tree: no opacity 0, and hover does not move the card.
  - Risk: medium. Writer self-check. Presentational change.
  - RED/GREEN: does not apply. No new pure function. The change is presentational and `npm test` is the regression check.
  - Checks: `npm test` passed (3 files, 11 tests). `npm run typecheck` passed. `npm run lint` passed. `npm run build` passed (Next.js 16.4.3, Cache Components on, static `/es`, `/en`, `/pt`).
  - Commit: skipped. The folder is not a git repository.
- [ ] `TASK-008` Engineering approach on the home page. About, experience, and contact stay open until real profile, roles, and links exist. Route: delegated writer.
  - Approach section shipped. Home order: hero, `id="approach"`, featured projects. Header link `/${locale}#approach` (Enfoque / Approach / Abordagem) sits with the projects link and is not current. Copy is the work sequence in `es`, `en`, and `pt`. The section is static: `FadeRise` renders a `section` and has no `id` prop, and `CardEntrance` lifts on hover. `docs/08-IMPLEMENTATION-PLAN.md` still marks TASK-008 Pendiente.
  - About, experience, and contact remain open.
  - Risk: medium. Writer self-check. Presentational change.
  - RED/GREEN: does not apply. No new pure function. `npm test` is the regression check.
  - Checks: `npm test` passed (3 files, 11 tests). `npm run typecheck` passed. `npm run lint` passed. `npm run build` passed (Next.js 16.4.3, Cache Components on, static `/es`, `/en`, `/pt`). Prerendered HTML places the section after the hero and before featured projects, with labels 01–05 and the locale header anchor. No long-running server.
  - Commit: skipped. The folder is not a git repository.
  - Rebuild: the numbered slogans are a vertical tablist and one tabpanel. Default step is the first. ArrowUp, ArrowDown, Home, and End change the step. A 2px cyan bar marks the active button. With motion allowed, the panel crossfades and rises 8px over 0.28s, and once the section is in view the selection advances every 2.8s until the last step. Hover, focus, or choosing a step cancels that tour. Reduced motion swaps the copy instantly and does not start the tour. Eyebrows stay Enfoque / Approach / Abordagem. About, experience, and contact stay open.
  - RED/GREEN: does not apply. No new pure function.
  - Checks (rebuild): `npm test` passed (3 files, 11 tests). `npm run typecheck` passed. `npm run lint` passed. `npm run build` passed (Next.js 16.4.3, Cache Components on, static `/es`, `/en`, `/pt`). Prerendered `/es`, `/en`, and `/pt` include the new titles, the lead, `role="tablist"`, `role="tabpanel"`, and the first-step TramitIA evidence. `Cómo trabajo` is absent. The approach markup has no 01–05 labels. No server was started. Browser was not opened.
  - Commit: skipped. The folder is not a git repository.
- [ ] `TASK-020` SEO and Open Graph.
- [ ] `TASK-012` Mobile and accessibility.
- [ ] `TASK-013` Broader tests.
- [ ] `TASK-014` Lighthouse.
- [ ] `TASK-015` Deploy. Depends on real content tasks `TASK-016` through `TASK-019`.

- [x] `TASK-023` Interactive hero, Phase A. Route: delegated writer.
  - Keep the role AI & Agentic Systems Engineer, Geist, the closed palette, the H1, and the Enfoque tablist.
  - Add a selectable illustrative architecture in the first viewport. Four steps: Entrada, Registros, Agente, Producto. Evidence only from TramitIA and AcademIA. TramitIA pilot URL from the author's PDF: https://tramitia-bolivia.mywire.org. AcademIA stays local, with no public demo, and is not described as an agent.
  - No autoplay tour. Motion only on the selected step. Reduced motion swaps instantly.
  - Do not add Partner Intelligence, the other PDF repositories, the 1,050/16 figure, or a RAG microdemo.
  - Risk: medium. Writer self-check plus parent spot check.
  - RED: `npm test` failed to load `tests/hero-flow.test.ts` because `lib/i18n/hero-flow` was missing. The other 11 tests passed.
  - GREEN: parent re-ran `npm test` (4 files, 16 tests, exit 0). Writer reported `typecheck` and `lint` exit 0. Parent `next build` exit 0.
  - Browser: `/es` shows the role, the new support sentence, and the four steps. Selecting Producto reveals the pilot link `https://tramitia-bolivia.mywire.org`. At 1440px the flow sits beside the headline. At 390px it stacks under the paragraph and the Producto panel is visible. Impeccable detect returned no findings.
  - Commit: skipped. The folder is not a git repository.

- [x] `TASK-024` Case studies, Phase B. Route: delegated writer.
  - Add the TramitIA pilot URL to the three locale files. AcademIA stays without a public URL and without the 1,050/16 figure.
  - Add Partner Intelligence from the PDF only: invite-only URL, AHP/TOPSIS, no invented stack, no GitHub repo URL.
  - The open pilot and the invite-only platform use different link labels. A project without `liveUrl` says there is no public demo.
  - The TramitIA card spans the row. The other two do not.
  - Risk: medium. Writer self-check plus parent spot check.
  - RED: `npm test` exit 1. Three locale assertions missed `partner-intelligence`.
  - GREEN: parent re-ran `npm test` (5 files, 19 tests, exit 0). Writer reported typecheck and lint exit 0. Parent `next build` exit 0, 23 pages. Impeccable detect returned no findings.
  - Browser: `/es` shows TramitIA full width with “Abrir el piloto” to tramitia-bolivia.mywire.org, AcademIA with “Sin demo pública”, and Partner Intelligence with “Abrir la plataforma por invitación” to partner-intelligence.onrender.com. The Spanish case page includes the AHP/TOPSIS decisions and no technology list.
  - Commit: skipped. The folder is not a git repository.

- [x] `TASK-025` RAG microdemo, Phase C. Route: delegated writer.
  - A home section after the projects. The visitor picks one of three questions and sees conceptual terms, simulated retrieval, selection, and a cited answer.
  - The corpus is three fixed fragments from published facts. No API, no secrets, no numeric scores, no claim that this queries TramitIA.
  - Risk: medium. Writer self-check plus parent spot check.
  - RED: `npm test` exit 1. `tests/rag-demo.test.ts` could not load `@/lib/rag/simulation`. The other 19 tests passed.
  - GREEN: parent re-ran `npm test` (6 files, 28 tests, exit 0). Writer reported typecheck and lint exit 0. Parent `next build` exit 0.
  - Browser: `/es#simulacion` shows the three questions, the fixed-card disclaimer, and the TramitIA citation for the first question. Choosing “¿El modelo arma el ranking?” marks Partner Intelligence as the match and cites the AHP/TOPSIS fragment.
  - Commit: skipped. The folder is not a git repository.

- [x] `TASK-026` Free-text project answers, no LLM. Route: delegated writer.
  - Replace the fixed-question block with a question box. Answers come only from published project fields. Unknown questions are refused. No provider call, because ADR-006 has no chosen provider.
  - Risk: medium. Writer self-check plus parent spot check.
  - RED: `npm test` exit 1. `tests/copilot-answer.test.ts` could not load `@/lib/copilot/answer`. The other 28 tests passed.
  - GREEN: parent re-ran `npm test` (7 files, 36 tests, exit 0). Writer reported typecheck and lint exit 0. Parent `next build` exit 0.
  - Browser: typing “el modelo arma el ranking” and pressing Preguntar cites Partner Intelligence, maturity Demo, and the published AHP/TOPSIS sentence. “¿Qué proyectos puedo probar?” returns TramitIA and Partner Intelligence and leaves AcademIA out.
  - Commit: skipped. The folder is not a git repository.

## Next step

`TASK-008` remaining: about, experience, and contact. Profile still needs a photo and real roles. The LLM provider in ADR-006 is still unchosen.
