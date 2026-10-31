# Plan completo para Cursor — Dark Engineering Premium

**No es una nueva orquestación**: ejecutar los hitos dentro de Gentle IA / ODD, documentando tareas y ADR conforme al proyecto. Se escribe la secuencia para no perder ninguna decisión aprobada.

## Hito 0 — Integración y concordancia documental (sin cambios UI)

1. `git status` y branch adecuado; preservar cambios locales.
2. Leer `.cursor/skills/portfolio-interactivo/SKILL.md`, `AGENTS.md`, `docs/00-PROJECT-STATE.md`, `docs/01-PRD.md`, `docs/02-ARCHITECTURE.md`, `docs/03-DESIGN-SYSTEM.md`, ADR-008/009/013 y otros afectados, `odd/tasks/`.
3. Leer nuevos `docs/design/*` y revisar diferencia con decisiones previas. **Proponer** ADR actualizando identidad visual (paleta, gradientes, preservación de Geist) y el cambio de Enfoque a Ingeniería en acción, sin sobreescribir ADR anteriores.
4. Auditar código vigente: `Hero`, `HeroFlow`, `Approach`, `ProjectCard`, `FeaturedProjects`, `CaseStudy`, `RagDemo`, `CopilotPanel`, `domain/project.ts`, locales, assets, tests y dependencias.
5. Elaborar inventario de assets reales faltantes (TramitIA, AcademIA, Partner Intelligence), URLs, métricas y estados. NO publicar la imagen generada como screenshot ni copiar sus datos ficticios.
6. Proponer lista de archivos a modificar, riesgos y criterios de aceptación; tramitar clasificación/autorización ODD.

**Gate:** diagnóstico + decisiones normativas conciliadas + backlog ODD confirmado.

## Hito 1 — Prototipo visual aislado, NO homepage productiva

Prototipar Hero editorial y transición Hero→Proyectos en ruta aislada o rama experimentada que siga las convenciones del repo. La ruta es temporal, no formar parte del sitemap ni SEO hasta su integración. No modificar `app/[locale]/page.tsx` productivo en esta fase si se puede evitar.

**Archivos candidatos** (no crear hasta explorar dependencias): nuevos `components/showcase/ProductStage.tsx`, `ProjectSwitcher.tsx`, `HeroShowcase.tsx`, estilos/tokens experimentales encapsulados, ruta provisional; reutilizar i18n, Zod y Motion.

**Aceptar solo si:** cambia realmente la composición vs screenshots actuales, selector cambia stage visual entre 3 productos, links de caso van a URL reales, nada se presenta como ejecución real, responsive 375/768/1440, reduced motion y teclado. Usar placeholders marcados cuando falten capturas; no inventar interfaces que aparenten producto.

**Gate:** comparación visual y revisión del usuario del prototipo; no adelantar toda la Home.

## Hito 2 — Header + Hero final

- Adaptar `components/layout/SiteHeader.tsx`, `components/hero/Hero.tsx`, decidir si `HeroFlow.tsx` se transforma o elimina; integrar diseño aprobado en `app/[locale]/page.tsx`.
- CTA de proyectos y contacto funcional; selector tres proyectos; mini flujo ilustrativo complementario y no repetitivo.
- Textos ES/EN/PT en `lib/i18n/`; tipografía Geist; tokens normativos aprobados.
- Probar hover/focus/touch, selección, motion reducido; no overflow en móvil ni problemas de LCP.

**Gate:** Hero completo, sólido, navegable, sin dependencias injustificadas ni regresión i18n.

## Hito 3 — Proyectos destacados, catálogo y case studies

- Rehacer `FeaturedProjects.tsx`, `ProjectCard.tsx`, `CaseStudy.tsx` para previews grandes/editoriales sin repetir cajas.
- Usar `domain/project.ts` y archivos `content/{locale}/projects/*.mdx` como fuente de verdad.
- Incorporar screenshots **reales** verificadas en `public/projects/`; actualizar alt/caption y estados con fuentes.
- Conservar catálogo y filtros, revisar enlaces `liveUrl`/`repositoryUrl`; Partner Intelligence por invitación, TramitIA independiente, AcademIA estado confirmado.
- Contrastar contenido en 3 idiomas y tener fallback visual sin imagen, nunca pantalla ficticia como real.

**Gate:** 3 proyectos visualmente diferenciables, todos los links válidos y evidencia real.

## Hito 4 — Ingeniería en acción

- Sustituir presentación redundante de `components/approach/Approach.tsx` (tabs+textos) por explorador de arquitectura con nodos/etapas y contexto verificado.
- Hero = escaparate de producto; aquí = cómo funciona. Evitar explicar exactamente el mismo pipeline en ambos.
- Reusar `components/rag/RagDemo.tsx` solo si tiene valor; cualquier simulación etiquetada.
- Diseñar alternativa textual, teclado, touch, reduced motion, mobile sin canvas pesado.

**Gate:** se demuestra una decisión de ingeniería real de manera comprensible, no solo se cambian tabs por cajas.

## Hito 5 — Capacidades, perfil, experiencia y contacto

- Completar contenido verificado antes de diseñar su presentación definitiva. `content/profile.mdx`, `content/experience.mdx` y sus traducciones según convención real.
- Capacidades relacionadas a proyectos, nunca logos sueltos como elemento principal.
- CTA de empleo y colaboración, CV si existe, enlaces reales y accesibilidad.
- Decidir ubicación del `CopilotPanel`: buscador por reglas, no LLM. No añadir servicio de IA como requisito de rediseño.

**Gate:** un reclutador y un cliente pueden localizar trabajo relevante y contacto sin confusión.

## Hito 6 — QA, SEO, rendimiento y despliegue

- Comandos existentes: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` (registrar éxito/fallo real).
- Revisar ES/EN/PT: copy, rutas, títulos, labels, enlaces, selección del proyecto.
- Breakpoints 320, 375, 768, 1024 y 1440 px; evitar scroll horizontal y texto cortado.
- A11y: H1 único, semántica, teclado, foco visible, controles 44px aprox., contraste AA, alt, aria, reduced-motion.
- Perf: medición Lighthouse si hay navegador, LCP/CLS/INP, tamaño bundle, imágenes optimizadas; no prometer números no medidos.
- SEO: metadatos, canonical, Open Graph por proyecto con imágenes reales o plantilla claramente de marca.
- Revisar `git diff`, pruebas y capturas antes/después. Hacer revisión final antes de merge/deploy.

**Gate:** implementación revisada y validaciones documentadas; entregar cambios + riesgos + pendientes.

## Dependencias: no saltar

Hito 0 → 1 → validación visual → 2 → 3 → 4 → 5 → 6.

La aprobación de diseño no sustituye consentimiento sobre cambios de arquitectura, datos o deployment. Si ODD ya define otra secuencia segura, reconciliarla sin crear planificación paralela.

## Checklist global de aceptación

- [ ] Diseño distinto al portafolio anterior, no solo recolor.
- [ ] H1 blanco, cyan selectivo, sin título gradiente violeta-azul.
- [ ] Product Stage interactivo, cambia visual con selector.
- [ ] TramitIA, AcademIA y Partner Intelligence usan información confirmada.
- [ ] Imágenes de proyecto reales / placeholders explícitos.
- [ ] Transición Hero→proyectos útil y no intrusiva.
- [ ] «Ingeniería en acción» sin duplicar el Hero.
- [ ] Buen móvil, teclado, foco, reduced motion.
- [ ] ES/EN/PT íntegros.
- [ ] Sin LLM simulado como producción, ni métricas inventadas.
- [ ] Tests/build y revisión visual realizados y reportados.
