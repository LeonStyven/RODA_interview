# 🚲 Roda — Cronograma de pagos (MVP)

Aplicación full‑stack para visualizar el cronograma de pagos de créditos (Roda). Incluye API en Python (Flask) y UI en React. Base de datos local PostgreSQL con esquema y seed proporcionados.

— Máx. 1 pág —

## Cómo correr la app (local)

Requisitos: Python 3.11+, Node 18+, PostgreSQL 14+ (o superior).

1) Base de datos
- Crear DB y cargar el esquema/seed:
```bash
psql -U postgres -c "CREATE DATABASE roda_db;"
psql -U postgres -d roda_db -f sql/01_schema_seed.sql
```

2) Backend (Flask)
```bash
cd server
python -m venv .venv
.venv\Scripts\activate   # Windows PowerShell
pip install -r requirements.txt
```
Crear `server/.env`:
```
DATABASE_URL=postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/roda_db
APP_HOST=127.0.0.1
APP_PORT=8000
FLASK_ENV=development
```
Levantar API:
```bash
python wsgi.py
```
API en `http://127.0.0.1:8000`.

3) Frontend (React + Vite)
```bash
cd web
npm install
```
Crear `web/.env`:
```
VITE_API_BASE_URL=http://127.0.0.1:8000
```
Arrancar:
```bash
npm run dev
```
App en `http://localhost:5173`.

## API (mínimo)
- GET `/health` → estado de servicio/DB
- GET `/clientes/?page=1&page_size=10&search=...`
- GET `/creditos/?cliente_id=1&page=1&page_size=10`
- GET `/cronograma/?credito_id=1&page=1&page_size=12`

## Decisiones y trade‑offs
- Backend en Flask por simplicidad y control explícito de blueprints, CORS y manejo de errores; SQLAlchemy para portabilidad y sesiones transaccionales.
- Config vía `.env` y `DATABASE_URL` única (evita credenciales dispersas). `as_public_dict()` enmascara secretos en `/config`.
- Paginación uniforme (`page`, `page_size`) y validaciones con respuestas JSON consistentes (handlers centralizados).
- Consultas optimizadas usando índices provistos; `db_healthcheck()` para readiness.
- Frontend en React + TypeScript + Vite por DX y velocidad. UI con paleta Roda (`#000000`, `#0C0D0D`, `#FFFFFF`, `#EBFF00`, `#C6F833`, `#B794F6`).
- UX: listados paginados; flujo Clientes → Créditos → Cronograma; búsqueda básica de clientes (`search`).

Notas
- La BD es local; no hay credenciales externas.
- Archivo SQL de esquema y seed: `sql/01_schema_seed.sql`.
