# Estrategia de pruebas

## Objetivo

Verificar comportamiento, accesibilidad, contenido crítico y navegación.

## Unit tests

Herramientas:

- Vitest
- React Testing Library

Cubrir:

- utilidades;
- filtros;
- validadores;
- repositories;
- validación de contenido (p. ej. métrica cuantitativa sin `source` falla);
- selección de contexto del Copilot.

## Component tests

Cubrir:

- ProjectCard
- ProjectFilter
- CopilotPanel
- Navbar
- EngineeringProcess
- CTA

## E2E

Playwright.

Flujos mínimos:

1. Home carga.
2. Navegación funciona.
3. Filtros funcionan.
4. Project case study abre.
5. Live Demo solo aparece cuando existe URL.
6. Copilot acepta pregunta válida. (V1.1)
7. Copilot controla error. (V1.1)
8. Navegación mobile funciona.
9. Contact links funcionan.
10. Rate limit / presupuesto superado devuelve el error controlado y la UI muestra el fallback. (V1.1)
11. Metadata, `sitemap.xml`, `robots.txt` y Open Graph por proyecto existen.

## Copilot sin LLM real

Los tests de componente y E2E del Copilot usan un `AIProvider` mock (el adapter de ADR-006 lo permite):

- CI nunca llama a un LLM real ni gasta dinero.
- No se requieren API keys en CI.
- El mock cubre: respuesta válida, error del proveedor, rate limit y presupuesto superado.
- El store de rate limiting también se mockea o se usa uno en memoria solo en tests.

## Accesibilidad

Verificar:

- teclado;
- focus;
- contraste;
- labels;
- heading hierarchy;
- reduced-motion.

## Performance

Revisar:

- Lighthouse.
- Core Web Vitals.
- imágenes.
- video.
- JS cliente.

## Criterio de salida MVP

No desplegar con:

- rutas rotas;
- errores de consola importantes;
- enlaces falsos;
- contenido placeholder no identificado;
- problemas críticos de accesibilidad.
