/**
 * Activityroute.js - Activity Routes
 * 
 * Endpoints:
 *   POST /activities - Create a new activity log
 *   GET /activities  - Retrieve all activities
 */

const express = require('express');
const router = express.Router();
const { createActivity, getActivities } = require('../controllers/Activitycontroller');

// Routes mounted at /activities
router.get('/', getActivities);
router.post('/', createActivity);

// Also supports /activities directly when router is mounted at root
router.get('/activities', getActivities);
router.post('/activities', createActivity);

module.exports = router;
