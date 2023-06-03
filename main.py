from enum import Enum
import json
import logging
import os
import socket
import sys
import threading
import time

from logger import initialize_logging

# Initialize logging
initialize_logging()


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
        self.socket = None
        self.response = None
        self.thread = None

        # Initialize threading stop event
        self.stop_event = threading.Event()

        # Initialize drone socket connection
        self.initialize_socket()

        # Prepare thread for handling drone responses, but don't start it yet
        self.thread = threading.Thread(target=self.receive, args=(self.stop_event,))

        # Start the response handling thread
        self.thread.start()

        # Retrieve default distance and speed values from configuration
        self.defaultDistance = config["defaultDistance"]
        self.defaultSpeed = config["defaultSpeed"]

        # Apply default drone speed
        self.set_speed(self.defaultSpeed)

        # Define possible drone movement directions
        self.DIRECTIONS = ("up", "down", "left", "right", "forward", "back")

        try:
            self.is_imperial = bool(config.get("imperial", 0))
        except ValueError:
            logging.error(
                "Invalid value for imperial in config. Expected 0 or 1, setting default to False."
            )
            self.is_imperial = False

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


if __name__ == "__main__":
    myDrone = Drone("config.json")
    try:
        myDrone.takeoff()
        time.sleep(10)

        myDrone.set_speed(10)
        time.sleep(1)

        # DIRECTIONS = ("up", "down", "left", "right", "forward", "back")
        myDrone.move_in_direction("forward", 0.5)
        time.sleep(5)
        myDrone.move_in_direction("right", 0.5)
        time.sleep(5)

        myDrone.set_speed(100)
        time.sleep(1)

        myDrone.move_in_direction("left", 0.5)
        time.sleep(5)
        myDrone.move_in_direction("back", 0.5)
        time.sleep(5)
        myDrone.move_in_direction("up", 0.5)
        time.sleep(5)
        myDrone.move_in_direction("down", 0.5)
        time.sleep(5)

        myDrone.land()
    except Exception as e:
        logging.error(f"An error occurred: {e}")
    finally:
        myDrone.stop()
