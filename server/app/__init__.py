from flask import Flask
from flask_cors import CORS
from .config import settings
from .db import db_healthcheck


def create_app():
    app = Flask(__name__)
    CORS(app) # Habilitar CORS para todas las rutas


    @app.get('/')
    def home():
        return "API is running"

    @app.get("/config")
    def config_public():
        # Confirmacion de carga de config
        return {"config": settings.as_public_dict()}

    @app.get("/health")                       # <-- nuevo
    def health():
        ok = db_healthcheck()
        return (
            {"status": "ok"} if ok else {"status": "error", "detail": "db unreachable: {error}"},
            200 if ok else 500
        )






    
    return app