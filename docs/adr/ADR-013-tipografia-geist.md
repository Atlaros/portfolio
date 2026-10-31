# ADR-013 — Tipografía Geist

**Estado:** Aceptado (2026-10-26)

## Decisión

Geist Sans para títulos, navegación y body. Geist Mono solo para labels y metadata. Ambas familias se cargan con `next/font/google` (`Geist` y `Geist_Mono`).

## Contexto

El design system dejó la familia concreta como decisión pendiente, con dos opciones. La recomendación era Geist Sans + Geist Mono vía `next/font`. `TASK-002` y `TASK-003` continúan con esa recomendación.

## Opciones no elegidas

1. **Inter + JetBrains Mono.** Otra pareja sans/mono válida. No es la recomendación del design system y el trabajo no continuó con ella.

## Motivos

- Era la recomendación del design system.
- El trabajo continuó con esa recomendación.
- `next/font` sirve las fuentes self-hosted, sin layout shift y sin requests a terceros en runtime.
- Los tokens de tipografía viven en el tema (ADR-008), no se eligen en cada componente.

## Consecuencias

- `--font-sans` apunta a Geist Sans.
- `--font-mono` apunta a Geist Mono.
- Mono queda reservado a labels, números de sección, metadata y tags técnicos.
- Inter y JetBrains Mono no se agregan al proyecto.

## Revisión

Reabrir solo si cambia la pareja tipográfica del sitio.
