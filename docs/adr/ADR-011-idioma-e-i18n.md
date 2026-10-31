# ADR-011 — Idioma e i18n

**Estado:** Aceptado (2026-10-26)

## Decisión

El sitio ofrece un selector de idioma visible para exactamente tres locales: español (`es`), inglés (`en`) y portugués (`pt`). El locale por defecto es `es`.

## Contexto

Los textos del repositorio no compartían un idioma:

- La documentación está en español.
- `content/projects/_template.mdx` y la línea del hero (“ENGINEERING SOLUTIONS FROM DATA.”) están en inglés.
- Las preguntas sugeridas del Copilot usan español rioplatense (“Contame sobre TramitIA”).

Esa mezcla exige locales explícitos. De ella dependen las rutas de `app/`, la carpeta de contenido MDX y el idioma de las respuestas del Copilot. La decisión queda cerrada para `TASK-001`.

## Opciones no elegidas

1. **Solo español.** Más simple; deja fuera a quien lee en inglés o portugués.
2. **Solo inglés.** Igual de simple para un público internacional; obliga a reescribir lo que ya está en español.
3. **Bilingüe ES/EN.** Cubre dos idiomas y deja fuera el portugués.

## Motivos

- Tres locales nombrados evitan volver a mezclar documentación, plantilla y tono del Copilot.
- El selector hace visible el idioma activo.
- El locale por defecto `es` sigue el idioma de la documentación ya escrita.

## Consecuencias

- Rutas bajo `app/[locale]/` con locales `es`, `en` y `pt`. Ejemplos: `/es`, `/en`, `/pt`.
- Contenido por locale: `content/es/`, `content/en/` y `content/pt/` (perfil, experiencia, proyectos).
- Selector de idioma visible en la página.
- Locale por defecto: `es`.
- SEO: `hreflang` y canonical por locale (REQ-021).
- El Copilot (V1.1) responde en el locale activo.
- El esfuerzo de contenido se triplica respecto de un solo idioma. Ese riesgo reemplaza al de dejar el idioma abierto.
- Los MDX placeholder no se traducen en este registro. Cuando se redacten, vivirán en `content/<locale>/`.

## Revisión

Reabrir solo si cambia el conjunto de locales.
