# UX/UI Blueprint — Interactive Engineering Showcase

**Usuario objetivo:** reclutadores/hiring managers + clientes que buscan servicios de software/IA. **Idioma:** ES/EN/PT.
**Referencia conceptual:** `docs/design/reference/hero-dark-engineering-premium.png`.
**Diferencia exigida:** el usuario rechazó una página que parece documentación técnica o una distribución de las tarjetas actuales. Cambiar estructura visual y comportamiento de verdad.

## Arquitectura de información

Home: `Header` → `Hero immersive Product Stage` → `Featured Product Showcase` → `Capabilities by evidence` → `Engineering in Action` → `About / Experience` → `Contact`. Catálogo y case studies tienen rutas propias. Mantener SEO/navegación y no introducir scroll obligatorio.

El orden de experiencia es intencional: **primero producto y evidencia visual**, después especialización y arquitectura. El visitante puede saltar al área que necesite desde header.

## 1. Header

Desktop: marca a la izquierda, navegación Proyectos/Ingeniería/Sobre mí/Contacto, ES/EN/PT, CTA «Hablemos». Sticky con borde inferior suave, superficie semiopaca opcional sin recargar.
Móvil: marca, selector o menú de idioma accesible, botón de menú; enlaces operativos y cierre claro al navegar. Páginas de proyecto muestran acceso de regreso y contexto actual.

## 2. Hero — diseño y copy

**Composición desktop:** izquierda editorial (43–47%): rol + H1 blanco + subtítulo real + CTA «Ver mis proyectos» y «Contactar» + 3–6 capacidades condensadas si no distraen. Derecha escenario visual (53–57%): Producto seleccionado + UI/captura real grande + mini arquitectura **ilustrativa** en superposición ligera. Fondo azul-negro con luz radial cyan detrás del stage.

**Copy de trabajo (editable después, no hecho medible):**
- Rol: `AI & Agentic Systems Engineer`.
- H1: `Software, datos e inteligencia artificial convertidos en soluciones reales.`
- Sub: `Diseño y desarrollo sistemas de software, datos e IA para resolver problemas concretos.`
- CTA A: `Ver proyectos` → ancla o catálogo funcional.
- CTA B: `Contactar` → enlace de contacto real.

**No** pintar la segunda mitad del H1 con gradiente. Preferir H1 blanco + breve línea subrayada/acento cyan.

### Stage del Hero: interacción comprobable

**Estado inicial**: TramitIA seleccionado. En vez de un cuadro con pestañas y descripción, mostrar un escenario visual de producto y un mini trayecto de sistema ligado a datos verificados. Opciones visibles TramitIA / AcademIA / Partner Intelligence. Cada opción:
1. Cambia el título y texto **corto** al proyecto.
2. Cambia imagen/preview del producto (captura real si se dispone) y la composición visual (no solo párrafo).
3. Cambia mini conexiones/contenido del esquema si hay arquitectura respaldada; si no la hay, se muestra solo el producto sin inventar.
4. Enlace «Ver caso» lleva a `/{locale}/projects/{slug}`.
5. «Abrir demo» solo cuando el proyecto tiene URL que realmente abre para el tipo de visitante; explicar acceso por invitación cuando corresponda.

**Selección:** clic, toque, teclado; tablist accesible o botones, `aria-selected` o `aria-pressed` consistente; foco visible; transición visual 180–300ms; no depender del hover, no autogirar sin control. Cambio de selección no mueve inesperadamente el scroll, ni inserta contenido que robe foco. Mantener nombres ES/EN/PT.

**Tilt/parallax:** limitado a puntero fino sobre desktop, amplitud mínima y como mejora opcional. Con teclado/móvil/reduced-motion no utilizar. Prefiere respuesta suave sin layouts costosos.

**No presentar mini-flujo como IA en vivo.** Rótulo persistente de `Arquitectura ilustrativa` cuando no es una ejecución real.

### Wireframe desktop (orientativo)

```text
+-----------------------------------------------------------------------------+
| Diego Borges    Proyectos  Ingeniería  Sobre mí  Contacto    ES EN PT [CTA] |
+-----------------------------------------------------------------------------+
|  ROL / AI ENGINEER       |      [TramitIA] [AcademIA] [Partner Intel.]       |
|                         |     __  PRODUCT STAGE / PRODUCT REAL  __           |
|  H1 BLANCO 3–4 líneas   |    /  captura + iluminación focal       /         |
|                         |   /   mini flujo ilustrativo opcional   /          |
|  Intro 2–3 líneas       |  /______________________________________/           |
|  [Ver proyectos] [CTA]  |             [Ver caso →]                             |
|  Capacidades discretas  |                                                       |
+-- línea/luz de transición sutil al scroll, no scroll lock ------------------+
| PROYECTOS DESTACADOS                                                        |
| [TRAMITIA — preview REAL amplio + historia corta + CTA]                    |
| [ACADEMIA — preview distinto]     [PARTNER INTELLIGENCE — preview distinto] |
+-----------------------------------------------------------------------------+
```

### Wireframe móvil (orientativo)

