from sqlalchemy import select, func
from ..domain import PaymentSchedule, Pago
from ..infra.session import db_session
from datetime import datetime

def list_schedule(credito_id: int, page: int, page_size: int):
    offset = (page - 1) * page_size

    with db_session() as db:
        total = db.execute(
            select(func.count(PaymentSchedule.schedule_id))
            .where(PaymentSchedule.credito_id == credito_id)
        ).scalar() or 0

        rows = db.execute(
            select(PaymentSchedule)
            .where(PaymentSchedule.credito_id == credito_id)
            .order_by(PaymentSchedule.num_cuota.asc())
            .offset(offset)
            .limit(page_size)
        ).scalars().all()

    data = [
        {
            "schedule_id": ps.schedule_id,
            "credito_id": ps.credito_id,
            "num_cuota": ps.num_cuota,
            "fecha_pago": ps.fecha_vencimiento.isoformat() if isinstance(ps.fecha_vencimiento, datetime) else None,
            "monto": float(ps.valor_cuota),
            "estado": ps.estado
        }
        for ps in rows
    ]

    return data, total
