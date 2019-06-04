import config
import logging

modules = [
    "requests",
    "selenium",
    "urllib3",
    "pyppeteer",
    "websockets",
    "asyncio",
    "google.api_core.bidi",
    "google.cloud.firestore_v1.watch",
]

for module in modules:
    logging.getLogger(module).setLevel(logging.WARNING)

# logging.basicConfig(level=config.LOGGING_LEVEL, format="%(levelname)s: %(message)s")
logging.basicConfig(level=config.LOGGING_LEVEL)
LOG = logging.getLogger(__name__)
