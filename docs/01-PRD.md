# PRD — Portfolio AI & Agentic Systems Engineer

## 1. Contexto

El portafolio debe servir como una evidencia profesional de capacidad para resolver problemas usando datos e IA.

No debe comportarse como un CV web tradicional ni como una colección de logos.

## 2. Objetivo

Permitir que reclutadores, clientes o colaboradores entiendan rápidamente:

- qué problemas resuelve Diego;
- cómo piensa;
- qué soluciones construyó;
- qué decisiones de ingeniería tomó;
- qué beneficios generan sus proyectos;
- qué aplicaciones se pueden probar.

## 3. Usuarios principales

### Reclutador técnico
Quiere identificar rápidamente experiencia relevante para roles Data / AI.

### Hiring manager / líder de negocio
Quiere entender impacto, criterio y capacidad de ejecución.

### Cliente potencial
Quiere saber si Diego puede convertir un problema en una solución funcional.

### Colaborador técnico
Quiere entender arquitectura, decisiones y stack.

## 4. Hipótesis MVP

Si el portafolio presenta los proyectos como casos de resolución de problemas y permite explorarlos mediante navegación y un Copilot, entonces el visitante comprenderá mejor el perfil profesional que con un CV tradicional.

## 5. Propuesta de valor

**Engineering solutions from data.**

Diseñar y construir soluciones basadas en datos e inteligencia artificial para resolver problemas reales, automatizar procesos y mejorar decisiones.

## 6. Requisitos

### REQ-001
El portafolio es independiente de las aplicaciones desplegadas.

### REQ-002
V1 contiene 5 proyectos.

### REQ-003
Cada proyecto tiene un case study.

### REQ-004
Cada proyecto puede enlazar una demo externa.

### REQ-005
Agregar proyectos no requiere rediseñar el sitio.

### REQ-006
El Copilot conoce perfil, experiencia y proyectos autorizados.

### REQ-007
Todos los proyectos siguen:
Problema → Solución → Cómo se resolvió → Beneficio.

### REQ-008
Las tecnologías son información secundaria.

### REQ-009
Dark UI con cyan y gradiente violeta/azul/cyan.

### REQ-010
El portafolio debe crecer progresivamente.

### REQ-011
Los proyectos se gestionan como contenido estructurado.

### REQ-012
Agregar un proyecto no debe requerir cambios arquitectónicos.

### REQ-013
Cada proyecto puede incluir screenshots, video y diagrama.

### REQ-014
El Copilot solo responde con información profesional autorizada.

### REQ-015
El proveedor LLM debe poder sustituirse.

### REQ-016
Las conversaciones no se persisten en V1.

### REQ-017
La web respeta `prefers-reduced-motion`.

### REQ-018
Ningún secreto se expone al navegador.

### REQ-019
Las apps externas no se cargan automáticamente.

### REQ-020
Mobile debe diseñarse específicamente.

### REQ-021
SEO básico: metadata por página (title, description), `sitemap.xml`, `robots.txt` y URL canónica.

### REQ-022
Cada proyecto tiene imagen Open Graph / social share propia (estática o generada), con fallback global.

### REQ-023
Contacto mediante enlaces (mailto + LinkedIn y otros canales profesionales). Sin formulario en V1 (no hay backend ni DB).

### REQ-024
Si el Copilot envía preguntas a un proveedor LLM externo, se muestra una nota de privacidad mínima junto al input (las preguntas se procesan con un tercero y no se persisten).

### REQ-025
El Copilot se entrega en V1.1 y no bloquea el lanzamiento de V1. Cuando no esté disponible, la UI muestra un mensaje de fallback controlado.

### REQ-026
El Copilot tiene tope de gasto: máximo de tokens por respuesta, máximo de preguntas por sesión/IP y alerta de presupuesto mensual del proveedor.

## 7. User stories

### US-001 — Explorar trabajo
Como reclutador, quiero ver los proyectos principales para comprender rápidamente qué tipo de problemas ha resuelto Diego.

**Criterios**
- Se muestran proyectos destacados.
- Cada uno muestra problema, solución y beneficio.
- Existe acceso al case study.

### US-002 — Ver proyecto
Como visitante, quiero abrir un case study para entender cómo se resolvió un problema.

**Criterios**
- Se explica problema, solución, arquitectura y decisiones.
- Se muestran screenshots cuando existan.
- Se muestra Live Demo cuando exista URL.

### US-003 — Filtrar proyectos
Como reclutador, quiero filtrar por Analytics, Data Science, AI o Data Engineering.

### US-004 — Preguntar al Copilot (V1.1)
Como visitante, quiero preguntar sobre experiencia y proyectos sin tener que leer toda la web.

### US-005 — Contactar
Como visitante interesado, quiero acceder fácilmente a email, LinkedIn y otros canales profesionales.

**Criterios**
- Enlaces mailto y LinkedIn visibles (REQ-023).
- Enlaces externos con seguridad apropiada.

### US-006 — Compartir un proyecto
Como visitante, quiero compartir el enlace de un case study y que se vea con título, descripción e imagen correctos.

**Criterios**
- Metadata y Open Graph por proyecto (REQ-021, REQ-022).

## 7.1 Decisiones abiertas

**Decidido:** tres locales — español (`es`), inglés (`en`) y portugués (`pt`) — con selector visible (ADR-011).

Pendientes de Diego (detalle en `docs/00-PROJECT-STATE.md`):

- **CV descargable** — sí / no. Si sí: PDF estático, sin backend.
- **Analytics básico** — ninguno / privacy-friendly (p. ej. Vercel Analytics). Compatible con “analytics avanzado fuera de alcance”: solo métricas agregadas, sin tracking de comportamiento.
- **Proveedor LLM** — abierto (ADR-006).

## 8. Fuera de alcance V1

- Login.
- CMS externo.
- Base de datos.
- Vector database.
- Persistencia de chats.
- Panel administrativo.
- Blog.
- Analytics avanzado de comportamiento.
- Formulario de contacto.
- Copilot (pasa a V1.1).
