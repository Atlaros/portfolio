---
name: portfolio-interactivo
disable-model-invocation: true
description: Rediseñar el portfolio Atlaros/portfolio como Interactive Engineering Showcase con identidad Dark Engineering Premium, hero inmersivo, proyectos como productos y laboratorio visual de ingeniería, preservando funcionalidad, verdad, i18n y flujo Gentle IA/ODD.
---

# Portfolio interactivo — Dark Engineering Premium

## Decisión de producto y alcance

**Aprobado por el usuario:** público doble (reclutadores/hiring managers y clientes), estética tecnológica moderna, profunda e interactiva, rediseño VISUAL completo. **No** es un cambio superficial de paleta; **sí** permite sustituir composiciones, secciones y componentes visuales deficientes. No autoriza reescritura arquitectónica por motivos estéticos.

**Propuesta visual aprobada:** “Interactive Engineering Showcase” con identidad “Dark Engineering Premium”: fondos azul-negro, tipografía blanca sólida, cyan selectivo, azul eléctrico secundario, gradientes sutiles solo en luz e interfaces, casi nada de violeta y **nunca titulares arcoíris**. Referencia: `docs/design/reference/hero-dark-engineering-premium.png`. No copiar literalmente contenido ficticio del mockup.

**Documentos inseparables para esta tarea:**
- `docs/design/DESIGN-SYSTEM.md`: apariencia y componentes.
- `docs/design/UX-UI-BLUEPRINT.md`: comportamiento por sección y estado.
- `docs/design/IMPLEMENTATION-ROADMAP.md`: secuencia y pruebas.
- `docs/design/REFERENCES.md`: honestidad de activos visuales.

## Encaje con Gentle IA

1. Esta skill es **especialista UX/product/frontend**, NO otro orquestador. Respetar Gentle IA, ODD, Engram, CodeGraph y RDD según estén configurados. ODD determina clasificación, autorización, tarea y orden. No crear flujo paralelo, hooks globales, memoria paralela, skill `alwaysApply` ni nuevo framework de agentes.
2. Inspeccionar `git status`, reglas locales, `AGENTS.md`, `odd/tasks/`, documentación/ADRs y código antes de editar; no eliminar cambios sin confirmar. Esta skill se invoca expresamente con `/portfolio-interactivo` (`disable-model-invocation: true`).
3. Los documentos de diseño son **una propuesta de cambio aprobada visualmente**, no autorizan ignorar ADR previos. Identificar conflictos y proponer ADR/actualización del design system previo dentro del flujo ODD **antes** de sustituir valores normativos.
4. Preservar stack, rutas `/es`, `/en`, `/pt`, Next.js/React/TypeScript, modelos Zod, contenido estructurado, seguridad, navegación y pruebas útiles; refactorizar UI para eliminar redundancia. Nunca editar archivos de infraestructura Gentle IA sin autorización específica.
5. No instalar bibliotecas para aparentar sofisticación; preferir CSS/SVG/`motion` instalado. Añadir dependencias solo con justificación, métricas e impacto de bundle.

## Hallazgos del repositorio a revalidar

Auditoría anterior de `main` del repo `Atlaros/portfolio`:
- `components/hero/Hero.tsx`, `HeroFlow.tsx`: Hero con titular y patrón tabs + texto.
- `components/approach/Approach.tsx`: replica tabs/texto y recorrido automático; redundancia con Hero.
- `components/projects/ProjectCard.tsx`, `FeaturedProjects.tsx`, `CaseStudy.tsx`: tratamiento demasiado textual.
- `domain/project.ts`: campos `screenshots`, `videos`, `diagrams`, `metrics` ya disponibles.
- `public/projects/`: no había capturas al auditar; pedir assets reales, no simularlas en producción.
- `content/{es,en,pt}/projects`: TramitIA, AcademIA, Partner Intelligence. `profile.mdx`/`experience.mdx` en estado draft.
- `components/copilot/CopilotPanel.tsx` + `lib/copilot/answer.ts`: búsqueda por reglas/coincidencia léxica, **no** asistente LLM en vivo.
- `app/globals.css`, `docs/03-DESIGN-SYSTEM.md`: colores anteriores; requiere conciliar dirección visual nueva mediante ADR.

No asumir que esta lista refleja el último commit. Comparar con el árbol vigente.

## Requisitos visuales inequívocos

