# Design system propuesto — Dark Engineering Premium

**Estado:** propuesta visual aprobada por el usuario, **pendiente de conciliación documental** con `docs/03-DESIGN-SYSTEM.md`, AGENTS/ADRs dentro de Gentle IA/ODD. No reemplaza automáticamente el design system vigente.
**Idea visual:** Interactive Engineering Showcase (portafolio de productos + visualización de ingeniería); no dashboard administrativo ni CV en tarjetas.

## 1. Atributos de marca

Ingeniería rigurosa · confianza · capacidad de ejecución · innovación útil · claridad · producto real.

**Queremos:** moderno, memorable, elegante, interactivo, profesional. **Evitar:** texto arcoíris/multicolor, magenta-violeta como acento protagonista, neón permanente, sci-fi genérico, tarjetas repetitivas y monocromía plana sin jerarquía. Evitar parecer la identidad de No Country.

## 2. Tokens de color propuestos

| Token conceptual | Hex | Uso |
|---|---|---|
| `background` | `#0B101B` | Fondo global azul-negro |
| `surface` | `#121A28` | Superficies elevadas |
| `surface-raised` | `#172132` | Stage interactivo, paneles premium |
| `text-primary` | `#F5F7FA` | H1/H2, CTA secundarios |
| `text-secondary` | `#A7B3C7` | Párrafos y texto auxiliar |
| `accent-cyan` | `#18D4D8` | CTA principal, foco y nodos seleccionados |
| `accent-blue` | `#4D7CFF` | Profundidad, iluminación y conexiones |
| `border` | `#334155` | Límites tenues |
| `success` | revisar tokens/sistema existente | Únicamente estados VERIFICADOS reales |

Estos valores son **candidatos a normativizar mediante ADR**: no pisar los tokens actuales `#080A12`, `#10131D`, `#18E0E0`, `#985CFF` hasta conciliar la decisión de color. Violeta puede persistir en arte histórico, pero no como acento de marca protagonista.

### Regla cromática 85/10/5 (orientativa)

- ~85 % superficies neutras oscuras y tipografía blanca/gris.
- ~10 % contraste por jerarquía, ilustración, azules de profundidad.
- ~5 % cyan para acciones, conectores activos y foco.

No es una exigencia matemática, sino control de densidad de color. Nunca hacer párrafos o titulares enteros con gradientes; preferir título blanco sólido y un subrayado/acento pequeño.

## 3. Tipografía

- Conservar **Geist Sans** para UI y títulos, **Geist Mono** solo para rótulos técnicos/datos, respetando ADR existente.
- H1 desktop: objetivo `clamp(3.5rem, 5vw, 5.5rem)`, line-height 1.02–1.08, weight 650–750; ajustar según ancho y longitud traducida.
- H1 móvil: objetivo 2.25–3.25rem; máximo 3–4 bloques de lectura, sin cortes antinaturales.
- H2: 2–3.5rem en desktop, 1.8–2.4rem en móvil; peso 600–700.
- Texto intro: 1–1.125rem, 1.55–1.7 line-height; ancho legible <= 60–70 caracteres por línea.
- Metadata/eyebrows: 0.70–0.80rem con tracking moderado (no sacrificar contraste).
- No usar todo en caps lock ni barras de texto pequeñas que obliguen a hacer zoom.

## 4. Composición y layout

- Contenedor interior desktop máximo ~1280–1360px según viewport, padding lateral adaptativo 24–64px.
- Grid desktop Hero ~43/57 o 45/55, **no** panel derecho pequeño; stage del producto debe ocupar cerca de la mitad y dominar visualmente.
- Espaciado basado en escala 8px (8/16/24/32/48/64/96); secciones con ritmo y respiros, no todos los bloques con la misma altura.
- Sobre 1024px: composición en dos columnas y previews con superposición moderada.
- 768–1023px: layout simplificado en una columna y media o dos bloques; impedir truncamiento de idioma.
- <=767px: columna única, titular arriba, CTAs accesibles, selector desplazable/controlable y stage horizontalmente contenido; nada de overflow horizontal.
- Reordenar proyectos visuales por prioridad: TramitIA grande, AcademIA/Partner Intelligence distintos; jamás todos con proporción/cajas idénticas.

