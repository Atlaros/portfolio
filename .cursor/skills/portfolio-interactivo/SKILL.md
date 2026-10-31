---
name: portfolio-interactivo
disable-model-invocation: true
description: Evolucionar de forma incremental un portafolio existente de AI & Agentic Systems Engineer, aportando interacciones significativas, visualizaciones de arquitectura y casos verificables sin cambiar su identidad, tipografia, paleta, i18n ni funcionalidades existentes. Usar al modificar el hero, proyectos, case studies, microdemos y UX del portafolio.
---

# Portfolio interactivo — evolución controlada

## Compatibilidad obligatoria con Gentle IA (ODD / Engram / CodeGraph / RDD)

Esta skill es una especialización de UX/frontend del **repositorio de portafolio** y debe ejecutarse **dentro del flujo ya configurado por Gentle IA**, nunca como segundo orquestador.

- Antes de editar, detectar y respetar `.cursor/rules/gentle-ai.mdc`, `AGENTS.md`, `odd/tasks/` y cualquier instrucción local de Gentle IA presente. No reescribirlas, desactivarlas ni reemplazarlas. No editar archivos gestionados por Gentle IA ni `~/.gentle-ai/`.
- **ODD determina la clasificación, el documento de tarea cuando aplique, autorización y secuencia de trabajo**. Las fases A–D aquí son objetivos y criterios de producto, no un plan paralelo que sustituya ODD. Si ODD ya aprobó una secuencia, usarla.
- **Engram** es la memoria si está configurada; no introducir memorias paralelas. **CodeGraph**, si está disponible, sirve para explorar dependencias; no asumir que siempre existe. **RDD y pruebas** se aplican según configuración existente, sin instalar otros hooks ni imponer un segundo ciclo de revisión.
- No instalar Superpowers ni otros frameworks de orquestación, nuevos agentes, hooks o reglas `alwaysApply` como dependencia de esta skill. Las Skills de diseño, React o accesibilidad pueden complementar el trabajo, pero no gobernar el flujo.
- Ante contradicción con las instrucciones existentes de Gentle IA, conservar la configuración vigente del proyecto y explicar el conflicto antes de modificarla. No inventar un orden de precedencia universal entre instrucciones; solicitar criterio humano cuando no se pueda conciliar.
- Esta skill usa `disable-model-invocation: true`: invocarla explícitamente con `/portfolio-interactivo` y no cargarla para cualquier cambio de frontend.

## Misión y restricciones prioritarias

La meta es demostrar capacidades reales de **AI & Agentic Systems Engineering**, ingeniería full-stack y producto mediante experiencias interactivas de alta calidad. **No es un rebranding ni una reescritura.**

1. **Conservar el posicionamiento `AI & Agentic Systems Engineer`.** Se puede comunicar la capacidad full-stack como habilidad complementaria, sin cambiar el eje profesional del sitio.
2. **Conservar la identidad visual existente**, en particular tipografía **Geist**, tokens, paleta, fondo, tono, estructura de rutas y decisiones de diseño ya cerradas. Extraer los valores reales del repositorio: no introducir una paleta inventada, fuentes nuevas ni un sistema de diseño paralelo.
3. **Preservar funcionalidad existente**, componentes, comportamiento, navegación, accesibilidad y SEO. Reutilizar antes de reemplazar. No cambiar el stack ni añadir dependencias injustificadas.
4. **Preservar i18n ES/EN/PT** y el formato existente de rutas, diccionarios y enlaces. Cualquier texto nuevo debe existir en los tres idiomas; no mezclar idiomas.
5. **No inventar hechos**. Estados de despliegue, cifras, nombres técnicos, capturas, URLs, resultados, métricas y arquitecturas publicados deben salir del repo o de fuentes verificables aportadas por el usuario. Ante carencias: presentar una explicación sin cifra, un placeholder interno o un `TODO`; no inventar datos públicos.
6. **No publicar demos ficticias como reales**. Diagramas conceptuales o simulaciones se rotulan visiblemente. Sin API real, una consulta RAG es una **simulación interactiva**, no inferencia ni retrieval reales.
7. Antes de modificar archivos, inspeccionar el estado de `git` y evitar pisar cambios sin commitear. No limpiar, sobrescribir o reorganizar trabajo ajeno.

## Lo que YA existe y NO se debe rehacer a ciegas

La sección **Enfoque** presenta las etapas **Problema → Límite → Sistema → Validación → Evidencia**, conectadas con los casos de **TramitIA y AcademIA**; tiene selección y avance automático hasta que el usuario interviene. **Revisar la implementación real** antes de sugerir cambios. Mejorar claridad, jerarquía, microinteracciones y accesibilidad si hace falta, pero mantener el flujo, contenido veraz y comportamiento probado. No rehacer desde cero ni duplicarlo.

El portafolio ya utiliza Geist y una paleta cerrada. Si una técnica visual entra en conflicto con lo existente, adaptar la técnica, no la marca.

## Criterios técnicos dentro del flujo ODD

### 1. Auditar antes de editar

- Leer `package.json`, estructura de rutas, entrypoints, componentes clave, estilos globales, tokens, fuentes, diccionarios ES/EN/PT, enlaces y assets.
- Examinar el hero y los componentes de Enfoque y Proyectos. Determinar qué funciona, qué necesita mejora y qué archivos se afectarían.
- Identificar si existe un catálogo de proyectos y cuál es la fuente de verdad para cada proyecto, las capturas, el estado y los enlaces.
- Revisar dependencias de animación ya instaladas; si no hay necesidad, usar CSS/SVG antes de introducir librerías.
- Comunicar en pocas líneas: 3 cosas que se conservan, 3 mejoras de alto impacto, riesgos y archivos a tocar.

