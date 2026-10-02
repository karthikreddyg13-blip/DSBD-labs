/**
 * App.js - Main Express Application Server for DBMS Practical 7
 * 
 * Features:
 *  - Configures Express application
 *  - Applies middlewares (cors, express.json, urlencoded)
 *  - Registers User and Activity routes
 *  - Starts HTTP server on port 3000
 */

const express = require('express');
const cors = require('cors');

// Import routes
const Userroute = require('./routes/Userroute');
const Activityroute = require('./routes/Activityroute');

// Initialize the Express application
const app = express();

// Set Server Port (default 3000)
const PORT = process.env.PORT || 3000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Middleware to parse incoming URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Root health-check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DBMS Practical 7 Express Server is up and running!',
    endpoints: {
      users: {
        getAll: 'GET /users',
        create: 'POST /users'
      },
      activities: {
        getAll: 'GET /activities',
        create: 'POST /activities'
      }
    }
  });
});

// Register routes
app.use('/users', Userroute);
app.use('/activities', Activityroute);

// Global 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`
  });
});

// Global Error Handler middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'An unexpected internal server error occurred.',
    error: err.message
  });
});

// Start the Express server
const server = app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` DBMS Practical 7 Server Started Successfully!`);
  console.log(` Server running at: http://localhost:${PORT}`);
  console.log(` User routes:      http://localhost:${PORT}/users`);
  console.log(` Activity routes:  http://localhost:${PORT}/activities`);
  console.log(`=================================================`);
});

// Graceful handling of port collision
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[Warning] Port ${PORT} is already in use by another application.`);
    console.error(`You can run on an alternate port using: PORT=3001 npm start`);
  } else {
    console.error('Server error:', err);
  }
});

module.exports = app;
