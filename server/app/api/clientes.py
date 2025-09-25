from flask import Blueprint, request, jsonify, abort
from ..services.clientes import list_clients

bp_clientes = Blueprint('clientes', __name__, url_prefix='/clientes')

def parse_pagination():
    raw_page = request.args.get("page", 1)
    raw_size = request.args.get("page_size", 10)
    try:
        page = int(raw_page)
    except ValueError:
        abort(400, description="page debe ser numérico")
    try:
        size = int(raw_size)
    except ValueError:
        abort(400, description="page_size debe ser numérico")

    if page < 1:
        page = 1
    if size <1:
        size = 10
    if size > 100:
        size = 100
    return page, size

@bp_clientes.get("/")
def list_clientes_handler():
    page, size = parse_pagination()
    search = request.args.get("search", None) #Control de la busqueda del user

    data, total = list_clients(page, size, search)


    return jsonify({
        "data": data,
        "pagination": {"page": page, "per_page": size, "total": total}

    }), 200