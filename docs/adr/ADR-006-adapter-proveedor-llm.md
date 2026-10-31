# ADR-006 — Adapter para proveedor LLM

**Estado:** Aprobado para MVP

## Decisión
Definir una interfaz `AIProvider` y encapsular proveedores concretos.

## Motivos
- Evita lock-in.
- Permite comparar coste/calidad.
- Simplifica migraciones futuras.
