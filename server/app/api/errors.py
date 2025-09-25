# server/app/api/errors.py
from flask import jsonify, Request
from werkzeug.exceptions import HTTPException
from sqlalchemy.exc import SQLAlchemyError

def _json_error(status: int, message: str, code: str | None = None, details: dict | None = None):
    """
    Formato único para todos los errores.
    """
    payload: dict = {
        "error": {
            "message": message,
            "code": code or str(status),
        }
    }
    if details:
        payload["error"]["details"] = details
    return jsonify(payload), status

def register_error_handlers(app):
    @app.errorhandler(400)
    def handle_400(err: HTTPException):
        return _json_error(400, err.description or "Solicitud inválida", code="bad_request")

    @app.errorhandler(404)
    def handle_404(err: HTTPException):
        return _json_error(404, "Recurso no encontrado", code="not_found")

    @app.errorhandler(422)
    def handle_422(err: HTTPException):
        return _json_error(422, err.description or "Entidad no procesable", code="unprocessable_entity")

    @app.errorhandler(SQLAlchemyError)
    def handle_sqlalchemy(err: SQLAlchemyError):
        app.logger.exception("SQLAlchemy error")
        return _json_error(500, "Error interno de base de datos", code="db_error")

    @app.errorhandler(Exception)
    def handle_500(err: Exception):
        # Si ya es HTTPException, respeta su código y descripción
        if isinstance(err, HTTPException):
            return _json_error(err.code or 500, err.description or "Error HTTP", code="http_error")
        # Para cualquier otra excepción, log y 500
        app.logger.exception("Unhandled exception")
        return _json_error(500, "Error interno del servidor", code="internal_error")
