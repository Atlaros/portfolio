# Modelo de contenido

## Project

Campos mínimos:

```ts
type Project = {
  id: string
  slug: string
  title: string
  tagline: string
  summary: string

  problem: string
  whyItMatters?: string
  solution: string
  approach: string

  engineeringDecisions?: string[]
  benefits: string[]
  metrics?: ProjectMetric[]

  categories: ProjectCategory[]
  technologies?: string[]

  featured: boolean
  order: number

  liveUrl?: string
  repositoryUrl?: string

  screenshots?: ProjectMedia[]
  videos?: ProjectMedia[]
  diagrams?: ProjectMedia[]
  ogImage?: string

  status: ProjectStatus
  maturity: ProjectMaturity
}

type ProjectStatus = "published" | "draft" | "archived"
type ProjectMaturity = "prototype" | "demo" | "production"
```

## Status y maturity

`status` es solo editorial / ciclo de vida:

- `published`: visible en el sitio.
- `draft`: no se publica.
- `archived`: fuera del catálogo principal.

`maturity` describe el estado real del producto:

- `prototype`
- `demo`
- `production`

El Copilot usa `maturity` para diferenciar demo, prototipo y producción (ver `docs/05-COPILOT.md`).

Reemplaza al `status` anterior (`"case-study" | "demo-live" | "archived"`): `demo-live` duplicaba `liveUrl`.

## Live Demo

El botón `Live Demo` se muestra solo cuando existe `liveUrl` (no vacío). No depende de `status` ni de `maturity`.

## Diagramas y Open Graph

- `diagrams`: diagramas de arquitectura opcionales (REQ-013), con `type: "diagram"`.
- `ogImage`: imagen social share opcional del proyecto (REQ-022). Si no existe, se usa la imagen global o una generada.

## Categorías

- analytics
- data-science
- ai
- data-engineering

Un proyecto puede pertenecer a varias.

## ProjectMetric

Solo usar métricas reales.

```ts
type ProjectMetric = {
  label: string
  value: string
  source?: string
}
```

Regla: si `value` es cuantitativo (números, porcentajes, tiempos, montos), `source` es obligatorio. El tipo lo mantiene opcional; la regla se valida con Zod (`refine`) al cargar el contenido.

## ProjectMedia

```ts
type ProjectMedia = {
  src: string
  alt: string
  caption?: string
  type: "image" | "video" | "diagram"
}
```

## Regla

Nunca inventar métricas, screenshots, enlaces, usuarios, resultados ni tecnologías.

## Ubicación

Locales `es`, `en` y `pt` (ADR-011). La plantilla sigue en `content/projects/_template.mdx`.

```text
content/<locale>/projects/<slug>.mdx
content/projects/_template.mdx
public/projects/<slug>/
```
