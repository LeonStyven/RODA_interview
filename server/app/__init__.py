from flask import Flask
from flask_cors import CORS
from .config import settings


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
    
    return app