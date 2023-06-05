from logger import initialize_logging
from ...tools.config import create_app

app = create_app()

# The logging has already been set up in the create_app function.
app.logger.info("Server started.")
