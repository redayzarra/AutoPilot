import os
import time

from flask import Response, jsonify, request
from flask_cors import CORS

from backend.models.Drone import Drone
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
    if not direction:
        return jsonify({"error": "Missing 'direction' in request"}), 400

    try:
        response = myDrone.move_in_direction(direction)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"response": response}), 200


@app.route("/drone/rotate", methods=["POST"])
def rotate():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing data in request"}), 400
    direction = data.get("direction")
    if not direction:
        return jsonify({"error": "Missing 'direction' in request"}), 400

    try:
        # Use defaultDegree from the Drone class instance for rotation
        response = myDrone.rotate(direction)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"response": response}), 200


@app.route("/drone/flip", methods=["POST"])
def flip():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing data in request"}), 400
    direction = data.get("direction")
    if not direction:
        return jsonify({"error": "Missing 'direction' in request"}), 400

    try:
        response = myDrone.flip(direction)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({"response": response}), 200


@app.route("/drone/query/<query>", methods=["GET"])
def drone_query(query):
    try:
        response = myDrone.query_drone(f"{query}?")
        app.logger.info(f"Drone query '{query}?' response: {response}")
        time.sleep(2)
        return jsonify({"status": "success", "response": response}), 200
    except Exception as e:
        app.logger.error(f"Error during drone query: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("/drone/patrol", methods=["POST"])
def patrol():
    try:
        myDrone.patrol()
        return jsonify({"response": "Drone started patrolling"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/drone/stop_patrol", methods=["POST"])
def stop_patrol():
    try:
        myDrone.stop_patrol()
        return jsonify({"response": "Drone stopped patrolling"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/drone/stop", methods=["POST"])
def stop():
    try:
        myDrone.emergency()
        return jsonify({"response": "Drone stopped"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def video_generator():
    """
    A generator to continuously get video frames from the drone.
    """
    for jpeg in myDrone.jpeg_generator():
        yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + jpeg + b"\r\n\r\n")


@app.route("/drone/camera")
def camera():
    """
    Route to serve the video feed from the drone's camera.
    """
    if myDrone is None:
        return jsonify({"error": "The drone failed to initialize."}), 500

    return Response(
        video_generator(), mimetype="multipart/x-mixed-replace; boundary=frame"
    )


@app.route("/drone/face_detection/enable", methods=["POST"])
def enable_face_detection():
    try:
        myDrone.turnOnFace()
        return jsonify({"response": "Face detection enabled"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/drone/face_detection/disable", methods=["POST"])
def disable_face_detection():
    try:
        myDrone.turnOffFace()
        return jsonify({"response": "Face detection disabled"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    try:
        app.run(host="0.0.0.0", port=5000)
    except Exception as e:
        if myDrone:
            myDrone.stop()
        app.logger.error(f"An error occurred: {str(e)}")
