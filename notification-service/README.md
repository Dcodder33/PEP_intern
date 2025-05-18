Notification Service
Overview
This project implements a scalable Notification Service backend as per the assignment guidelines.
It allows sending and retrieving notifications of type Email, SMS, and In-App to users, with robust background processing using a queue and retry mechanism for reliability.

Features
REST API Endpoints

Send a notification (POST /notifications)

Get all notifications for a user (GET /users/{id}/notifications)

Notification Types: Email, SMS, In-App

Background Processing: Uses BullMQ (Redis) for queueing and retries (bonus)

MongoDB for persistent storage

Extensible structure for adding real notification channels

Tech Stack
Node.js

Express.js

MongoDB (via Mongoose)

Redis (via BullMQ & ioredis)

Postman (for manual testing)

Setup Instructions
Prerequisites
Node.js (v18 or later)

MongoDB (local or MongoDB Atlas)

Redis (local, Redis Cloud, or via WSL2 on Windows)

Git

(Optional) Postman for API testing

Installation
Clone the repository

bash
git clone <your-repo-url>
cd notification-service
Install dependencies

bash
npm install
Configure environment variables

Create a .env file in the project root (or set environment variables directly):

text
MONGO_URI=mongodb://localhost:27017/notifications
REDIS_URL=redis://localhost:6379
PORT=3000
Adjust the URIs if using cloud MongoDB/Redis.

Running the Services
Start MongoDB and Redis on your machine or use cloud services.

Start the API server:

bash
node app.js
Start the worker (in a separate terminal):

bash
node workers/notificationWorker.js
API Documentation

1. Send a Notification
Endpoint:
POST /notifications

Request Body (JSON):

json
{
  "userId": "user123",
  "type": "email",    // or "sms" or "in-app"
  "message": "Your notification message"
}
Response:

201 Created with the notification data and confirmation.

Example using curl:

bash
curl -X POST http://localhost:3000/notifications \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","type":"email","message":"Hello from the Notification Service!"}'
  
2. Get User Notifications
Endpoint:
GET /users/{id}/notifications

Response:

200 OK with a JSON array of notifications for the user.

Example using curl:

bash
curl http://localhost:3000/users/user123/notifications
Testing Instructions
Start all services (MongoDB, Redis, API server, Worker).

Use Postman or curl to:

Send notifications via POST /notifications

Retrieve notifications via GET /users/{id}/notifications

Observe the worker terminal for logs simulating Email, SMS, and In-App notifications.

Check MongoDB to verify notifications are stored.

Test retry logic:

(Optional) Temporarily modify the worker to throw errors and observe retries in logs.

Assumptions
No authentication is implemented (for simplicity and as per assignment).

Notification delivery is simulated via console logs (can be extended to real providers).

All notifications are persisted in MongoDB.

The queue uses Redis and BullMQ for background processing and retries.

Project Structure
text
notification-service/
├── app.js
├── models/
│   └── Notification.js
├── services/
│   └── notifier.js
├── queues/
│   └── notificationQueue.js
├── workers/
│   └── notificationWorker.js
├── .env
├── package.json
└── README.md

Contact
For any questions or clarifications, please contact:
Dhruv Gorai
22052551@kiit.ac.in

Thank you for reviewing my assignment!


