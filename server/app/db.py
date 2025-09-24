from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from .config import settings

# Crea el engine de SQLAlchemy usando la URL de la base de datos desde Settings
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,   # verifica conexiones "muertas" antes de usarlas
    future=True,
)

# Fábrica de sesiones de SQLAlchemy
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)

# Testeo de salud de la base de datos
def db_healthcheck() -> bool:
    """Devuelve True si SELECT 1 funciona contra la DB."""
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return True
    except Exception as e:
        print(f"Database health check failed: {e}")
        return False