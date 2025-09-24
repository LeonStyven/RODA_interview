from sqlalchemy import select, func
from datetime import datetime
from ..domain import Credito
from ..infra.session import db_session


def list_credits(cliente_id: int, page: int, page_size: int):

    offset = (page - 1) * page_size
    with db_session() as db:
        total = db.execute(
            select(func.count(Credito.credito_id))
            .where(Credito.cliente_id == cliente_id )
        ).scalar() or 0

        rows = db.execute(
            select(Credito)
            .where(Credito.cliente_id == cliente_id)
            .order_by(Credito.credito_id.asc())
            .offset(offset)
            .limit(page_size)
        ).scalars().all()
    data = [
        {
            "credito_id": c.credito_id,
            "cliente_id": c.cliente_id,
            "producto": c.producto,
            "inversion": float(c.inversion),
            "cuotas_totales": c.cuotas_totales,
            "tea": float(c.tea),
            "fecha_desembolso": c.fecha_desembolso.isoformat() if isinstance(c.fecha_desembolso, datetime) else None,
            "fecha_inicio_pago": c.fecha_inicio_pago.isoformat() if isinstance(c.fecha_inicio_pago, datetime) else None,
            "estado": c.estado
        }
        for c in rows
    ]

    return data, total