# ADR-004 — Copilot mediante BFF server-side

**Estado:** Aprobado para MVP

## Decisión
Exponer el Copilot mediante una ruta server-side de Next.js.

## Motivos
- Oculta API keys.
- Centraliza validación y rate limiting.
- Evita backend adicional.

## Consecuencia
El navegador nunca llama directamente al proveedor LLM.

El mecanismo de rate limiting se define en ADR-012 (propuesto).
