# Este módulo registra todos los blueprints del API.
from flask import Flask
from .clientes import bp_clientes

def register_api(app: Flask) -> None:
    """Registra todos los blueprints del API en la app."""
    app.register_blueprint(bp_clientes)