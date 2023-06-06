import os
from flask import Flask
import tools.logger as logger

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))


def create_app():
    app = Flask(
        __name__,
        template_folder=os.path.join(PROJECT_ROOT, "Drone/templates"),
        static_folder=os.path.join(PROJECT_ROOT, "Drone/static"),
    )
    app.config.from_mapping(
        DEBUG=False,
        WEB_ADDRESS="0.0.0.0",
        WEB_PORT=5000,
        LOG_FOLDER=os.path.join(PROJECT_ROOT, "..", "logs", "WebLogs"),
    )

    # Set up logging
    logger.initialize_logging(log_folder=app.config["LOG_FOLDER"])

    return app
