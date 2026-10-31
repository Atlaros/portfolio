# Deployment

## Portfolio

Destino inicial recomendado:

**Vercel**

## Aplicaciones de proyectos

Pueden vivir independientemente en:

- Render
- AWS
- Vercel
- Streamlit Community Cloud
- otros

El portafolio solo requiere `liveUrl`.

## Variables de entorno

Ejemplo:

```text
AI_PROVIDER=
AI_API_KEY=
COPILOT_RATE_LIMIT=
RATE_LIMIT_STORE_URL=
RATE_LIMIT_STORE_TOKEN=
NEXT_PUBLIC_SITE_URL=
```

Nunca colocar secrets en variables `NEXT_PUBLIC_*`.

- `AI_*`, `COPILOT_RATE_LIMIT` y `RATE_LIMIT_STORE_*`: solo server-side. Necesarias recién en V1.1 (Copilot).
- `RATE_LIMIT_STORE_*` aplica si ADR-012 elige un store externo; con Vercel Firewall/WAF no se necesitan.
- `NEXT_PUBLIC_SITE_URL` se usa para canonical, sitemap y Open Graph.
- Configurar alerta de presupuesto mensual en el proveedor LLM antes de activar el Copilot.

## Pipeline

```text
push / pull request
  ↓
lint
  ↓
typecheck
  ↓
tests
  ↓
build
  ↓
preview deployment
  ↓
production
```

## Dominios

Pendiente seleccionar dominio final.

## Analytics

Pendiente (Diego): ninguno o analytics básico privacy-friendly (p. ej. Vercel Analytics). Analytics avanzado de comportamiento sigue fuera de alcance.

## Cold starts

Si una demo usa free tier y puede dormir:

- no ocultarlo con iframes;
- abrir demo en pestaña nueva;
- el case study debe seguir siendo útil aunque la demo tarde en iniciar.