- Hero editorial con H1 blanca, CTA principal cyan y secundario discreto; escenario de producto con **profundidad** y proyecto seleccionable TramitIA / AcademIA / Partner Intelligence. En móvil: UI vertical funcional, sin overflow.
- El escenario derecho no debe ser otra tarjeta con tabs que cambian párrafos. Seleccionar proyecto debe cambiar la **composición visual completa** (preview real si existe, nombre, contexto y mini flujo ilustrativo diferente). Accesible por teclado/tacto; ningún control decorativo fingido.
- La transición del Hero a proyectos se resuelve con composición de secciones, iluminación y reveal sobrio; sin scroll-jacking, partículas permanentes ni shaders pesados.
- Proyectos: un caso visual protagonista y dos tratamientos secundarios diferentes, escalables a nuevos casos; screenshots verdaderas, no imágenes falsificadas como UI real.
- «Enfoque / El orden del trabajo» **no debe mantenerse con el patrón actual de pestañas textuales**. Replantear como «Ingeniería en acción» en sección posterior, con arquitecturas explorables y evidencia; no duplicar el mini esquema del Hero.
- Evitar diseño genérico SaaS/dashboard, bloques repetidos, paredes de logos, gradientes multicolor en títulos y estética similar a la de No Country.
- Mantener Geist Sans + Geist Mono de partida. Cualquier cambio de fuente/tokens que contradiga ADR se propone y documenta.

## Dos recorridos UX

**Reclutador:** identidad y especialización → trabajo publicado → stack como evidencia y decisiones → experiencia/CV si existe → contacto.
**Cliente:** problema → solución/visual del producto → caso, confiabilidad y alcance → contacto.

Cada usuario debe poder llegar a un caso o contactar sin agotar un scroll complejo. Los botones, tabs, nodos y enlaces deben tener acciones reales y nombres claros.

## Restricciones de veracidad y contenido

- El mockup generado es **conceptual**. Contiene texto/UI de ejemplo que NO se debe publicar como dato: cantidades de requisitos, plazos, procedimientos, posibles fuentes o pantallas, certificaciones de verificación, endpoints y estados no acreditados.
- TramitIA es piloto independiente, NO sitio oficial de la Alcaldía. Verificar funcionalidad real con su repositorio o documentación actual.
- AcademIA: confirmar estado y URL vigente; NO perpetuar “solo local” sin verificar, pero tampoco afirmar despliegue público no confirmado.
- Partner Intelligence: acceso por invitación no equivale a demo pública libre; verificar URLs, alcance y método analítico antes de publicar.
- No crear métricas, resultados, logos de clientes, testimonios, certificaciones o años de experiencia sin respaldo. Métricas técnicas internas != impacto del producto.
- Diagramas ilustrativos y simulaciones deben rotularse. Si se usa `RagDemo`, marcarla como simulación y no como RAG productivo.
- Copilot actual es buscador local, no LLM. No presentarlo como chat inteligente conectado ni conectar un proveedor sin alcance autorizado.

## Entrega por incrementos bajo ODD

0. **Auditoría + propuesta ADR**: confirmar código actual, detectar conflictos con AGENTS/ADRs y documentar decisiones. No modificar UI antes de conciliar reglas.
1. **Prototipo aislado**: Hero inmersivo + primera transición a proyectos; una ruta/branch de experimento según convenciones del repo; assets de referencia solo para guiar diseño. No bloquear producción.
2. **Hero y navegación**: composición final, selector de proyectos, CTAs, mobile y reduced motion.
3. **Showcase y case studies**: vistas con capturas reales, etiquetas y enlaces verificados.
4. **Ingeniería en acción**: arquitectura explorable real/ilustrativa validada, accesible, sin pestañas textuales duplicadas.
5. **Capacidades, perfil, contacto, Copilot**: priorizar información verificada y claridad de producto; el Copilot no debe monopolizar el home.
6. **Calidad/entrega**: ES/EN/PT, tests, 320/375/768/1024/1440, SEO, accesibilidad, Lighthouse cuando sea posible.

Las fases son hitos de producto, NO reemplazan el workflow o autorizaciones de ODD.

## Convenciones de interacción y desempeño

- Preferir estado seleccionable con `button`/`tab` accesibles; `Enter`, `Space`, flechas cuando se implemente tablist, foco visible y etiquetas descriptivas.
- Movimiento por cambios de transform/opacity; opción motion reducido; no autoplay necesario para comprender una arquitectura; no animaciones infinitas que distraigan.
- React Server Components para contenido no interactivo; clientes solo donde haga falta. `next/image` para capturas reales; lazy loading bajo el fold y dimensiones estables.
- No manipular el scroll obligatorio. El usuario siempre puede llegar por navegación normal a las secciones.
- Mantener textos completos ES/EN/PT; no mezclar idiomas o romper enlaces por locale.

## Cómo debe responder Cursor

Antes del primer cambio: lista de 3 elementos a conservar, 3 cambios estructurales, conflictos docs/ADRs, ruta de prototipo y archivos afectados. Luego, para cada fase, mostrar propuesta, implementar cuando ODD lo autorice y verificar comandos `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` cuando existan. Probar por teclado/móvil/reduced-motion y reportar exactamente qué pudo ejecutarse. Comparar visualmente antes/después y listar pendientes. No declarar validaciones sin correrlas.
