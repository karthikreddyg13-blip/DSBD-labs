/**
 * Userroute.js - User Routes
 * 
 * Endpoints:
 *   POST /users - Create a new user
 *   GET /users  - Retrieve all users
 */

const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/Usercontroller');

// Routes mounted at /users
router.get('/', getUsers);
router.post('/', createUser);

// Also supports /users directly when router is mounted at root
router.get('/users', getUsers);
router.post('/users', createUser);

module.exports = router;
