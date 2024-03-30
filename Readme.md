
# CrisisConnect Emergency Reporting App


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Emergency Assistance App is a comprehensive web application designed to connect individuals in emergency situations with nearby volunteers who can offer immediate assistance. From medical emergencies to natural disasters, the app ensures quick communication, aid delivery, and coordination during critical times.

## Features

- **User Registration**: Users can register accounts with their email addresses and passwords.
- **Emergency Reporting**: Registered users can report emergencies with detailed information, including type, location, and description.
- **Location Sharing**: Users can share their current location when reporting emergencies, providing accurate coordinates for volunteers to locate.
- **Image Upload**: Users can upload images related to the emergency, such as photos of accidents or incidents, which are stored securely on Cloudinary.
- **Real-Time Communication**: The app facilitates real-time messaging between users and volunteers, allowing for direct communication during emergencies.
- **Notification System**: Users receive real-time notifications for updates on reported emergencies and new volunteer responses.
- **Map**: A map interface displays reported emergencies and volunteer locations, enabling efficient coordination and response efforts.
- **User Authentication**: Secure authentication using JSON Web Tokens (JWT) ensures only verified individuals can access the app's features.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io
- **Authentication**: JSON Web Tokens (JWT)
- **Image Storage**: Cloudinary
- **Maps Integration**: Leaflet.js
- **Deployment**: Render.com

## Usage

1. Register an account using your email address and password.
2. Report emergencies by providing detailed information, including type, location, and description.
3. Share your current location and upload images related to the emergency for better assistance.
4. Receive real-time updates and notifications on reported emergencies and volunteer responses.
5. Communicate directly with volunteers in real-time using the app's messaging feature.
6. View reported emergencies and volunteer locations on the interactive map for efficient coordination.

## Limitations

- **Location Accuracy**: The app relies on the user's device GPS for location tracking, which may have limitations in accuracy, especially indoors or in remote areas.
- **Real-Time Updates**: The real-time update functionality, such as chat and emergency alerts, may experience delays or latency due to network conditions and server load.

## Contributing

Contributions are welcome! Fork the repository, create a new branch, commit your changes, and open a pull request.