## 5. Profundidad e iluminación

- Luz radial cyan/azul detrás del producto principal, no por toda la pantalla.
- Una o dos capas sobrepuestas con `translate/rotate` muy discretos (2–4 grados) en desktop; en móvil volver a plano y legible.
- Sombra difusa y borde de baja opacidad, separaciones principalmente por elevación/contraste; NO todo rodeado de rectángulos.
- Curva/línea de transición decorativa Hero → Proyectos permitida (SVG/CSS liviano), pero no debe ser esencial para entender contenido ni interceptar clics.
- No copiar literalmente el UI ficticio de la imagen conceptual; usar capturas verificadas de productos o mockups neutros **expresamente ilustrativos**.

## 6. Componentes esenciales

**Header:** marca clara; accesos Proyectos, Ingeniería, Sobre mí y Contacto; switch ES/EN/PT; CTA. Sticky compact, foco visible, mobile menú accesible.

**Hero editorial:** eyebrow con rol, H1 sólido en blanco, resumen orientado a resultados sin atribuciones falsas, CTA primario a proyectos y secundario a contacto o casos.

**Product Stage:** área principal visual (TramitIA/AcademIA/Partner Intelligence), con selector real, preview, overlay acotado de flujo ilustrativo si corresponde, estado seleccionado y transición de escena. No tabs con párrafo como única respuesta.

**Project Showcase:** presentación cinematográfica editorial, imágenes reales grandes, texto muy breve, tecnologías como evidencia secundaria, enlaces a case study/demo cuando existan. Mobile imagen arriba/texto debajo, sin montajes ilegibles.

**Engineering Explorer:** visual posterior con nodos/conectores interactivos; seleccionar un nodo cambia conexiones enfocadas y panel contextual. Distinto de Product Stage (que es una vista de producto).

**Capability Strip:** 3–4 grandes capacidades con ejemplos de proyectos; no lluvia de logos.

**Contact:** CTA inequívoco, enlaces reales a GitHub/LinkedIn/email/CV si existen.

## 7. Motion tokens y comportamientos

| Evento | Movimiento de referencia | Propósito |
|---|---|---|
| Entrada Hero | opacity + translateY(12–24px) 350–550ms | Jerarquía inicial sin bloquear lectura |
| Selector proyecto | crossfade 180–300ms + leve profundidad | Reconocer cambio de producto |
| Hover preview | elevación 4–8px o rotación <=2° y borde tenue | Indicar exploración, nunca ocultar link |
| Scroll a proyectos | reveal 300–600ms, triggered al aparecer | Continuidad narrativa sin scroll-jacking |
| Conexión/nodo seleccionado | resaltado 150–250ms, panel contextual inmediato | Comprensión del sistema |
| CTA | estado hover/focus evidente en <180ms | Feedback de interacción |

Preferir `motion` ya instalado y CSS/SVG; no instalar Three.js/GSAP solo por estética. Evitar partículas constantes, animaciones infinitas, animación de brillo que afecte legibilidad, vídeos en autoplay.

**Reduced motion:** sin efectos parallax, tilt, movimiento de nodos o desplazamientos; conservar selección y acceso a la información instantáneamente. Asegurar foco/teclado/aria y elementos con tamaño táctil orientativo >=44×44px.

## 8. Estados y accesibilidad

Todos los componentes interactivos deben definir `default`, `hover` cuando aplique, `focus-visible`, `selected/active`, `disabled` cuando corresponda y `loading/error` si llaman una API. Contraste WCAG AA verificable en implementación, incluidas opacidades/fondos finales. Los indicadores no dependen únicamente del color. Evitar transiciones que causen layout shift.

## 9. Performance

No añadir bundles para efectos sin valor. `next/image` cuando aplique; dimensiones declaradas; imágenes reales optimizadas AVIF/WebP; preload SOLO del hero realmente visible; lazy load de proyectos inferiores; evitar scroll handlers frecuentes y usar IntersectionObserver para escenas. Preferir Server Components y aislar lo interactivo a Client Components.

## 10. Fuente visual

`docs/design/reference/hero-dark-engineering-premium.png`: **objetivo estético conceptual**, NO plantilla pixel-perfect, NO fuente de hechos, NO screenshot de producto. Ver `REFERENCES.md`.
