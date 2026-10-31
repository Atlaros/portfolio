# Arquitectura

## 1. Estilo

**Monolito modular con Next.js**

La complejidad del MVP no justifica microservicios, backend Python separado ni base de datos.

## 2. Capas

```text
Presentation
    ↓
Application
    ↓
Domain / Content
    ↓
Infrastructure
```

## 3. Componentes

```text
Browser
  |
  v
Next.js App
  |
  +-- UI
  |    +-- Hero
  |    +-- Projects
  |    +-- Case Studies
  |    +-- Copilot
  |    +-- Experience
  |
  +-- Application
  |    +-- getProjects
  |    +-- getProjectBySlug
  |    +-- filterProjects
  |    +-- askCopilot
  |
  +-- Domain
  |    +-- Project
  |    +-- Experience
  |    +-- Capability
  |
  +-- Infrastructure
       +-- MDX repository
       +-- AI provider
       +-- rate limiting (store externo, ADR-012)
```

El Copilot (UI, `askCopilot`, `/api/copilot`) se entrega en V1.1.

## 4. Proyectos externos

El portafolio no hospeda las aplicaciones.

```text
Portfolio
  |
  +-- TramitIA --------> Demo externa
  +-- AcademIA --------> Demo externa
  +-- Project 3 -------> Demo externa
  +-- Project 4 -------> Demo externa
  +-- Project 5 -------> Demo externa
```

## 5. Patrones

### Repository
La UI no debe conocer cómo se almacenan los proyectos.

```text
ProjectRepository
    |
    +-- MDXProjectRepository
```

### Adapter / Provider
El Copilot no debe acoplarse a un proveedor LLM específico.

```text
AIProvider
  |
  +-- ProviderA
  +-- ProviderB
```

### BFF
El navegador llama a una ruta server-side:

```text
Browser
  ↓
/api/copilot
  ↓
retrieval
  ↓
AI provider
```

## 6. Estructura sugerida

```text
app/
  [locale]/
    page.tsx
    projects/[slug]/page.tsx
  api/copilot/route.ts

components/
  layout/
  hero/
  projects/
  copilot/
  motion/
  ui/

content/
  es/
    profile.mdx
    experience.mdx
    projects/
  en/
    profile.mdx
    experience.mdx
    projects/
  pt/
    profile.mdx
    experience.mdx
    projects/

domain/
application/
infrastructure/
lib/
public/projects/
tests/
docs/
```

Locales aceptados (ADR-011): `es`, `en` y `pt`. Las páginas cuelgan de `app/[locale]/` (ejemplos `/es`, `/en`, `/pt`) y el contenido de `content/es/`, `content/en/` y `content/pt/`. Locale por defecto: `es`. Hay un selector de idioma visible.

## 7. Seguridad

- Secrets solo server-side.
- Validar input del Copilot.
- Rate limiting con contador compartido (no fiable solo en memoria en serverless; ver ADR-012, propuesto).
- Tope de gasto del Copilot (tokens por respuesta, preguntas por sesión/IP, alerta de presupuesto).
- Longitud máxima de preguntas.
- Sanitización.
- CSP y security headers.
- Enlaces externos con seguridad apropiada.

## 8. SEO

- Metadata por página con la Metadata API de Next.js.
- `app/sitemap.ts` y `app/robots.ts`.
- Canonical y `hreflang` por locale (`es`, `en`, `pt`; ADR-011, REQ-021).
- Open Graph por proyecto (`opengraph-image` o imagen estática en `public/projects/<slug>/`).

## 9. Rendimiento

- No iframe de demos.
- Lazy load de imágenes y video.
- Optimización de assets.
- Minimizar JS cliente.
- Animaciones con transform/opacity cuando sea posible.
