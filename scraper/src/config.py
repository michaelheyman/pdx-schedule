import os
from dotenv import load_dotenv

load_dotenv()

MAX_TERMS = int(os.environ.get("PDX_SCRAPER_MAX_TERMS", "1"))
MAX_SUBJECTS = int(os.environ.get("PDX_SCRAPER_MAX_SUBJECTS", "200"))
DATABASE_PATH = os.environ.get("PDX_SCRAPER_DATABASE_PATH", "app.db")
