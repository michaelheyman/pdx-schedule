import config
import logging
from datetime import datetime
from pythonjsonlogger import jsonlogger


class CustomJsonFormatter(jsonlogger.JsonFormatter):
    def add_fields(self, log_record, record, message_dict):
        super(CustomJsonFormatter, self).add_fields(log_record, record, message_dict)
        if not log_record.get("timestamp"):
            now = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.%fZ")
            log_record["timestamp"] = now
        if log_record.get("level"):
            log_record["level"] = log_record["level"].upper()
        else:
            log_record["level"] = record.levelname


modules = ["requests", "selenium", "urllib3", "pyppeteer", "websockets", "asyncio"]

for module in modules:
    logging.getLogger(module).setLevel(logging.WARNING)

logging.getLogger().setLevel(config.LOGGING_LEVEL)
logger = logging.getLogger(__name__)
logger.setLevel(config.LOGGING_LEVEL)
logHandler = logging.StreamHandler()
formatter = CustomJsonFormatter("(timestamp) (filename) (level) (message)")
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
