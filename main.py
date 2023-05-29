import json
import os
import socket
import sys
import time
import logging

from logger import initialize_logging

# Initialize logging
initialize_logging()


class Drone(object):
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

        self.hostIp = config["hostIP"]
        self.hostPort = config["hostPort"]
        self.droneIP = config["droneIp"]
        self.dronePort = config["dronePort"]

        self.droneAddress = (self.droneIP, self.dronePort)
        self.socket = None
        self.initialize_socket()

    def initialize_socket(self):
        """
        Initialize the socket connection to the drone and send the initial
        'command' and 'streamon' commands.
        """
        try:
            self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            self.socket.bind((self.hostIp, self.hostPort))

            self.socket.sendto(b"command", self.droneAddress)
            logging.info(f"Command sent to drone at {self.droneAddress}")

            self.socket.sendto(b"streamon", self.droneAddress)
            logging.info(f"Stream started on drone at {self.droneAddress}")
        except socket.error as e:
            logging.error(f"Socket error occurred: {e}")
            raise


