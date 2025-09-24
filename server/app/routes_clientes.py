from flask import Blueprint, request, jsonify
from sqlalchemy import select, func
from .utils import db_session
from.models import Cliente

bp_clientes = Blueprint('clientes', __name__, url_prefix='/clientes')

def parse_pagination():
    raw_page = request.args.get("page", 1)
    raw_size = request.args.get("page_size", 10)
    try:
        page = int(raw_page)
    except ValueError:
        page = 1
    try:
        size = int(raw_size)
    except ValueError:
        size = 10

    if page < 1:
        page = 1
    if size <1:
        size = 10
    if size > 100:
        size = 100
    return page, size

@bp_clientes.get("/")
def list_clientes_min():
    page, size = parse_pagination()

    with db_session() as db:
        total = db.execute(select(func.count(Cliente.cliente_id))).scalar() or 0

    return jsonify({
        "data": [],
        "pagination": {"page": page, "per_page": size, "total": total}

    }), 200