# ADR-001 — Monolito modular con Next.js

**Estado:** Aprobado para MVP

## Contexto
El portafolio necesita UI interactiva, páginas dinámicas de proyectos y una pequeña API para el Copilot.

## Opciones
1. Next.js monolito modular.
2. SPA + backend Python.
3. Microservicios.

## Decisión
Usar Next.js como monolito modular.

## Motivos
- Menor complejidad.
- Mejor mantenimiento para una sola persona.
- Soporte SSR/SSG.
- API server-side suficiente para el Copilot.

## Consecuencias
No se crea backend separado en V1.
