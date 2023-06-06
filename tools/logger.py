import logging
import os
from datetime import datetime


def initialize_logging(
    log_level=logging.INFO, log_folder="../logs", subfolder="subLogs"
):
    # Create a logs directory and a subdirectory if they don't already exist
    log_path = os.path.join(".", log_folder, subfolder)
    os.makedirs(log_path, exist_ok=True)
    print(f"Directory '{log_path}' created or already exists.")

    # Configure logging
    log_name = datetime.now().strftime("%Y-%m-%d_%H-%M-%S.log")
    log_file = os.path.join(log_path, log_name)

    logging.basicConfig(
        filename=log_file,
        format="%(asctime)s - %(levelname)s: %(message)s",
        encoding="utf-8",
        level=log_level,
    )

    # Create a stream handler
    ch = logging.StreamHandler()
    ch.setLevel(log_level)

    # Get the root logger and add the stream handler to it
    logging.getLogger().addHandler(ch)
