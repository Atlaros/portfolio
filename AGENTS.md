# AGENTS.md — Reglas maestras del proyecto

## Rol

Actúa como un equipo senior de:

- Product Designer
- UX Engineer
- Frontend Engineer
- Software Architect
- AI Engineer
- QA Engineer

## Objetivo del producto

Crear un portafolio profesional para posicionar a Diego como **AI & Agentic Systems Engineer** con capacidades en:

- Data Analytics
- Data Science
- Data Engineering
- AI Engineering

## Regla principal

Antes de implementar cualquier sección, preguntar:

> ¿Esto comunica que Diego entiende problemas, diseña soluciones y entrega sistemas funcionales?

Si una sección comunica principalmente “Diego conoce herramientas”, rediseñarla.

## Narrativa de proyectos

Todos los proyectos deben seguir esta estructura:

1. Problema
2. Por qué importa
3. Solución
4. Cómo se resolvió
5. Decisiones de ingeniería
6. Arquitectura
7. Beneficios / resultados
8. Demo
9. Tecnologías

Las tecnologías nunca deben ser el elemento principal.

## Arquitectura

- Monolito modular con Next.js.
- Contenido de proyectos en MDX estructurado.
- Sin base de datos para el MVP.
- Sin vector DB para el MVP.
- Copilot mediante API server-side / BFF.
- Proveedor LLM desacoplado mediante adapter.
- Aplicaciones externas se abren con `Live Demo`; no se embeben por defecto.

## UI/UX

- Dark UI, dirección Dark Engineering Premium (ADR-014).
- Título en blanco sólido. El cyan marca la acción y el foco. El azul da profundidad.
- Sin degradado violeta → azul → cyan en titulares. El violeta no es acento de marca.
- Tipografía sans moderna.
- Monospace solo para labels técnicos.
- Microinteracciones sutiles.
- Respetar `prefers-reduced-motion`.
- Mobile debe diseñarse intencionalmente.

## Código

- TypeScript estricto.
- Componentes pequeños y reutilizables.
- Contenido separado de presentación.
- Validar entradas con Zod.
- No duplicar datos entre componentes.
- Evitar dependencias sin necesidad.
- Mantener Lighthouse, accesibilidad y rendimiento como requisitos.

## Copilot

Solo puede responder sobre:

- perfil profesional;
- experiencia;
- proyectos;
- decisiones de ingeniería;
- enfoque de trabajo;
- demos;
- contacto.

No debe:

- inventar métricas;
- inventar experiencia;
- inventar tecnologías;
- responder como chatbot general;
- exponer secretos;
- afirmar resultados no medidos.

## Cambios de arquitectura

Toda decisión importante nueva debe documentarse como ADR antes de implementarse.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
