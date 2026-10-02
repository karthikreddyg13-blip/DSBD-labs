/**
 * Usercontroller.js - Controller for User operations
 * Handles creating and retrieving users from the mock database.
 */

const { users } = require('../Db');

/**
 * Controller to create a new user
 * Handles: POST /users
 * Expected body: { name: string, email: string }
 */
const createUser = (req, res) => {
  try {
    const { name, email } = req.body;

    // Validation: Check if required fields are provided
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required fields.'
      });
    }

    // Check if user with this email already exists
    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists.'
      });
    }

    // Create new user object with auto-incrementing ID
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      name: name.trim(),
      email: email.trim(),
      createdAt: new Date().toISOString()
    };

    // Save to mock database
    users.push(newUser);

    // Return success response with 201 Created
    return res.status(201).json({
      success: true,
      message: 'User created successfully.',
      data: newUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error while creating user.',
      error: error.message
    });
  }
};

/**
 * Controller to fetch all users
 * Handles: GET /users
 */
const getUsers = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching users.',
      error: error.message
    });
  }
};

module.exports = {
  createUser,
  getUsers
};
