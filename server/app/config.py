import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

class Settings:
    FLASK_ENV: str = os.getenv("FLASK_ENV", "production")
    APP_HOST: str = os.getenv("APP_HOST", "127.0.0.1")
    APP_PORT: int = int(os.getenv("APP_PORT", "8000"))

    # DB connection string
    DATABASE_URL: str | None = os.getenv("DATABASE_URL")

    def as_public_dict(self) -> dict:
        """Devuelve config sin exponer contraseñas."""
        db = self.DATABASE_URL or ""
        if "@" in db and "://" in db:
            # Enmascarar usuario/clave en la URL de la base de datos
            scheme, rest = db.split("://", 1)
            if "@" in rest and ":" in rest.split("@")[0]:
                user_pass, tail = rest.split("@", 1)
                user = user_pass.split(":", 1)[0]
                db_masked = f"{scheme}://{user}:****@{tail}"
            else:
                db_masked = f"{scheme}://****"
        else:
            db_masked = "(not set)"

        return {
            "FLASK_ENV": self.FLASK_ENV,
            "APP_HOST": self.APP_HOST,
            "APP_PORT": self.APP_PORT,
            "DATABASE_URL": db_masked,
        }

settings = Settings()