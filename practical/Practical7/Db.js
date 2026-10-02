/**
 * Db.js - Mock Database for DBMS Practical 7
 * Uses in-memory JavaScript arrays to simulate database collections/tables.
 */

// Mock User table / collection
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    createdAt: new Date().toISOString()
  }
];

// Mock Activity table / collection
const activities = [
  {
    id: 1,
    userId: 1,
    action: "User Login",
    details: "Logged in via Web Application",
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    userId: 2,
    action: "Profile Update",
    details: "Updated display name",
    timestamp: new Date().toISOString()
  }
];

// Export mock database arrays
module.exports = {
  users,
  activities
};
