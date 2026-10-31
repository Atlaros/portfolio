# Plan de implementación

## Fases

- **V1**: sitio completo sin Copilot. Se despliega sin depender del Copilot.
- **V1.1**: Copilot (UI, backend, seguridad, rate limiting, tope de gasto).

## Track de contenido (en paralelo desde el inicio)

El contenido es el principal bloqueante. Se trabaja en paralelo al desarrollo y no espera a la UI.

| ID | Trabajo | Fase | Estado | Dependencias |
|---|---|---|---|---|
| TASK-018 | Completar `content/profile.mdx` con contenido real aprobado | V1 | Pendiente | — |
| TASK-019 | Completar `content/experience.mdx` con experiencia real aprobada | V1 | Pendiente | — |
| TASK-016 | Seleccionar e incorporar 5 proyectos reales | V1 | Pendiente | TASK-004 |
| TASK-017 | Añadir URLs, screenshots y demos | V1 | Pendiente | TASK-016 |

La selección de los 5 proyectos y la redacción de los case studies pueden empezar antes de `TASK-004`; `TASK-004` solo fija el formato MDX validado.

## Track de desarrollo

| ID | Trabajo | Fase | Estado | Dependencias |
|---|---|---|---|---|
| TASK-001 | Crear proyecto Next.js y estructura base | V1 | Hecho | ADR-011 aceptado (`es`, `en`, `pt`) |
| TASK-002 | Implementar design tokens y UI base | V1 | Hecho | TASK-001, decisión de tipografía |
| TASK-003 | Navbar + Hero + motion base | V1 | Hecho | TASK-002 |
| TASK-004 | Modelo y repositorio de proyectos | V1 | Hecho | TASK-001 |
| TASK-005 | Featured Projects | V1 | Hecho | TASK-002, TASK-004 |
| TASK-006 | Case Study dinámico | V1 | Hecho | TASK-004 |
| TASK-007 | Catálogo y filtros | V1 | Hecho | TASK-004 |
| TASK-008 | Engineering Approach + About + Experience + Contact | V1 | Pendiente | TASK-002 |
| TASK-020 | SEO básico + Open Graph por proyecto | V1 | Pendiente | TASK-004, TASK-006 |
| TASK-012 | Mobile + accesibilidad | V1 | Pendiente | TASK-003–008 |
| TASK-013 | Tests | V1 | Pendiente | TASK-003–008, TASK-012, TASK-020 |
| TASK-014 | Performance / Lighthouse | V1 | Pendiente | TASK-013 |
| TASK-015 | Deploy | V1 | Pendiente | TASK-014, TASK-016, TASK-017, TASK-018, TASK-019 |
| TASK-009 | Copilot UI | V1.1 | Pendiente | TASK-002 |
| TASK-010 | Retrieval y backend Copilot | V1.1 | Pendiente | TASK-004, TASK-009, proveedor LLM |
| TASK-011 | Seguridad, rate limiting y tope de gasto | V1.1 | Pendiente | TASK-010, ADR-012 |
| TASK-021 | Tests Copilot con `AIProvider` mock + mobile/a11y del panel | V1.1 | Pendiente | TASK-011 |
| TASK-022 | Deploy Copilot | V1.1 | Pendiente | TASK-015, TASK-021 |

`TASK-015` no depende de `TASK-009`–`TASK-011`.

### Notas

- `TASK-008`: La secuencia de trabajo ya puede mostrarse en el inicio. About, experiencia y contacto siguen faltando, así que la tarea permanece Pendiente. Contact, cuando exista, con enlaces (mailto + LinkedIn); sin formulario. CV descargable solo si Diego lo decide.
- `TASK-015`: incluye analytics básico solo si Diego lo decide.
- `TASK-020`: metadata, `sitemap`, `robots`, canonical, Open Graph por proyecto.
- `TASK-021`: CI nunca llama a un LLM real; incluye test de rate limit / presupuesto superado.

## Primera tarea exacta para Cursor

Implementar `TASK-001`.

ADR-011 (aceptado) ya fija la estructura: rutas `app/[locale]/` y contenido en `content/es/`, `content/en/` y `content/pt/` (locales `es`, `en`, `pt`; por defecto `es`).

### Criterios

- Next.js + TypeScript.
- App Router.
- Tailwind.
- ESLint.
- estructura de carpetas según arquitectura.
- scripts `dev`, `build`, `lint`, `typecheck`, `test`.
- no implementar aún Copilot real.
- no crear DB.
- no crear vector DB.
- documentación preservada.
