# Portfolio profesional — AI & Agentic Systems Engineer

Starter pack para iniciar el proyecto en Cursor.

## Objetivo

Construir un portafolio profesional orientado a ingeniería, donde el eje no sea “qué herramientas conozco”, sino:

**Problema → Solución → Cómo se resolvió → Beneficio / impacto**

El portafolio comienza con 5 proyectos y debe poder crecer a 10–15+ sin rediseño.

## Stack acordado

- Next.js
- React
- TypeScript
- Tailwind CSS
- Motion / Framer Motion
- MDX para contenido de proyectos
- Zod para validación
- Vitest + React Testing Library
- Playwright
- GitHub Actions
- Vercel para el portafolio
- Demos externas en Render / AWS / Vercel / otros

## Principios

1. Mostrar capacidad para resolver problemas.
2. Herramientas y tecnologías como evidencia secundaria.
3. Cada proyecto debe ser un case study.
4. El Copilot solo responde sobre experiencia, proyectos y decisiones profesionales autorizadas.
5. Las demos viven fuera del portafolio.
6. El contenido debe ser data-driven.
7. La estética debe ser dark, técnica, limpia y premium.
8. La interacción debe reforzar UX, no distraer.

## Orden recomendado en Cursor

1. Leer `AGENTS.md`.
2. Leer `docs/00-PROJECT-STATE.md`.
3. Leer `docs/01-PRD.md`.
4. Leer `docs/02-ARCHITECTURE.md`.
5. Leer ADRs (`docs/adr/ADR-001` … `ADR-012`; ADR-011 está **Aceptado**; ADR-012 sigue en estado **Propuesto**).
6. Revisar las decisiones abiertas de `docs/00-PROJECT-STATE.md`. El idioma ya está decidido (ADR-011) y no bloquea `TASK-001`.
7. Implementar `TASK-001` del plan.
8. No añadir infraestructura no requerida por el MVP.

## Estado inicial

Arquitectura y producto definidos.
Pendiente: implementar el sitio y cargar los 5 proyectos reales con sus links, capturas y textos finales.

El contenido es el principal riesgo: solo están nombrados TramitIA y AcademIA; `profile.mdx` y `experience.mdx` son placeholders.

Lanzamiento por fases: **V1** sin Copilot; **V1.1** agrega el Copilot.

Decisiones abiertas (ver `docs/00-PROJECT-STATE.md`):

- Tipografía.
- Store externo para rate limiting del Copilot (ADR-012).
- Proveedor LLM.
- CV descargable.
- Analytics básico.
- Dominio final.
