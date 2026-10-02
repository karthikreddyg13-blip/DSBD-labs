# DBMS Practical 7 - Express.js Mock Database Application

A complete Node.js and Express.js REST API project implementing in-memory mock database operations for **Users** and **Activities**.

---

## 📁 Project Structure

```text
Practical7/
│
├── App.js                      # Main Express server and application entry point
├── Db.js                       # Mock database with in-memory arrays (users, activities)
│
├── routes/
│   ├── Userroute.js            # Express router for /users endpoints
│   └── Activityroute.js        # Express router for /activities endpoints
│
├── controllers/
│   ├── Usercontroller.js       # Business logic for User CRUD (createUser, getUsers)
│   └── Activitycontroller.js   # Business logic for Activity CRUD (createActivity, getActivities)
│
├── package.json                # Project dependencies and npm scripts
└── README.md                   # Project documentation and API reference
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.x or later recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Installation

Install required dependencies:

```bash
npm install
```

### Running the Application

To start the server using the configured start script:

```bash
npm start
```

Or for development with automatic restarts using `nodemon`:

```bash
npm run dev
```

The server will start on port `3000`:
- Base URL: `http://localhost:3000`

---

## 📡 API Endpoints

### 1. Root / Health Check
- **Endpoint:** `GET /`
- **Description:** Returns API status and overview of available endpoints.

---

### 2. User Endpoints (`/users`)

#### `GET /users`
- **Description:** Fetches all users from the mock database.
- **Response:** `200 OK`
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-10-02T18:10:00.000Z"
    }
  ]
}
```

#### `POST /users`
- **Description:** Creates a new user in the mock database.
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Alice Cooper",
  "email": "alice@example.com"
}
```
- **Response:** `201 Created`
```json
{
  "success": true,
  "message": "User created successfully.",
  "data": {
    "id": 3,
    "name": "Alice Cooper",
    "email": "alice@example.com",
    "createdAt": "2026-10-02T18:11:00.000Z"
  }
}
```

---

### 3. Activity Endpoints (`/activities`)

#### `GET /activities`
- **Description:** Fetches all activity logs from the mock database.
- **Response:** `200 OK`
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "userId": 1,
      "action": "User Login",
      "details": "Logged in via Web Application",
      "timestamp": "2026-10-02T18:10:00.000Z"
    }
  ]
}
```

#### `POST /activities`
- **Description:** Records an activity log for an existing user.
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "userId": 1,
  "action": "Password Reset",
  "details": "User requested password reset link"
}
```
- **Response:** `201 Created`
```json
{
  "success": true,
  "message": "Activity recorded successfully.",
  "data": {
    "id": 3,
    "userId": 1,
    "action": "Password Reset",
    "details": "User requested password reset link",
    "timestamp": "2026-10-02T18:12:00.000Z"
  }
}
```

---

## 🧪 Testing with cURL

### Retrieve all users:
```bash
curl -X GET http://localhost:3000/users
```

### Add a new user:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Cooper","email":"alice@example.com"}'
```

### Retrieve all activities:
```bash
curl -X GET http://localhost:3000/activities
```

### Add a new activity:
```bash
curl -X POST http://localhost:3000/activities \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"action":"Profile Update","details":"Changed contact number"}'
```
