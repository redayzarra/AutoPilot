import Drone.controllers.server
from tools.logger import initialize_logging

# Initialize logging
initialize_logging(subfolder="MainLogs")

if __name__ == "__main__":
    Drone.controllers.server.run()
