from tools.logger import initialize_logging
import Drone.controllers.server

# Initialize logging
initialize_logging(subfolder="MainLogs")

if __name__ == "__main__":
    Drone.controllers.server.run()
