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
    offset = (page - 1) * size

    with db_session() as db:
        total = db.execute(select(func.count(Cliente.cliente_id))).scalar() or 0


        # Consulta principal con paginación
        rows = db.execute(
            select(Cliente)
            .order_by(Cliente.cliente_id.asc())
            .offset(offset)
            .limit(size)
        ).scalars().all()

    data = [
        {
            "cliente_id": c.cliente_id,
            "nombre": c.nombre,
            "ciudad": c.ciudad,
        }
        for c in rows
    ]

    return jsonify({
        "data": data,
        "pagination": {"page": page, "per_page": size, "total": total}

    }), 200