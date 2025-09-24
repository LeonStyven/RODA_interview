from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import Integer, Text

Class Base(DeclarativeBase):
    pass

class Cliente(Base):
    __tablename__ = 'clientes'
    __table_args__ = {"schema": "core"}

    cliente_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str] = mapped_column(Text, nullable=False)
    ciudad: Mapped[str | None] = mapped_column(Text, nullable=True)
    