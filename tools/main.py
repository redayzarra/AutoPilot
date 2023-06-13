import backend.controllers.server
from tools.logger import initialize_logging

# Initialize logging
initialize_logging()

if __name__ == "__main__":
    backend.controllers.server.run()
