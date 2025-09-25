from sqlalchemy import select, func
from ..domain import Cliente
from ..infra.session import db_session


def list_clients(page: int, page_size: int, search: str | None = None):
    offset = (page - 1) * page_size
    term = (search or "").strip()

    with db_session() as db:

        count_stmt = select(func.count(Cliente.cliente_id))

        query_stmt = (
            select(Cliente)
            .order_by(Cliente.cliente_id.asc())
            .offset(offset)
            .limit(page_size)
        )

        if term:

            count_stmt = count_stmt.where(Cliente.nombre.ilike(f"%{term}%"))
            query_stmt = query_stmt.where(Cliente.nombre.ilike(f"%{term}%"))

        total = db.execute(count_stmt).scalar() or 0
        rows = db.execute(query_stmt).scalars().all()

    data = [
        {
            "cliente_id": c.cliente_id,
            "nombre": c.nombre,
            "ciudad": c.ciudad,
        }
        for c in rows
    ]

    return data, total