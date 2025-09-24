from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, Text, ForeignKey, Numeric, Date
from typing import Optional

class Base(DeclarativeBase):
    pass

class Cliente(Base):
    __tablename__ = 'clientes'
    __table_args__ = {"schema": "core"}

    cliente_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str] = mapped_column(Text, nullable=False)
    ciudad: Mapped[str | None] = mapped_column(Text, nullable=True)

class Credito(Base):
    __tablename__ = "creditos"
    __table_args__ = {"schema": "core"}

    credito_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    cliente_id: Mapped[int] = mapped_column(ForeignKey("core.clientes.cliente_id"), nullable=False)
    producto: Mapped[str] = mapped_column(Text, nullable=False)
    inversion: Mapped[float] = mapped_column(Numeric(12,2), nullable=False)
    cuotas_totales: Mapped[int] = mapped_column(Integer, nullable=False)
    tea: Mapped[float] = mapped_column(Numeric(8,6), nullable=False)
    fecha_desembolso: Mapped[Optional[str]] = mapped_column(Date, nullable=False)
    fecha_inicio_pago: Mapped[Optional[str]] = mapped_column(Date, nullable=False)
    estado: Mapped[str] = mapped_column(Text, nullable=False, default="vigente")

class PaymentSchedule(Base):
    __tablename__ = "payment_schedule"
    __table_args__ = {"schema": "core"}

    schedule_id:    Mapped[int]   = mapped_column(Integer, primary_key=True)
    credito_id:     Mapped[int]   = mapped_column(ForeignKey("core.creditos.credito_id"), nullable=False)
    num_cuota:      Mapped[int]   = mapped_column(Integer, nullable=False)      # 1..N
    fecha_vencimiento: Mapped[Date] = mapped_column(Date, nullable=False)
    valor_cuota:    Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    estado:         Mapped[str]   = mapped_column(Text, nullable=False, default="pendiente")  # pendiente|parcial|pagada|vencida

class Pago(Base):
    __tablename__ = "pagos"
    __table_args__ = {"schema": "core"}

    pago_id:     Mapped[int]   = mapped_column(Integer, primary_key=True)
    schedule_id: Mapped[int]   = mapped_column(ForeignKey("core.payment_schedule.schedule_id"), nullable=False)
    fecha_pago:  Mapped[Date]  = mapped_column(Date, nullable=False)
    monto:       Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    medio:       Mapped[str | None] = mapped_column(Text, nullable=True)