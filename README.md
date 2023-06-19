<div align="center">
 
  <img src="https://github.com/redayzarra/AutoPilot/assets/113388793/a22ba189-41be-4926-836a-466e47016bb7" alt="PocketTrader_GUI">

</div>


AutoPilot is a solution for controlling the Tello EDU Drone through a locally-hosted web interface. This system utilizes a robust Flask backend server and a user-friendly React frontend for seamless control of drone operations. Simple arrow key presses initiate commands like takeoff, landing, rotation, and even patrolling. Advanced features, such as facial recognition capabilities powered by OpenCV, expand drone functionalities by enabling real-time face tracking observable on the live video stream.

<div align="center">

  <img src="https://github.com/redayzarra/AutoPilot/assets/113388793/ce24473c-fa23-4d6f-9a2a-bb6d584ee4e8" alt="PocketTrader_GUI">

</div>


## Overview

Welcome to the **AutoPilot**! This project is designed to elevate the interaction with the [Tello EDU Drone](https://www.ryzerobotics.com/tello-edu) to a whole new level by offering a comprehensive, web-based platform to manage and control drone operations. The Tello EDU Drone has a well-structured [SDK](https://dl-cdn.ryzerobotics.com/downloads/Tello/Tello%20SDK%202.0%20User%20Guide.pdf) that provides an intuitive way to command the drone. My drone system allows you to control the drone from a locally-hosted website, instead of the Tello Drone app. 

The project integrates a robust Flask backend server, which facilitates direct interaction with the drone, performing various commands like taking off, landing, moving, rotating, flipping, and even patrolling. To make these operations user-friendly and accessible, I've developed an interactive React frontend. The frontend is specifically designed with a focus on user experience – you can **control your drone with simple arrow keys (with live video stream) for a more enjoyable experience**. It provides real-time command issuance and response collection with fluid controls, ensuring that operating the drone feels as natural and intuitive as possible.

Outside of web integration, I have extended the drone's capabilities to the realm of facial recognition. Leveraging OpenCV, the Tello EDU drone is now equipped with face tracking abilities. As you navigate the drone, you can observe the tracking in action on the live video stream, straight from the built-in camera to the React website. This feature opens up a world of possibilities for innovative drone applications – I plan to make a hand tracking Drone.

#### ⚠️Do not bother using the Tello EDU app, even if you got the Tello EDU drone. Before you start using the drone, you need to authorize your drone. This can be done through the [Tello App](https://apps.apple.com/us/app/tello/id1330559633). 

## Features

**React Web Interface**: AutoPilot provides a locally hosted, user-friendly web interface. This lets you control your Tello EDU Drone directly from your browser, removing dependency on the Tello App for drone control.

**Configurable Default Values**: Tailor drone behaviors and system parameters according to your needs and preferences. This is achievable via the config.json file.

**Keyboard Inputs for Drone Control**: Control the drone using simple keyboard inputs on the website. Issue commands like taking off, landing, moving, rotating, and flipping.

**Real-Time Video Stream**: View the drone's perspective in real-time through a live video stream directly displayed on the website.

**Advanced Drone Maneuvers**: Command your drone to perform flips and adjust its altitude directly from the website.

**Face Tracking**: Utilize OpenCV to equip your drone with face tracking abilities. Recognize and track faces in real-time, adding to the unique functionalities of your drone.

**Flask Backend Server**: A robust Flask backend server interacts directly with the Tello EDU drone. This server can issue commands for takeoff, landing, moving, rotating, flipping, and even setting the drone to patrol.

**Extensive API**: Interact programmatically with your drone through a comprehensive set of API endpoints. Issue commands and receive drone data at your convenience.

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/redayzarra/AutoPilot.git
```

2. Navigate to the project directory:
```bash
cd AutoPilot
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

## Drone Test

1. Turn the drone on using the side button. Ensure that the drone is charged and authorized (Tello App)
2. Connect to the Tello Drone Wi-Fi network. No password should be required
3. Navigate to the project directory and run:

```bash
python test.py
```
4. Ensure your drone:

* Took off
* Flipped forward
* Rotate right by 90 degrees
* Moved up
* Moved down
* Landed

## Running AutoPilot

### 1. Start the backend server

Navigate to the project directory and run:
```bash
python -m backend.controllers.server
```
The backend server is accessible at http://localhost:5000.

### 2. Run the website

To run the frontend React application, navigate to the frontend directory or run:
```bash
cd frontend
npm run dev
```
The frontend application is accessible at [http://localhost:5173/](http://localhost:5173/).

### 3. Reload the website

You may need to reload the website for all the necessary components to work again. Reloading the website a couple of times ensures that everything is working properly.

## API

The backend supports the following REST endpoints:

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

## License

This project is licensed under the MIT license. Please see the [LICENSE](https://github.com/redayzarra/DroneControlSystem/blob/master/LICENSE) file for details.
