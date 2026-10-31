# Design System

## Dirección

Dark Data / AI / Engineering.

Debe sentirse como un producto tecnológico profesional.

## Paleta inicial

```text
Background      #080A12
Surface         #10131D
Primary text    #F6F7FA
Muted text      #969DAC
Cyan            #18E0E0
Blue            #4D7CFF
Purple          #985CFF
```

## Contraste (WCAG 2.x)

Ratios calculados con luminancia relativa WCAG:

| Color | Sobre Background `#080A12` | Sobre Surface `#10131D` | Uso |
|---|---|---|---|
| Primary text `#F6F7FA` | 18.45:1 | 17.30:1 | Texto (AAA) |
| Muted text `#969DAC` | 7.26:1 | 6.81:1 | Texto body (AA; AAA sobre Background) |
| Cyan `#18E0E0` | 12.03:1 | 11.28:1 | Texto y acentos (AAA) |
| Blue `#4D7CFF` | 5.31:1 | 4.98:1 | Texto AA (no AAA); preferir links, labels o texto grande |
| Purple `#985CFF` | 5.00:1 | 4.69:1 | Texto AA justo; preferir texto grande, highlights o decorativo |

Umbrales: AA texto normal ≥ 4.5:1, AA texto grande ≥ 3:1, AAA texto normal ≥ 7:1.

Reglas:

- Body text: Primary o Muted.
- Blue y Purple pasan AA, pero con poco margen (sobre Surface quedan cerca de 4.5:1); no usarlos para párrafos largos ni texto pequeño.
- El gradiente sobre texto (`FROM DATA.`) es texto grande; todas las paradas superan 3:1.
- Verificar contraste de nuevo si cambia algún color o se usa opacidad.

## Gradiente

Solo para highlights:

```text
Purple → Blue → Cyan
```

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

`FROM DATA.` usa el gradiente principal.

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
