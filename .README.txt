# Roda — Cronograma de pagos (Flask + PostgreSQL + React)

**Objetivo**: implementar un backend en Python (Flask) que exponga el cronograma de pagos (clientes → créditos → cuotas), con DB **PostgreSQL local** y un **frontend React** que lo consuma.  
**Estado**: En construcción por etapas (commits pequeños y justificados).

## Estructura
- `/server`: backend Flask
- `/web`: frontend React
- `/sql/01_schema_seed.sql`: esquema + datos de ejemplo

## Cómo correr (resumen, WIP)
1) Levantar PostgreSQL local (Docker recomendado).
2) Iniciar backend Flask.
3) Iniciar frontend React.

> Decisiones y trade-offs se documentan al final cuando cierre cada etapa.
