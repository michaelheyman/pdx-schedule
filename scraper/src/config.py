import os
from dotenv import load_dotenv

load_dotenv()


def map_level(level):
    return {"critical": 50, "error": 40, "warning": 30, "info": 20, "debug": 10}.get(
        level, 10
    )


MAX_TERMS = int(os.environ.get("MAX_TERMS", "1"))
MAX_SUBJECTS = int(os.environ.get("MAX_SUBJECTS", "200"))
DATABASE_PATH = os.environ.get("DATABASE_PATH", "app.db")
LOGGING_LEVEL = map_level(os.environ.get("LOGGING_LEVEL", "debug"))
ENVIRONMENT = os.environ.get("ENVIRONMENT", "dev")
INSTRUCTOR_UPDATE_RATE = int(os.environ.get("INSTRUCTOR_UPDATE_RATE", "1"))
