from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app) # Habilitar CORS para todas las rutas


    @app.get('/')
    def home():
        return "API is running"
    
    return app