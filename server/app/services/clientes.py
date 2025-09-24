from sqlalchemy import select, func
from ..domain import Cliente
from ..infra.session import db_session


def list_clients(page: int, page_size: int):
    offset = (page - 1) * page_size
    with db_session() as db:
        total = db.execute(select(func.count(Cliente.cliente_id))).scalar() or 0
        rows = db.execute(
            select(Cliente)
            .order_by(Cliente.cliente_id.asc())
            .offset(offset)
            .limit(page_size)
        ).scalars().all()

    data = [
        {"cliente_id": c.cliente_id, "nombre": c.nombre, "ciudad": c.ciudad}
        for c in rows
    ]
    return data, total