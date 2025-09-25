from flask import Blueprint, request, jsonify, abort
from ..services.schedule import list_schedule

bp_cronograma = Blueprint("cronograma", __name__, url_prefix="/cronograma")



def parse_pagination():
    raw_page = request.args.get("page", "1")
    raw_size = request.args.get("page_size", "10")
    try:
        page = int(raw_page)
    except ValueError:
        page = 1
    try:
        size = int(raw_size)
    except ValueError:
        size = 10
    if page < 1: page = 1
    if size < 1: size = 10
    if size > 100: size = 100
    return page, size

@bp_cronograma.get("/")
def list_cronograma_handler():
    #Validar que el credito existas
    credito_id_raw = request.args.get("credito_id")
    if not credito_id_raw:
        abort(400, description="credito_id es requerido")
    
    try:
        credito_id = int(credito_id_raw)
    except ValueError:
        abort(400, description="credito_id debe ser numérico")
    
    page, size = parse_pagination()
    data, total = list_schedule(credito_id, page, size)

    return jsonify({
        "data": data,
        "pagination": {"page": page, "page_size": size, "total": total}
    }), 200