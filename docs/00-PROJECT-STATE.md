# Estado del proyecto

## Proyecto

Portafolio profesional — AI & Agentic Systems Engineer

## Objetivo

Construir un portafolio interactivo que demuestre capacidad para resolver problemas reales de negocio y usuarios mediante datos, analítica, ciencia de datos e inteligencia artificial.

## Estado

**Definición completada / implementación pendiente**

## Alcance V1

- Home completa
- Navbar sticky
- Hero interactivo
- 5 proyectos destacados
- Case study por proyecto
- Catálogo de proyectos
- Filtros por área
- Sección Engineering Capabilities en home (ADR-015; hash `#approach` hasta Phase G)
- Engineering Explorer (opcional, blueprint) — pendiente
- About
- Experience
- Contact
- SEO básico (metadata, sitemap, robots, canonical)
- Imágenes Open Graph por proyecto
- Responsive
- Accesibilidad
- Tests
- Deploy

## Alcance V1.1

- Copilot del portafolio (con rate limiting y tope de gasto).

Recomendación: lanzar V1 sin Copilot para que no bloquee el lanzamiento y agregarlo en V1.1.

## Confirmado

- Portafolio independiente de las aplicaciones.
- Primera versión con 5 proyectos.
- Las demos se abren mediante enlaces externos.
- El portafolio debe crecer sin rediseñarse.
- Cada proyecto se presenta como caso de ingeniería.
- La narrativa principal es:
  **Problema → Solución → Cómo se resolvió → Beneficio**
- Tecnologías como evidencia secundaria.
- Dark UI, Dark Engineering Premium (ADR-014): título blanco, cyan de acción, azul de profundidad. Sin degradado violeta en titulares.
- Microinteracciones y movimiento suave con mouse.
- Copilot especializado en el trabajo de Diego.
- Idioma del sitio: español (`es`), inglés (`en`) y portugués (`pt`), con selector visible. Locale por defecto: `es`. Contenido en `content/es/`, `content/en/` y `content/pt/` (ADR-011).
- Tipografía: Geist Sans para títulos, navegación y body; Geist Mono solo para labels y metadata, vía `next/font/google` (ADR-013).

## Pendiente

### Contenido (bloqueante principal)

- Seleccionar los 5 proyectos finales (hoy solo están nombrados TramitIA y AcademIA).
- Completar `content/profile.mdx` con versión real aprobada (hoy placeholder).
- Completar `content/experience.mdx` con experiencia real aprobada (hoy placeholder).
- Añadir URLs reales.
- Añadir screenshots y videos.
- Añadir repositorios cuando corresponda.
- Completar métricas reales si existen.

### Decisiones abiertas (Diego)

| Decisión | Opciones | Recomendación | Cuándo |
|---|---|---|---|
| Store de rate limiting (ADR-012) | Upstash Redis / store tipo Vercel KV · Vercel Firewall/WAF · solo memoria (best-effort) | Store externo o WAF; memoria solo como complemento | Antes de `TASK-011` |
| Proveedor LLM del Copilot | Abierto (detrás de `AIProvider`, ADR-006) | Comparar coste/calidad | Antes de `TASK-010` |
| CV descargable | Sí · no | — | Antes de `TASK-008` |
| Analytics básico | Ninguno · analytics privacy-friendly (p. ej. Vercel Analytics) | Básico, sin cookies, o ninguno | Antes de `TASK-015` |
| Método de contacto | Links (mailto + LinkedIn) · formulario | Links en V1; sin formulario (no hay backend ni DB) | Antes de `TASK-008` |
| Dominio final | Abierto | — | Antes de `TASK-015` |

## Riesgos

1. Sobrecargar la web con animaciones.
2. Convertir el portafolio en una lista de herramientas.
3. Copilot demasiado caro o genérico (mitigación: V1.1, tope de gasto, rate limiting).
4. Demos free-tier con cold start.
5. **Contenido incompleto de proyectos, perfil y experiencia — riesgo principal y bloqueante del lanzamiento.** El contenido se trabaja en paralelo desde el inicio (ver plan).
6. Rate limiting en memoria no fiable en serverless (ver ADR-012).
7. El mismo contenido debe redactarse tres veces (`es`, `en`, `pt`). El esfuerzo se triplica respecto de un solo idioma (ADR-011).

## Regla de producto

Una demo puede estar temporalmente no disponible, pero el case study debe seguir mostrando claramente el valor del proyecto.
