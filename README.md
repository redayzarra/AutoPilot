# Drone Control System

Welcome to the **Tello EDU Drone Control System**! This project is designed to elevate the interaction with the [Tello EDU Drone](https://www.ryzerobotics.com/tello-edu) to a whole new level by offering a comprehensive, web-based platform to manage and control drone operations. The Tello EDU Drone has a well-structured [SDK](https://dl-cdn.ryzerobotics.com/downloads/Tello/Tello%20SDK%202.0%20User%20Guide.pdf) that provides an intuitive way to command the drone. My drone system allows you to control the drone from a locally-hosted website, instead of the Tello Drone app. 

The project integrates a robust Flask backend server, which facilitates direct interaction with the drone, performing various commands like taking off, landing, moving, rotating, flipping, and even patrolling. To make these operations user-friendly and accessible, I've developed an interactive React frontend. The frontend is specifically designed with a focus on user experience – you can **control your drone with simple arrow keys (with live video stream) for a more enjoyable experience**. It provides real-time command issuance and response collection with fluid controls, ensuring that operating the drone feels as natural and intuitive as possible.

Outside of web integration, I have extended the drone's capabilities to the realm of facial recognition. Leveraging OpenCV, the Tello EDU drone is now equipped with face tracking abilities. As you navigate the drone, you can observe the tracking in action on the live video stream, straight from the built-in camera to the React website. This feature opens up a world of possibilities for innovative drone applications – I plan to make a hand tracking Drone.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Python 3.6+
- You have installed Flask 1.0+
- You have installed Node.js and npm
- You have installed the latest version of React

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/redayzarra/DroneControlSystem.git
```

2. Navigate to the project directory:
```bash
cd DroneControlSystem
```

3. Install Python Dependencies:
```bash
pip install -r requirements.txt
```

4. Navigate to the frontend directory:
```bash
cd frontend
```

5. Install JavaScript dependencies:
```bash
npm install
```

## Usage 

### Backend

To run the backend server, navigate to the backend directory and run:
```bash
python server.py
```
The backend server is accessible at http://localhost:5000.

### Frontend

To run the frontend application, navigate to the frontend directory and run:
```bash
npm run dev
```
The frontend application is accessible at http://localhost:3000.

## API

The backend exposes the following REST endpoints:

* `POST /drone/takeoff`: Takes off the drone.
* `POST /drone/land`: Lands the drone.
* `POST /drone/move`: Moves the drone in a specific direction. Requires direction and distance in the request body.
* `POST /drone/rotate`: Rotates the drone in a specific direction. Requires direction and degree in the request body.
* `POST /drone/flip`: Flips the drone in a specific direction. Requires direction in the request body.
* `GET /drone/query/{query}`: Retrieves the drone's data based on the query parameter.
* `POST /drone/patrol`: Starts drone patrolling.
* `POST /drone/stop_patrol`: Stops drone patrolling.
* `POST /drone/stop`: Stops the drone.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
