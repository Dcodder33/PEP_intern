# 📬 Notification Service

A scalable backend system for sending and retrieving notifications (Email, SMS, In-App), equipped with background processing, retry mechanisms, and persistent storage.

---

## 📖 Overview

This project implements a robust **Notification Service** that:
- Supports Email, SMS, and In-App notification types
- Uses **BullMQ** (Redis) for queue-based background processing
- Stores all notifications persistently in **MongoDB**
- Provides clean and extendable code structure to support future notification channels

---

## 🚀 Features

✅ **REST API Endpoints**  
- `POST /notifications`: Send a new notification  
- `GET /users/{id}/notifications`: Retrieve all notifications for a user

✅ **Notification Types**  
- Email  
- SMS  
- In-App  

✅ **Tech Highlights**  
- Background job queue with **Redis + BullMQ**  
- Retry logic for failed notifications  
- MongoDB for persistent storage  
- Easily extendable architecture  

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)
- **Redis** (via BullMQ and ioredis)
- **Postman** – for manual API testing

---

## ⚙️ Setup Instructions

### 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)  
- MongoDB (local or MongoDB Atlas)  
- Redis (local, Redis Cloud, or via WSL2 on Windows)  
- Git  
- *(Optional)* Postman for API testing  

---

## 🛠️ Installation

```bash
git clone https://github.com/Dcodder33/PEP_intern.git
cd notification-service
npm install
```
## 🧾 Environment Configuration
Create a .env file in the project root with the following:
```
MONGO_URI=mongodb://localhost:27017/notifications
REDIS_URL=redis://localhost:6379
PORT=3000
```

## ▶️ Running the Services
1.Start MongoDB and Redis services on your system or use cloud alternatives.
2.Start the API server:
```
node app.js
```
3.In a separate terminal, start the background worker:
```
node workers/notificationWorker.js
```
## 📬 API Endpoints
1. Send Notification
```
POST /notifications
Request Body:

{
  "userId": "user123",
  "type": "email",     // or "sms" or "in-app"
  "message": "Hello from the Notification Service!"
}

```
## Example using curl:
```
curl -X POST http://localhost:3000/notifications \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","type":"email","message":"Hello!"}'
```
## 2. Get User Notifications
```
GET /users/{id}/notifications
```
Example:
```
curl http://localhost:3000/users/user123/notifications
```
## 🧪 Testing Instructions
1.Ensure MongoDB and Redis are running

2.Run the API server and worker

3.Use Postman or curl to:

4.Send notifications via POST /notifications

5.Retrieve notifications via GET /users/{id}/notifications

6.Watch the terminal for logs simulating actual delivery

7.Check MongoDB to verify data persistence

Bonus: Temporarily force an error in notificationWorker.js to test retry mechanism.

## 📁 Project Structure
```
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
```
## 🔐 Assumptions

No authentication implemented (for simplicity)

Notification delivery simulated using console.log()

Retry mechanism and queue handled via Redis & BullMQ

Designed to easily plug in real providers (e.g., Twilio, SendGrid)

## 👨‍💻 Author
## Dhruv Gorai
## 📧 22052551@kiit.ac.in

# 🙏 Thank You
Thank you for reviewing my project! Feedback is welcome 😊


