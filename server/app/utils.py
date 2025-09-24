from contextlib import contextmanager
from .infra.db import SessionLocal

@contextmanager
def db_session():
    
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()