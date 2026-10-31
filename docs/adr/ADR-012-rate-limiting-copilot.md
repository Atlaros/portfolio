# ADR-012 — Rate limiting del Copilot

**Estado:** Propuesto — pendiente de decisión de Diego

## Contexto
El Copilot (V1.1) necesita rate limiting para controlar abuso y coste.

Un rate limit en memoria no es fiable en Vercel serverless: cada instancia tiene su propio contador, las instancias se crean y destruyen, y el límite real queda indefinido.

## Opciones
1. **Store key-value externo** (Upstash Redis o store tipo Vercel KV / Marketplace).
   - Contador compartido entre instancias.
   - Límites por IP y por sesión.
   - Requiere una dependencia y credenciales server-side.
2. **Vercel Firewall / WAF rate limiting rules.**
   - Sin código ni store propio.
   - Se configura sobre `/api/copilot`.
   - Menos control sobre límites por sesión y mensajes de error; depende del plan de Vercel.
3. **Solo en memoria (best-effort).**
   - Sin dependencias.
   - No garantiza límites reales; solo aceptable como capa adicional.

## Recomendación
Opción 1 o 2 como control principal; en memoria solo como best-effort complementario.

La elección final es de Diego.

## Relación con ADR-003
Un store key-value usado solo para contadores efímeros (con TTL) **no es una base de datos de contenido**: no guarda perfil, proyectos ni chats. Es consistente con el espíritu de ADR-003.

## Consecuencias
- Variables server-side: `RATE_LIMIT_STORE_URL`, `RATE_LIMIT_STORE_TOKEN` (si se usa la opción 1).
- Al superar el límite, `/api/copilot` devuelve un error controlado y la UI muestra un mensaje amable.
- Test del error controlado (ver `docs/06-TESTING.md`).

## Revisión
Revisar si el tráfico del Copilot crece o si cambia el destino de deploy.
