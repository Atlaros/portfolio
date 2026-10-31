# Copilot del portafolio

## Objetivo

Permitir que el visitante pregunte sobre:

- proyectos;
- problemas resueltos;
- decisiones de ingeniería;
- experiencia;
- capacidades;
- metodología;
- demos;
- contacto.

## No es

Un chatbot general.

## Fase

**V1.1** (recomendado). V1 se lanza sin Copilot para que no bloquee el lanzamiento; se agrega después sobre el mismo contenido MDX.

Proveedor LLM: pendiente (detrás de `AIProvider`, ADR-006).

## Alcance

El Copilot solo responde usando información profesional aprobada dentro del repositorio.

## Arquitectura V1

```text
Pregunta
  ↓
Validación
  ↓
Intent / entity detection
  ↓
Selección de contexto
  ↓
LLM
  ↓
Respuesta
```

## Fuentes

```text
content/profile.mdx
content/experience.mdx
content/projects/*.mdx
docs profesionales aprobados
```

## Sin vector DB en V1

Con 5 proyectos, la recuperación puede ser determinista por:

- slug;
- título;
- categorías;
- keywords;
- resúmenes.

Revisar esta decisión al superar aproximadamente 15 proyectos o cuando el contexto se vuelva demasiado extenso.

## Guardrails

El Copilot debe:

- reconocer cuando no tiene información;
- diferenciar demo, prototipo y producción usando el campo `maturity` (`prototype` | `demo` | `production`) del proyecto, no `status` ni la existencia de `liveUrl`;
- evitar afirmar métricas inexistentes;
- responder solo desde contenido autorizado.

Debe rechazar suavemente preguntas fuera de alcance.

## Privacidad

V1 no persiste chats.

Si las preguntas se envían a un proveedor LLM externo, mostrar una nota mínima junto al input: las preguntas se procesan con un proveedor externo, no se guardan y no deben incluir datos personales (REQ-024).

## Seguridad

- API key server-side.
- Rate limiting con contador compartido (ADR-012, propuesto). En memoria solo como best-effort: no es fiable en Vercel serverless.
- Longitud máxima de prompt.
- Validación Zod.
- Logging sin contenido sensible.

## Coste / tope de gasto

- Máximo de tokens por respuesta.
- Máximo de preguntas por sesión y por IP.
- Alerta de presupuesto mensual en el proveedor LLM.
- Si se supera un límite o el proveedor falla: error controlado y mensaje de fallback amable (p. ej. “El Copilot no está disponible ahora; podés explorar los proyectos o contactarme”), sin romper la página.

Valores concretos de límites y presupuesto: pendientes de Diego.

## UX

Preguntas sugeridas:

- ¿Qué problemas ha resuelto Diego?
- ¿Cómo aborda un proyecto de datos?
- Contame sobre TramitIA.
- ¿Qué proyectos usan IA?
- ¿Cómo toma decisiones de ingeniería?
- ¿Qué proyectos puedo probar?

Nota: el Copilot (V1.1) responde en el locale activo (`es`, `en`, `pt`), según ADR-011 (aceptado).
