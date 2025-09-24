from flask import Blueprint, request, jsonify
from ..services.credits import list_credits

bp_creditos = Blueprint("creditos", __name__, url_prefix="/creditos")


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

@bp_creditos.get("/")
def list_creditos_handler():
    cliente_id_raw = request.args.get("cliente_id")
    if not cliente_id_raw:
        return jsonify({"error": "El ID del cliente es requerido"}), 400
    try:
        cliente_id = int(cliente_id_raw)
    except ValueError:
        return jsonify({"error": "El ID del cliente debe ser numérico"}), 400

    page, size = parse_pagination()


    data, total = list_credits(cliente_id, page, size)

    return jsonify({
        "data": data,
        "pagination": {"page": page, "per_page": size, "total": total}
    }), 200