### 2. Diseñar una evolución, no una identidad nueva

- Mantener la estética oscura, tipografía Geist y los colores/tokens actuales. Puede variar escala, distribución, ritmo, composición y aprovechamiento de espacios; evitar un listado uniforme de tarjetas.
- Crear un wireframe mínimo (texto) y describir el comportamiento de la interacción propuesta, incluyendo estados de móvil y modo sin movimiento.
- Cada animación debe tener propósito: orientar, demostrar un flujo técnico, vincular causa y efecto o comunicar feedback. No usar glow/partículas/scroll-jacking por rutina.
- No sustituir la portada por frases vacías como «creo soluciones revolucionarias» ni cambiar AI & Agentic Systems Engineer por un título genérico.

### 3. Implementar en pasos pequeños

**Fase A — Hero interactivo (primera implementación).** Conserva H1/posicionamiento semántico del sitio y su identidad. Añade a un lado o debajo, según breakpoint, **un elemento interactivo visible en el primer pantallazo** que explique el trabajo real del profesional. Preferir una representación de flujo de sistemas basada en proyectos verificados (por ejemplo datos → procesamiento/validación → API/agentes → producto), seleccionable con clic, tacto y teclado. Si es conceptual, etiquetarlo como arquitectura ilustrativa y no dar a entender un procesamiento activo.

No sustituir toda la página. Mantener los CTA reales y optimizar composición de escritorio/móvil. Si el layout actual exige una decisión alternativa, justificarla con evidencia del código.

**Fase B — Casos de estudio.** Mejorar la presentación de TramitIA y AcademIA sin perder fuentes. Completar **Partner Intelligence** si el repositorio tiene hechos y materiales suficientes; de lo contrario, dejar tareas identificadas sin fabricar una historia. Mostrar: problema, restricción, decisión de ingeniería, arquitectura, estado real, evidencia y enlace que realmente funciona. Variar composición visual de los casos, no repetir tarjetas sin diferenciación.

**Fase C — Microdemo de RAG.** Solo después de A y B. Crear microdemo que permita elegir una pregunta o un fragmento y recorrer etapas; debe explicar la diferencia entre **embedding conceptual**, **recuperación simulada**, **selección** y **respuesta con referencia a fragmentos provistos**. Si no hay backend real conectado, usar un dataset estático pequeño y no atribuir capacidades al sistema real. La simulación debe ser reproducible, sin usar secretos, y debe funcionar desconectada de cualquier API externa.

**Fase D — Enfoque y pulido.** Mejorar la sección ya existente únicamente donde la auditoría encuentre problemas concretos. Unificar transiciones, responsive, SEO, semántica, foco, accesibilidad y rendimiento.

No pasar a la fase siguiente si la actual no supera las verificaciones básicas. Si el usuario solo pide una fase, no implementar las demás.

## Animaciones y visualizaciones con rigor

- Priorizar CSS y SVG accesibles para interacciones pequeñas; usar Motion para React **solo si está instalado o si una interacción lo justifica**, comprobando versiones e integración.
- `prefers-reduced-motion`: animaciones reducidas o desactivadas sin perder información ni funcionalidad; nunca depender del movimiento para comprender el contenido.
- No crear loops animados pesados, efectos 3D innecesarios, cursores personalizados o video en autoplay.
- Evitar layout shift, dependencias excesivas, animaciones que bloqueen foco y contenido inaccesible al teclado.
- Estados claros: default, hover (cuando aplique), active, focus-visible, loading y error si hay peticiones reales.
- Si visualizas la arquitectura de un proyecto, separar con claridad componentes verificados de abstracciones didácticas.

## Criterios de evidencia y honestidad

- **TramitIA**: comprobar la descripción y las URLs actuales en el código y/o material proporcionado; no atribuir condición oficial municipal si no lo es.
- **AcademIA**: comprobar dónde está disponible hoy; no copiar descripciones antiguas de local/desplegado.
- **Partner Intelligence**: documentar solo fuentes, métodos, stack, despliegue y métricas que puedan sostenerse con fuentes concretas.
- Distinguir valor de producto, habilidades técnicas y resultados medidos. No convertir métricas internas en métricas de impacto al usuario.
- Cada botón muestra su propósito y tiene una ruta válida; para demos no disponibles, presentar capturas verificadas o el caso técnico sin botón falso.

## Verificación y cierre

- Detectar y ejecutar comandos presentes: lint, typecheck, tests y build que apliquen; no asegurar éxito de verificaciones que no se corrieron.
- Revisar a 375/768/1440 px cuando haya navegador disponible; teclado y móvil, foco, contraste, idioma y modo de movimiento reducido.
- Inspeccionar las diferencias (`git diff`) para asegurar que no se alteraron paleta, Geist, i18n, rutas ni Enfoque sin necesidad.
- Al entregar, indicar qué cambió visualmente, archivos modificados, pruebas reales y pendientes. Evitar afirmaciones genéricas de 'listo' sin evidencia.

## Forma de colaborar

Responder con diagnóstico específico del código, no con consejos genéricos. Mostrar una propuesta y luego ejecutar **Fase A** dentro de la solicitud del usuario sin esperar aprobación sobre cada detalle no crítico. Ante conflicto entre una idea estética y una funcionalidad existente, priorizar funcionalidad, identidad y trazabilidad.
