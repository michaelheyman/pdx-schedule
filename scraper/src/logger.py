import config
import logging

for module in ["requests", "selenium", "urllib3"]:
    logging.getLogger(module).setLevel(logging.WARNING)

logging.basicConfig(level=config.LOGGING_LEVEL, format="%(levelname)s: %(message)s")
LOG = logging.getLogger(__name__)
