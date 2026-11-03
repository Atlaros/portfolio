# ADR-014 — Dark Engineering Premium

**Estado:** Aceptado (2026-10-31)

## Decisión

La identidad visual del portafolio es Dark Engineering Premium. El título es blanco sólido. El cyan marca la acción y el foco. El azul da profundidad. El violeta deja de ser acento de marca y el degradado violeta → azul → cyan no se usa en titulares.

Los tokens vigentes están en `app/globals.css`:

```text
Background      #0B101B
Surface         #121A28
Surface raised  #172132
Primary text    #F5F7FA
Muted text      #A7B3C7
Cyan            #18D4D8
Blue            #4D7CFF
Border          #334155
```

## Contexto

`docs/03-DESIGN-SYSTEM.md`, `AGENTS.md` y el hero usaban un degradado violeta → azul → cyan en el título. El paquete Dark Engineering Premium aprueba un rediseño visual. Esa dirección y las reglas anteriores no podían mandar al mismo tiempo.

## Opciones no elegidas

1. **Conservar el degradado y la paleta anterior.** Contradice el rediseño aprobado.
2. **Aplicar el rediseño solo en un documento nuevo y dejar `AGENTS.md` con la regla vieja.** El choque seguía vigente.

## Motivos

- El rediseño es la dirección visual del sitio.
- El título arcoíris competía con la identidad de otros productos y no con el trabajo publicado.
- Geist se mantiene (ADR-013). Los tokens siguen centralizados (ADR-008).

## Consecuencias

- `docs/03-DESIGN-SYSTEM.md`, `AGENTS.md`, `docs/00-PROJECT-STATE.md` y `docs/01-PRD.md` describen esta paleta.
- ADR-008 y ADR-013 siguen aceptados. Este ADR no los borra: cambia los valores de color y retira el degradado del título.
- La composición del hero (escenario de producto) y el reemplazo de Enfoque siguen como trabajo posterior. Este ADR cierra el color y el título, no todo el rediseño.

## Revisión

Reabrir solo si cambia la dirección visual aprobada.
