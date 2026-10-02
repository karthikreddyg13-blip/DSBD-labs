/**
 * Activitycontroller.js - Controller for Activity operations
 * Handles creating and retrieving activity logs from the mock database.
 */

const { activities, users } = require('../Db');

/**
 * Controller to create a new activity log
 * Handles: POST /activities
 * Expected body: { userId: number, action: string, details?: string }
 */
const createActivity = (req, res) => {
  try {
    const { userId, action, details } = req.body;

    // Validation: Check required fields
    if (userId === undefined || userId === null || !action) {
      return res.status(400).json({
        success: false,
        message: 'userId and action are required fields.'
      });
    }

    const parsedUserId = Number(userId);

    // Validate that userId is a valid number
    if (isNaN(parsedUserId)) {
      return res.status(400).json({
        success: false,
        message: 'userId must be a valid number.'
      });
    }

    // Verify if the referenced user exists in the mock database
    const userExists = users.some((user) => user.id === parsedUserId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${parsedUserId} does not exist.`
      });
    }

    // Create new activity object with auto-incrementing ID
    const newActivity = {
      id: activities.length > 0 ? activities[activities.length - 1].id + 1 : 1,
      userId: parsedUserId,
      action: action.trim(),
      details: details ? details.trim() : '',
      timestamp: new Date().toISOString()
    };

    // Save to mock database
    activities.push(newActivity);

    // Return success response with 201 Created
    return res.status(201).json({
      success: true,
      message: 'Activity recorded successfully.',
      data: newActivity
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error while creating activity.',
      error: error.message
    });
  }
};

/**
 * Controller to fetch all activity logs
 * Handles: GET /activities
 */
const getActivities = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching activities.',
      error: error.message
    });
  }
};

module.exports = {
  createActivity,
  getActivities
};
