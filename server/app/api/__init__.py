# Este módulo registra todos los blueprints del API.
from flask import Flask
from .clientes import bp_clientes
from .creditos import bp_creditos
from .cronograma import bp_cronograma

def register_api(app: Flask) -> None:
    """Listado de todos los blueprints del API en la app."""
    app.register_blueprint(bp_clientes)
    app.register_blueprint(bp_creditos)
    app.register_blueprint(bp_cronograma)