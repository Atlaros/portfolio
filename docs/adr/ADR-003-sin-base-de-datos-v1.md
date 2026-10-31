# ADR-003 — Sin base de datos en V1

**Estado:** Aprobado para MVP

## Decisión
No usar base de datos inicialmente.

## Motivos
- El contenido cambia poco.
- No existe login.
- No se persisten chats.
- MDX cubre el caso actual.

## Revisión
Revisar si aparecen usuarios, CMS, analytics propio o persistencia.

Un store key-value solo para contadores de rate limiting (ADR-012, propuesto) no se considera base de datos de contenido y no contradice esta decisión.
