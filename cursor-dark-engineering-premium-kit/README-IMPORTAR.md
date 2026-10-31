# Paquete de transferencia a Cursor — Interactive Engineering Showcase

**Repositorio objetivo:** https://github.com/Atlaros/portfolio
**Dirección aprobada por el usuario:** **Dark Engineering Premium** dentro del concepto **Interactive Engineering Showcase**.
**Objetivo:** rediseño visual/UX integral, sin reescribir innecesariamente la arquitectura ni alterar proyectos reales.

## Qué contiene

1. `.cursor/skills/portfolio-interactivo/SKILL.md`: skill actualizada de diseño y frontend. Se invoca expresamente desde Cursor (`/portfolio-interactivo`) dentro del flujo Gentle IA.
2. `docs/design/DESIGN-SYSTEM.md`: especificación de identidad, layout, tipografía, componentes, motion, estados y responsive.
3. `docs/design/UX-UI-BLUEPRINT.md`: experiencia de inicio, Hero, transición a proyectos, ingeniería, navegación, interacciones, mobile y contenido.
4. `docs/design/IMPLEMENTATION-ROADMAP.md`: fases, archivos afectados, criterios de aceptación, validaciones y gates de decisión.
5. `docs/design/REFERENCES.md`: aclaraciones sobre imágenes conceptuales y control de información falsa.
6. `docs/design/reference/hero-dark-engineering-premium.png`: **referencia visual conceptual aprobada**, no captura del sitio o prototipo funcional.
7. `docs/design/reference/antes-hero.png`: captura del estado anterior para comparar.
8. `PROMPT-INICIAL-CURSOR.md`: instrucciones listas para pegar al inicio de la conversación con Cursor.

## Importación segura, sin sobrescribir a ciegas

**No descomprimas este ZIP directamente sobre tu repositorio** hasta inspeccionar su contenido. En el repositorio ya existen `.cursor/skills/portfolio-interactivo/SKILL.md`, `docs/03-DESIGN-SYSTEM.md`, `AGENTS.md`, ADR y tareas ODD. La skill nueva sustituye a la anterior de manera deliberada; los documentos `docs/design/` son nuevos y NO deben reemplazar automáticamente `docs/03-DESIGN-SYSTEM.md`.

1. Abre el repositorio en Cursor y comprueba `git status`. Si hay cambios sin commitear, respáldalos sin descartarlos.
2. Crea una rama de trabajo a partir de la rama correcta, según el flujo Gentle IA/ODD (`git switch -c feat/portfolio-interactive-showcase` solo si el repo está limpio y ese flujo lo permite).
3. Extrae el ZIP en una carpeta aparte. Copia **primero** `docs/design/`, sin sobreescribir archivos existentes. Copia también `PROMPT-INICIAL-CURSOR.md` si quieres conservarlo en el repo.
4. Compara `.cursor/skills/portfolio-interactivo/SKILL.md` original vs. nuevo; guarda el original, e instala la nueva versión si no hay conflicto con instrucciones más recientes en tu rama.
5. Conserva `AGENTS.md`, `odd/tasks/`, configuraciones Gentle IA y ADR existentes. **No los reemplaces con este paquete**.
6. Abre chat de Cursor en el proyecto. Pega el contenido de `PROMPT-INICIAL-CURSOR.md` e invoca la skill explícitamente.
7. Primer pase: **auditoría + identificación de conflictos de documentación/ADRs + plan ODD**, sin tocar UI de producción todavía. Solicita que Cursor documente la decisión visual aprobada antes de editar el design system vigente.
8. Después: implementa una fase por vez, empezando con un prototipo o ruta de prueba del Hero inmersivo y el paso a proyectos; revisa a 375/768/1440 px, ES/EN/PT y motion reducido.
9. Solo después de aceptar el prototipo, integra el diseño en Home, casos de estudio e Ingeniería en acción.
10. Ejecuta las pruebas disponibles y revisa el `git diff` antes de hacer merge/deploy. Revisa links, estado de demos y métricas con fuentes.

## Prioridad de información

- **Hechos técnicos y estados reales:** código y fuentes actuales del repositorio / proyectos; no la imagen conceptual.
- **Arquitectura y normas del proyecto:** `AGENTS.md`, ADR y Gentle IA; si hay conflicto, hacer explícito el cambio propuesto y tramitarlo mediante ODD/ADR.
- **Dirección de diseño aprobada:** estos documentos; no los screenshots viejos.
- **Imagen conceptual:** inspiración estética, no especificación exhaustiva ni evidencia de funcionalidad.

## Conflictos conocidos que Cursor debe conciliar

- La skill original imponía preservar composición y paleta existentes, pero el usuario aprobó **rediseño visual completo**.
- `docs/03-DESIGN-SYSTEM.md` tiene una paleta original (incluye púrpura) y la dirección nueva elimina el púrpura como protagonista. Proponer actualización formal del ADR/documentación; mantener el historial de decisiones.
- `HeroFlow.tsx` y `Approach.tsx` repiten patrón de pestañas/párrafos: sustituir la experiencia repetitiva sin perder el contenido veraz.
- El modelo de dominio ya admite screenshots/videos/diagrams/metrics; usarlos antes de duplicar datos.
- La imagen de referencia muestra **datos inventados como ejemplo** (trámite, tiempos, cantidad de requisitos, etiquetas de validación, fuentes y pantallas simuladas). NO repetirlos en la web como hechos.

## Criterio de éxito

La comparación antes/después debe mostrar claramente: Hero con producto protagonista, interacción auténtica (clic/tacto/teclado), proyectos con evidencia visual real y composición editorial, progresión de scroll elegante, narrativa distinguible para reclutadores/clientes, buena experiencia móvil y contenido fiable. No basta con cambiar color/bordes o animar las tarjetas actuales.