```text
[Logo]                [Idioma] [Menú]
ROL
H1 blanco sin truncar
Subtítulo legible
[Ver proyectos] [Contactar]
[TramitIA | AcademIA | Partner I.] (scroll horizontal accesible si se requiere)
[PREVIEW real de producto 16:10, sin tilt]
[Mini flujo opcional, reflow vertical; rótulo ilustrativo]
[Ver caso]
--- transición suave sin animación obligatoria ---
PROYECTOS DESTACADOS
[Imagen TramitIA]
[Texto y CTA]
[Imagen AcademIA]...
```

## 3. Transición Hero → Proyectos

**Objetivo:** sensación cinematográfica editorial, no líneas de cuadros. El escenario del Hero pierde protagonismo mientras aparece el título de proyectos y una screenshot real grande. Un separador curvo/canvas decorativo liviano puede introducir el nuevo bloque, pero sin ocupar un viewport entero ni obligar a esperar.

- Scroll normal del navegador; `scroll-margin-top` para anclas.
- Opcional IntersectionObserver para entrada de título/imagen con opacity/translateY leve.
- En reduced motion, secciones aparecen sin efectos.
- En el primer scroll se ve producto + CTA, no un fondo vacío o una intro redundante.

## 4. Sección Proyectos — storytelling visual

**TramitIA principal:** stage o preview real amplio; un texto corto sobre el problema, solución, condición de piloto independiente y enlaces «Ver caso» / «Abrir piloto» (solo link verificado). No usar la pantalla inventada del mockup como captura auténtica. No inventar tiempos, precios, requisitos, estatus o fuentes.

**AcademIA:** composición propia basada en captura real del buscador/catálogo. Confirmar estado público y URL antes de mostrarlos. Resaltar organización/búsqueda de ofertas sin asumir funciones de RAG no documentadas.

**Partner Intelligence:** tratar el concepto de decisiones trazables, criterios AHP/TOPSIS con fuentes si documentados; visual de producto real. Acceso por invitación. No mostrar gráfico ficticio como resultado medido.

Requisito: el componente de tarjeta/caso es reutilizable mediante datos `Project`, pero permite variaciones compositivas `featured`, `editorial`, `compact` sin lógica hardcoded injustificada por nombre. `screenshots`, `videos`, `diagrams`, `metrics` existentes se consumen y validan (no duplicar datos).

CTA de cada card: debe navegar de verdad y mantener semántica. Navegación por teclado y tap. No capturas decorativas ilegibles de 200px.

## 5. «Ingeniería en acción» (después, NO duplicar Hero)

**Shipped (Phase C, ADR-015):** la home usa **Engineering Capabilities** — tablist editorial con evidencia enlazada a casos MDX publicados (`components/capabilities/*`). Mantiene `id="approach"` para el CTA del Hero.

El Hero responde **qué construiste**; un explorador posterior puede responder **cómo y por qué funciona** sin repetir el Product Stage. Cambiar `Approach.tsx` de tabs+panel textual a explorador de sistemas sigue como trabajo opcional (Phase G+).

Concepto: selector de proyecto / vista de arquitectura visual / nodos y conexiones / panel de decisión de ingeniería / enlace a evidencia/case study. Los nodos muestran contexto real: tarea, decisión, dependencia, validación, limitaciones; si el diagrama es pedagógico, rótulo «Ilustrativo». No mostrar nodos inertes que parezcan clicables.

Móvil: diagrama convertido a pasos/carrusel accesible, información completa sin canvas interactivo. Soporta touch, teclado, lector de pantalla y reduced motion. Las representaciones de la arquitectura deben tener una alternativa textual equivalente.

Si se incorpora simulación RAG, diferenciar fragmentos estáticos, recuperación simulada, selección y respuesta; jamás atribuir procesamiento real a una animación.

## 6. Capacidades, About/Experience, Contact

**Capacidades:** IA/RAG/agentes, datos/ETL/analítica, Full-Stack/APIs, infraestructura/despliegue. Anclar cada una en uno o más proyectos reales; evitar una muralla de badges.

**About/Experience:** redactar solo con datos profesionales validados; `profile.mdx` y `experience.mdx` eran drafts al revisar el repo. No inventar trabajos, niveles de seniority o resultados de clientes.

**Contacto:** CTA para contratar y colaborar; enlaces de email/LinkedIn/GitHub, CV si hay archivo; no crear formulario que requiera backend sin necesidad.

## 7. Copy, localización, fiabilidad

Cualquier texto, botón, estado o aria-label nuevo debe existir ES/EN/PT. No usar un texto español como fallback silencioso en EN/PT. Verificar nav sticky en portugués e inglés con títulos largos. Estado real de demo puede requerir aviso explícito.

## 8. Criterios observables de aceptación UX

- En menos de un pantallazo, queda claro rol + qué construye + acceso a proyectos.
- Cambiar TramitIA→AcademIA cambia la imagen/escenario, no solo el contenido textual.
- Al hacer scroll, el cambio Hero→Proyectos produce continuidad visual y permite entrar a un caso directamente.
- Los tres casos no se presentan como tarjetas idénticas con títulos y párrafos.
- La sección «Enfoque» deja de duplicar el patrón del Hero.
- A 375/768/1440 px y con teclado o touch no se pierde ninguna acción; sin overflow horizontal.
- Con `prefers-reduced-motion`, el sitio sigue comunicando toda la información sin efectos.
- Todos los hechos, fotos, cifras y links del producto provienen de fuente verificable; el arte conceptual no sirve como evidencia.
