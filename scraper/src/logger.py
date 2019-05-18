import config
import logging

modules = ["requests", "selenium", "urllib3", "pyppeteer", "websockets", "asyncio"]

for module in modules:
    logging.getLogger(module).setLevel(logging.WARNING)

logging.basicConfig(level=config.LOGGING_LEVEL, format="%(levelname)s: %(message)s")
LOG = logging.getLogger(__name__)
