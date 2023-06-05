import json
import logging
import socket
import threading
import time
from enum import Enum

from logger import initialize_logging

# Initialize logging
initialize_logging(subfolder="DroneLogs")


# Defining enum for directions
class Direction(Enum):
    UP = "up"
    DOWN = "down"
    LEFT = "left"
    RIGHT = "right"
    FORWARD = "forward"
    BACK = "back"


class Drone:
    """
    Class representing a drone. This class manages the communication
    with the drone, including initializing the connection and sending
    commands to the drone.
    """

    def __init__(self, config_file):
        """
        Initialize a Drone instance using the provided configuration file.

        Args:
            config_file (str): Path to the JSON configuration file.
        """
        try:
            with open(config_file, "r") as f:
                config = json.load(f)

        except FileNotFoundError:
            logging.error(f"Config file {config_file} not found.")
            raise

        except json.JSONDecodeError:
            logging.error(f"Config file {config_file} has invalid JSON.")
            raise

        # Define host and drone address details from the configuration
        self.hostIP = config["hostIP"]
        self.hostPort = config["hostPort"]
        self.droneIP = config["droneIP"]
        self.dronePort = config["dronePort"]

        # Form complete address from IP and port details
        self.hostAddress = (self.hostIP, self.hostPort)
        self.droneAddress = (self.droneIP, self.dronePort)

        # Initialize socket, response, and thread variables
        self.initialize_communication()

        # Retrieve default distance, speed, and degree values from configuration
        self.defaultDistance = config["defaultDistance"]
        self.defaultSpeed = config["defaultSpeed"]
        self.defaultDegree = config["defaultDegree"]

        # Apply default drone speed
        self.set_speed(self.defaultSpeed)

        # Define possible drone movement directions
        self.DIRECTIONS = ("up", "down", "left", "right", "forward", "back")

        self.configure_units(config)

        # Initialize patrolling related attributes
        self.initialize_patrol()

    def initialize_communication(self):
        """Initialize drone communication by creating a socket and starting a thread to handle responses."""
        self.socket = None
        self.response = None
        self.thread = None
        self.stop_event = threading.Event()
        self.initialize_socket()
        self.thread = threading.Thread(target=self.receive, args=(self.stop_event,))
        self.thread.start()

    def configure_units(self, config):
        """Configure the unit system based on the config."""
        try:
            self.is_imperial = bool(config.get("imperial", 0))
        except ValueError:
            logging.error(
                "Invalid value for imperial in config. Expected 0 or 1, setting default to False."
            )
            self.is_imperial = False

    def initialize_patrol(self):
        """Initialize patrolling related attributes."""
        self.patrol_event = threading.Event()
        self.patrolling = False
        self.patrol_semaphore = threading.Semaphore(1)
        self.patrol_thread = None

    def receive(self, stop_event):
        """
        Continually receive responses from the drone.

        Args:
            stop_event (threading.Event): An event that can be set to stop the function.
            retries (int): The number of retries if a socket error occurs.
            delay (int): The delay (in seconds) between retries.
        """
        while not stop_event.is_set():
            try:
                self.response, _ = self.socket.recvfrom(3000)
                logging.info(f"Action: Receiving response - Response: {self.response}")
            except socket.error as ex:
                logging.error(f"Action: Receiving response - Error: {ex}")
                break

    def initialize_socket(self):
        """
        Initialize the socket connection to the drone and send the initial
        'command' and 'streamon' commands.
        """
        try:
            self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            self.socket.bind(self.hostAddress)

            self.send_command("command")
            logging.info(f"Action: Initiating Drone at {self.droneIP}")

            self.send_command("streamon")
            logging.info(f"Action: Turning Stream On at {self.droneIP}")
        except socket.error as e:
            logging.error(f"Socket error occurred: {e}")
            raise

    def __del__(self):
        """Cleanup method called when the instance is being deleted."""
        self.stop()

    def stop(self):
        """Close the socket connection to the drone."""
        try:
            self.stop_event.set()
            max_retries = 10
            sleep_interval = 0.3
            for _ in range(max_retries):
                if not self.thread.is_alive():
                    break
                time.sleep(sleep_interval)
            else:
                logging.warning("Could not stop the thread within the allocated time.")

            self.socket.close()
            logging.info(f"Socket connection to drone at {self.droneAddress} closed.")
        except Exception as e:
            logging.error(f"Failed to close the socket connection: {e}")

    def send_command(self, command):
        """Send a command to the drone."""
        logging.info(f"Action: Sending command - Command: {command}")

        try:
            self.socket.sendto(command.encode("utf-8"), self.droneAddress)
        except Exception as e:
            logging.error(f"Failed to send command: {command} - Error: {e}")
            raise

        retry = 0
        while self.response is None and retry < 3:
            time.sleep(0.3)
            retry += 1

        if self.response is None:
            logging.error(f"No response from drone for command: {command}")
            return None

        return self.response.decode("utf-8")

    def takeoff(self):
        """Command the drone to take off."""
        return self.send_command("takeoff")

    def land(self):
        """Command the drone to land."""
        return self.send_command("land")

    def move(self, direction, distance):
        """
        Move the drone to a specific direction by a specific distance.

        Args:
            direction (str): Direction to move the drone.
            distance (float): Distance to move the drone.

        Returns:
            str: Response from the drone.
        """
        try:
            distance = float(distance)
        except ValueError:
            logging.error(f"Invalid distance provided: {distance}")
            raise

        # Metric conversion factor for imperial to metric distance.
        # 1 foot equals 30.48 centimeters.
        imperial_to_metric = 30.48

        # Default factor for metric system (100 cm = 1 m)
        default_factor = 100

        factor = imperial_to_metric if self.is_imperial else default_factor
        converted_distance = int(round(distance * factor))

        command = f"{direction} {converted_distance}"
        response = self.send_command(command)

        unit = "feet" if self.is_imperial else "cm"
        logging.info(f"Moving drone {direction} by {distance} {unit}")

        return response

    def move_in_direction(self, direction, distance=None):
        """
        Moves the drone in the specified direction by the given distance.

        Args:
            direction (str): The direction to move in. Should be one of DIRECTIONS.
            distance (float): The distance to move. If None, uses default distance.
        Returns:
            str: Response from the drone.
        """
        if direction not in self.DIRECTIONS:
            raise ValueError(
                f"Invalid direction '{direction}'. Must be one of {self.DIRECTIONS}."
            )
        if distance is None:
            distance = self.defaultDistance
        return self.move(direction, distance)

    def set_speed(self, speed):
        """
        Set the speed of the drone.

        Args:
            speed (int, float, str): The speed to set for the drone.
            The function will attempt to convert non-integer inputs to integer.

        Returns:
            str: Response from the drone.
        """
        try:
            speed = int(speed)
        except ValueError:
            logging.error(f"Invalid speed value: {speed}")
            raise

        logging.info(f"Setting drone speed to {speed} cm/s")
        return self.send_command(f"speed {speed}")

    def rotate(self, direction, degree=None):
        """
        Rotates the drone clockwise or counter-clockwise by a specified degree.

        Args:
            direction (str): The direction of rotation, should be 'cw' (clockwise) or 'ccw' (counter clockwise).
            degree (float): The degree to rotate. Must be between 0 and 360.

        Returns:
            str: Response from the drone.
        """
        if direction not in ["cw", "ccw"]:
            raise ValueError("Direction must be either 'cw' or 'ccw'.")

        degree = self.defaultDegree if degree is None else degree

        try:
            degree = float(degree)
            if not 0 <= degree <= 360:
                raise ValueError("Degree must be between 0 and 360.")
        except ValueError:
            logging.error(f"Invalid degree value provided: {degree}")
            raise

        return self.send_command(f"{direction} {degree}")

    def flip(self, direction: str) -> str:
        """
        Flips the drone in the specified direction.

        Args:
            direction (str): The direction to flip. It should be 'left', 'right', 'forward', 'backward',
                            or their shorthand notations 'l', 'r', 'f', 'b'.

        Returns:
            str: Response from the drone.
        """

        direction_mapping = {"left": "l", "right": "r", "forward": "f", "backward": "b"}

        if not isinstance(direction, str):
            logging.error("Invalid type for direction. Expected string.")
            raise TypeError("Direction must be a string.")

        direction = direction_mapping.get(direction, direction)

        if direction not in direction_mapping.values():
            logging.error(
                f"Invalid direction '{direction}'. Must be one of {list(direction_mapping.keys())}."
            )
            raise ValueError(
                "Direction must be either 'left', 'right', 'forward', or 'backward' or their shorthand notations 'l', 'r', 'f', 'b'."
            )

        return self.send_command(f"flip {direction}")

    def patrol(self):
        """
        Start the drone's patrol mode.
        """
        if not self.patrolling:
            self.patrol_event.clear()
            self.patrol_thread = threading.Thread(
                target=self.run_patrol, args=(self.patrol_semaphore, self.patrol_event)
            )
            self.patrol_thread.start()
            self.patrolling = True
            logging.info("Drone has started patrolling.")
        else:
            logging.warning("Drone is already in patrolling mode.")

    def stop_patrol(self):
        """
        Function to stop the patrol actions if currently in process.
        """
        if self.patrolling:
            self.patrolling = False
            self.patrol_event.set()

            if self.patrol_thread is not None and self.patrol_thread.is_alive():
                try:
                    logging.info("Attempting to stop the patrol action.")
                    self.patrol_thread.join(
                        timeout=90
                    )  # waits for 90 seconds before proceeding
                    if self.patrol_thread.is_alive():
                        logging.warning(
                            "Patrol action could not be stopped within the expected time. Please check if the semaphore is being correctly released and if the thread is responding to stop events."
                        )
                    else:
                        logging.info("Patrol action has been stopped successfully.")
                except RuntimeError as e:
                    logging.error(
                        f"Error encountered while stopping the patrol action: {e}"
                    )
            else:
                logging.warning("No patrol action is currently active.")
        else:
            logging.info("No patrol action to stop as it is not currently active.")

    def run_patrol(self, semaphore, stop_event):
        """
        Function to execute a sequence of patrol commands using a semaphore for synchronization.

        :param semaphore: threading.Semaphore, semaphore object to control the concurrent execution.
        :param stop_event: threading.Event, stop event to stop the patrol actions.
        """
        if semaphore.acquire(blocking=False):
            logging.info("run_patrol action acquired the semaphore.")
            status = 0
            try:
                while not stop_event.is_set():
                    status = (status % 4) + 1
                    if status == 1:
                        self.move_in_direction("up")
                        logging.info("Patrol Action: Moving up.")
                    elif status == 2:
                        self.rotate("cw", 90)
                        logging.info("Patrol Action: Rotating clockwise by 90 degrees.")
                    elif status == 3:
                        self.move_in_direction("down")
                        logging.info("Patrol Action: Moving down.")
                    elif status == 4:
                        self.rotate("cw", 90)  # Repeat the same rotation
                        logging.info("Patrol Action: Rotating clockwise by 90 degrees.")
                    time.sleep(5)
            except Exception as e:
                logging.error(
                    f"Error encountered while executing patrol action {status}. Error: {e}"
                )
            finally:
                semaphore.release()
                logging.info("Semaphore released after run_patrol action.")
        else:
            logging.warning("Failed to acquire semaphore for run_patrol action.")


if __name__ == "__main__":
    myDrone = Drone("config.json")

    try:
        myDrone.takeoff()
        time.sleep(10)

        myDrone.rotate("cw", 90)
        time.sleep(1)

        # DIRECTIONS = ("up", "down", "left", "right", "forward", "back")
        myDrone.move_in_direction("forward", 0.5)
        time.sleep(5)
        myDrone.move_in_direction("right", 0.5)
        time.sleep(5)

        myDrone.rotate("ccw", 90)
        time.sleep(1)

        myDrone.move_in_direction("left", 0.5)
        time.sleep(5)

        myDrone.flip("l")

        myDrone.move_in_direction("back", 0.5)
        time.sleep(5)

        myDrone.flip("forward")

        myDrone.move_in_direction("up", 0.5)
        time.sleep(5)
        myDrone.move_in_direction("down", 0.5)
        time.sleep(5)

        myDrone.land()

    except Exception as e:
        logging.error(f"An error occurred: {e}")

    finally:
        myDrone.stop()
