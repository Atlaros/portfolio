# Changelog de documentación

## 2026-10-26

ADR-011 pasa de **Propuesto** a **Aceptado**. El sitio usa tres locales: español (`es`), inglés (`en`) y portugués (`pt`), con selector de idioma visible y locale por defecto `es`.

Los enlaces a demos externas ya estaban cubiertos por ADR-007 y por lo confirmado en `docs/00-PROJECT-STATE.md`. No se abre un ADR nuevo.

- Rutas bajo `app/[locale]/` (`/es`, `/en`, `/pt`) y contenido en `content/es/`, `content/en/`, `content/pt/`.
- El Copilot (V1.1) responde en el locale activo.
- El riesgo abierto de idioma queda reemplazado por redactar el mismo contenido tres veces.
- `TASK-001` ya no espera una decisión de idioma: la dependencia queda satisfecha por ADR-011.
- Los MDX placeholder no se traducen en este cambio; solo se registra dónde vivirán.
- Quedan descartadas las opciones de solo español, solo inglés y bilingüe ES/EN.

## 2026-10-25

Fecha: 2026-10-25.

Cambios aplicados sobre el starter pack original. Las decisiones que corresponden a Diego quedan como **pendientes** con opciones y recomendación; no se toman por él.

### Estructura

- Archivos renombrados según su contenido (`README.md`, `AGENTS.md`, `docs/00`–`08`, `docs/adr/ADR-001`–`010`, `content/`).
- Nuevos: `docs/adr/ADR-011-idioma-e-i18n.md`, `docs/adr/ADR-012-rate-limiting-copilot.md`, `CHANGELOG-DOCS.md`.

### README.md

- Orden de lectura: ADR-001 … ADR-012 (011 y 012 en estado Propuesto) y paso nuevo para revisar decisiones abiertas antes de `TASK-001`.
- Estado inicial: contenido como riesgo principal (solo TramitIA y AcademIA nombrados; perfil y experiencia placeholder), fases V1 / V1.1 y lista de decisiones abiertas (idioma, tipografía, store de rate limit, proveedor LLM, CV, analytics, dominio).

### AGENTS.md

- Sin cambios.

### docs/00-PROJECT-STATE.md

- Copilot movido de Alcance V1 a nuevo Alcance V1.1 (recomendación).
- SEO básico y Open Graph agregados al alcance V1.
- Pendiente dividido en “Contenido (bloqueante principal)” —con `profile.mdx` y `experience.mdx`— y tabla de “Decisiones abiertas” con opciones, recomendación y momento límite.
- Riesgos: contenido marcado como riesgo principal; mitigaciones de coste del Copilot; nuevos riesgos de rate limiting en serverless e idioma sin definir.

### docs/01-PRD.md

- Nuevos REQ-021 (SEO básico), REQ-022 (Open Graph por proyecto), REQ-023 (contacto por enlaces, sin formulario), REQ-024 (nota de privacidad del Copilot), REQ-025 (Copilot en V1.1 con fallback), REQ-026 (tope de gasto).
- US-004 marcada V1.1; criterios para US-005; nueva US-006 (compartir proyecto).
- Nueva sección 7.1 “Decisiones abiertas”: idioma, CV descargable, analytics básico, proveedor LLM.
- Fuera de alcance V1: formulario de contacto y Copilot (pasa a V1.1).

### docs/02-ARCHITECTURE.md

- Nota de V1.1 para el Copilot y referencia a ADR-012 en Infrastructure.
- Nota de estructura según idioma (`app/[locale]/`, `content/<locale>/` si es bilingüe).
- Seguridad: rate limiting con contador compartido (ADR-012) y tope de gasto.
- Nueva sección 8 “SEO”; “Rendimiento” pasa a sección 9.

### docs/03-DESIGN-SYSTEM.md

