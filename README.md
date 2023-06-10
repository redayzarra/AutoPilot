# Drone Control System

The Drone Control System is a Flask backend application that communicates with a drone to perform different operations such as takeoff, landing, moving, rotating, flipping, and patrolling. The system also includes a React frontend for user interaction.

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
