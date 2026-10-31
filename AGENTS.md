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

- Dark UI.
- Acento cyan.
- Gradiente violeta → azul → cyan solo para highlights.
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
