import os

from flask import jsonify, request
from flask_cors import CORS
from models.Drone import Drone

from tools.config import create_app

app = create_app()

# Enable CORS
CORS(app, resources={r"/drone/*": {"origins": "*"}})

# The logging has already been set up
app.logger.info("Server started.")


# Initialize drone using config
def initialize_drone():
    config_path = os.path.join(os.path.dirname(__file__), "..", "..", "config.json")
    return Drone(config_path)


myDrone = initialize_drone()


@app.route("/drone/takeoff", methods=["POST"])
def takeoff():
    try:
        response = myDrone.takeoff()
        app.logger.info(f"Drone takeoff: {response}")
        return jsonify({"status": "success", "response": response}), 200
    except Exception as e:
        app.logger.error(f"Error during drone takeoff: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/drone/land", methods=["POST"])
def land():
    try:
        response = myDrone.land()
        app.logger.info(f"Drone land: {response}")
        return jsonify({"status": "success", "response": response}), 200
    except Exception as e:
        app.logger.error(f"Error during drone landing: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/drone/move", methods=["POST"])
def move():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing data in request"}), 400
    direction = data.get("direction")
    distance = data.get("distance")
    if not direction or not distance:
        return jsonify({"error": "Missing 'direction' or 'distance' in request"}), 400

    try:
        response = myDrone.move_in_direction(direction, distance)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"response": response}), 200


@app.route("/drone/rotate", methods=["POST"])
def rotate():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing data in request"}), 400
    direction = data.get("direction")
    degree = data.get("degree")
    if not direction or not degree:
        return jsonify({"error": "Missing 'direction' or 'degree' in request"}), 400

    try:
        response = myDrone.rotate(direction, degree)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"response": response}), 200


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