- Nueva sección “Contraste (WCAG 2.x)” con ratios calculados sobre Background y Surface, y reglas de uso de Blue/Purple.
- Tipografía: decisión pendiente con opciones (Geist Sans + Geist Mono recomendada; Inter + JetBrains Mono alternativa) vía `next/font`.

### docs/04-CONTENT-MODEL.md

- `status` pasa a ser editorial: `"published" | "draft" | "archived"` (reemplaza `"case-study" | "demo-live" | "archived"`).
- Nuevo campo `maturity: "prototype" | "demo" | "production"`.
- Live Demo solo cuando existe `liveUrl`.
- Nuevos campos opcionales `diagrams` (REQ-013) y `ogImage` (REQ-022).
- Regla: `ProjectMetric.source` obligatorio si el valor es cuantitativo (validado con Zod; tipo sin cambios).

### docs/05-COPILOT.md

- Nueva sección “Fase”: V1.1 recomendada; proveedor LLM pendiente.
- Guardrails: diferenciar demo/prototipo/producción con `maturity`.
- Privacidad: nota mínima por envío a proveedor externo.
- Seguridad: rate limiting con store compartido (ADR-012).
- Nueva sección “Coste / tope de gasto” con fallback controlado; valores pendientes.
- Nota sobre idioma/variante de las preguntas sugeridas (ADR-011).

### docs/06-TESTING.md

- Unit: validación de contenido (métrica sin `source`).
- E2E: flujos del Copilot marcados V1.1; nuevos flujos 10 (rate limit / presupuesto) y 11 (SEO / Open Graph).
- Nueva sección “Copilot sin LLM real”: `AIProvider` mock, CI sin gasto ni API keys.

### docs/07-DEPLOYMENT.md

- Variables `RATE_LIMIT_STORE_URL` y `RATE_LIMIT_STORE_TOKEN` (server-side) y notas de uso.
- Alerta de presupuesto antes de activar el Copilot.
- Nueva sección “Analytics” (pendiente).

### docs/08-IMPLEMENTATION-PLAN.md

- Fases V1 / V1.1 y columna “Fase”.
- Track de contenido en paralelo desde el inicio: TASK-016 depende solo de TASK-004; nuevas TASK-018 (`profile.mdx`) y TASK-019 (`experience.mdx`).
- TASK-001 depende de la decisión de idioma; TASK-002 de la tipografía.
- TASK-008 incluye Contact; nueva TASK-020 (SEO + Open Graph).
- TASK-009–011 pasan a V1.1; TASK-012/013 ya no dependen de ellas; TASK-015 depende del contenido, no del Copilot.
- Nuevas TASK-021 (tests Copilot con mock) y TASK-022 (deploy Copilot).

### docs/adr/ADR-003-sin-base-de-datos-v1.md

- Revisión: un store key-value solo para contadores (ADR-012) no es DB de contenido.

### docs/adr/ADR-004-copilot-bff-server-side.md

- Consecuencia: referencia a ADR-012 para el mecanismo de rate limiting.

### docs/adr/ADR-011-idioma-e-i18n.md (nuevo)

- Estado Propuesto. Opciones: solo español, solo inglés, bilingüe ES/EN. Decidir antes de TASK-001. Inconsistencia actual documentada.

### docs/adr/ADR-012-rate-limiting-copilot.md (nuevo)

- Estado Propuesto. Opciones: store externo (Upstash / tipo Vercel KV), Vercel Firewall/WAF, solo memoria best-effort. Relación con ADR-003.

### content/projects/_template.mdx

- Frontmatter: `status: "draft"` (antes `"case-study"`), nuevo `maturity: "prototype"`, `diagrams: []`, `ogImage: ""`.
- Notas sobre diagramas, `source` en métricas y Live Demo solo con `liveUrl`. Se mantiene en inglés hasta decidir ADR-011.

### Sin cambios

- `AGENTS.md`, `content/profile.mdx`, `content/experience.mdx`, ADR-001, ADR-002, ADR-005 a ADR-010.
