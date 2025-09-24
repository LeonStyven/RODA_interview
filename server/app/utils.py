from contextlib import contextmanager
from .db import SessionLocal

@contextmanager
def db_session():
    
    db = SessionLocal()
    try:
        tield db
    finally:
        db.close()