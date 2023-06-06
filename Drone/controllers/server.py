import os

from flask import jsonify, request
from flask_cors import CORS
from models.Drone import Drone

from tools.config import create_app

app = create_app()

# Enable CORS
cors = CORS(app, resources={r"/drone/*": {"origins": "*"}})

# The logging has already been set up
app.logger.info("Server started.")

# Initialize drone using config
config_path = os.path.join(os.path.dirname(__file__), "..", "..", "config.json")
myDrone = Drone(config_path)


@app.after_request
def add_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    return response


@app.route("/drone/takeoff", methods=["POST"])
def takeoff():
    response = myDrone.takeoff()
    return jsonify({"response": response})


@app.route("/drone/land", methods=["POST"])
def land():
    response = myDrone.land()
    return jsonify({"response": response})


@app.route("/drone/move", methods=["POST"])
def move():
    data = request.get_json()
    direction = data.get("direction")
    distance = data.get("distance")
    response = myDrone.move_in_direction(direction, distance)
    return jsonify({"response": response})


@app.route("/drone/rotate", methods=["POST"])
def rotate():
    data = request.get_json()
    direction = data.get("direction")
    degree = data.get("degree")
    response = myDrone.rotate(direction, degree)
    return jsonify({"response": response})


@app.route("/drone/flip", methods=["POST"])
def flip():
    data = request.get_json()
    direction = data.get("direction")
    response = myDrone.flip(direction)
    return jsonify({"response": response})


@app.route("/drone/patrol", methods=["POST"])
def patrol():
    myDrone.patrol()
    return jsonify({"response": "Drone started patrolling"})


@app.route("/drone/stop_patrol", methods=["POST"])
def stop_patrol():
    myDrone.stop_patrol()
    return jsonify({"response": "Drone stopped patrolling"})


@app.route("/drone/stop", methods=["POST"])
def stop():
    myDrone.stop()
    return jsonify({"response": "Drone stopped"})


if __name__ == "__main__":
    try:
        app.run(host="0.0.0.0", port=5000)
    except Exception as e:
        myDrone.stop()
        print(f"An error occurred: {e}")
