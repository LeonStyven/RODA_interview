# 🚲 Roda — Prueba Técnica (Desarrollador Jr.)

Este proyecto implementa un **MVP** para la gestión de clientes, créditos y cronogramas de pago en **Roda**, con un stack moderno:

- **Backend:** Python 3 + Flask + SQLAlchemy + PostgreSQL  
- **Frontend:** React + TypeScript + Vite + TailwindCSS  
- **Arquitectura:** Modular (api, services, domain, infra)

---

## 📂 Estructura

```
server/               # Backend Flask
  app/
    api/              # Blueprints de endpoints
    services/         # Lógica de negocio
    domain/           # Modelos SQLAlchemy
    infra/            # Conexión DB
  .env                # Variables entorno (DB)
  requirements.txt
  wsgi.py             # Entry point

web/                  # Frontend React + TS
  src/app/
    shared/           # Layouts, rutas, componentes y utils globales
    modules/
      clients/        # Clientes: interfaces, componentes, páginas
      credits/        # Créditos: interfaces, componentes, páginas
      schedule/       # Cronograma: interfaces, componentes, páginas
  tailwind.config.js
```

---

## ⚙️ Backend

### 1. Instalar dependencias
```bash
cd server
python -m venv .venv
.venv\Scripts\activate   # Activar entorno virtual (Windows)
pip install -r requirements.txt
```

### 2. Configurar .env
Crea un archivo `.env` en `server/` con el siguiente contenido:
```
DB_USER=roda
DB_PASSWORD=123 4
DB_HOST=localhost
DB_PORT=5432
DB_NAME=roda_db
```

### 3. Ejecutar servidor
```bash
.venv\Scripts\activate   # Activar entorno virtual si no lo está
python wsgi.py
```

👉 Disponible en: [http://127.0.0.1:8000](http://127.0.0.1:8000)

### 4. Endpoints principales
- **GET** `/health` → Estado del servidor
- **GET** `/clientes?page=1&page_size=10`
- **GET** `/creditos?cliente_id=1&page=1&page_size=10`
- **GET** `/cronograma?credito_id=1&page=1&page_size=12`

---

## 🎨 Frontend

### 1. Instalar dependencias
```bash
cd web
npm install
```

### 2. Configurar .env
Crea un archivo `.env` en `web/` con el siguiente contenido:
```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 3. Ejecutar
```bash
npm run dev
```

👉 Disponible en: [http://localhost:5173](http://localhost:5173)

---

## 🚦 Flujo de navegación

- **`/clientes`** → Listado paginado de clientes  
- **`/clientes/:clienteId/creditos`** → Créditos del cliente  
- **`/clientes/:clienteId/creditos/:creditoId`** → Cronograma con paginación  

---