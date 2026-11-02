# Design System

## Dirección

Dark Engineering Premium (ADR-014), dentro de Interactive Engineering Showcase.

Debe sentirse como un producto tecnológico profesional. El título va en blanco sólido. El cyan marca la acción y el foco. El azul da profundidad. El violeta no es acento de marca y no hay titulares con degradado.

## Paleta

Aceptada en ADR-014. Los tokens viven en `app/globals.css`.

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

La paleta anterior (`#080A12`, `#10131D`, `#F6F7FA`, `#969DAC`, `#18E0E0`, `#985CFF`) queda reemplazada.

## Contraste (WCAG 2.x)

Ratios calculados con luminancia relativa WCAG el 2026-10-31:

| Color | Sobre Background `#0B101B` | Sobre Surface `#121A28` | Sobre Surface raised `#172132` | Uso |
|---|---|---|---|---|
| Primary text `#F5F7FA` | 17.72:1 | 16.25:1 | 15.05:1 | Texto (AAA) |
| Muted text `#A7B3C7` | 8.98:1 | 8.23:1 | 7.63:1 | Texto body (AAA) |
| Cyan `#18D4D8` | 10.37:1 | 9.51:1 | 8.81:1 | Acción, foco y acentos (AAA) |
| Blue `#4D7CFF` | 5.11:1 | 4.69:1 | 4.34:1 | Profundidad. AA sobre Background y Surface; no usarlo como texto chico sobre Surface raised |

Umbrales: AA texto normal ≥ 4.5:1, AA texto grande ≥ 3:1, AAA texto normal ≥ 7:1.

Reglas:

- Body text: Primary o Muted.
- Cyan es el acento de acción. No pintar párrafos enteros de cyan.
- Blue no se usa para párrafos ni para texto chico sobre Surface raised.
- El borde `#334155` separa superficies. No es color de texto.
- Verificar contraste de nuevo si cambia algún color o se usa opacidad.

## Color

Sin degradado violeta → azul → cyan. Un título es blanco. Una luz radial cyan o azul puede vivir detrás del producto, no sobre las letras.

## Tipografía

**Decisión aceptada (ADR-013):** Geist Sans para títulos, navegación y body. Geist Mono solo para labels y metadata. Ambas familias se cargan con `next/font/google` (`Geist` y `Geist_Mono`), self-hosted, sin layout shift y sin requests a terceros en runtime. Los tokens viven en el tema (ADR-008), no en cada componente.

### Sans
Para:
- títulos;
- navegación;
- body;
- cards;
- contenido.

### Monospace
Solo para:
- labels;
- números de sección;
- metadata;
- pequeños tags técnicos.

## Componentes visuales

- Navbar
- Button
- SectionHeading
- Badge
- ProjectPreview
- ProjectCard
- CaseStudySection
- CopilotPanel
- PromptChip
- Timeline
- FilterTabs

## Hero

Mensaje principal:

**ENGINEERING SOLUTIONS  
FROM DATA.**

La segunda línea usa el mismo blanco que el resto del título. No lleva degradado.

## Motion system

```text
motion.fast
motion.normal
motion.slow

hover.lift
hover.tilt
hover.glow

reveal.fade
reveal.slide
reveal.stagger

cursor.parallax
```

## Reglas de motion

- La animación debe reforzar jerarquía o feedback.
- No bloquear interacción.
- Evitar animaciones largas.
- Respetar `prefers-reduced-motion`.
- Mobile usa versiones simplificadas.

## Efectos permitidos

- Glow sutil que responde al cursor.
- Tilt leve en project preview.
- Parallax mínimo.
- Reveal al hacer scroll.
- Transiciones de filtros.
- Movimiento suave de nodos en hero.

## Evitar

- Partículas excesivas.
- Terminal fake como elemento dominante.
- Neon constante.
- 3D pesado.
- Cursor personalizado invasivo.
- Animaciones que oculten contenido.
