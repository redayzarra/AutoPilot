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

            self.hostIP = config["hostIP"]
            self.hostPort = config["hostPort"]
            self.droneIP = config["droneIP"]
            self.dronePort = config["dronePort"]

            self.hostAddress = (self.hostIP, self.hostPort)
            self.droneAddress = (self.droneIP, self.dronePort)
            self.socket = None
            self.initialize_socket()

            self.response = None
            self.stop_event = threading.Event()
            self.thread = threading.Thread(target=self.receive, args=(self.stop_event,))
            self.thread.start()

        except FileNotFoundError:
            logging.error(f"Config file {config_file} not found.")
            raise
        except json.JSONDecodeError:
            logging.error(f"Config file {config_file} has invalid JSON.")
            raise
        except Exception as e:
            logging.error(f"Failed to initialize Drone: {e}")
            raise

    def receive(self, stop_event):
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
            logging.info(f"Action: Sending Command at {self.droneIP}")

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


if __name__ == "__main__":
    myDrone = Drone("config.json")
    try:
        myDrone.takeoff()
        time.sleep(10)
        myDrone.land()
    except Exception as e:
        logging.error(f"An error occurred: {e}")
    finally:
        myDrone.stop()
