const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

// Task routes
router.post("/tasks", taskController.create); // Create a new task
router.put("/tasks/:id", taskController.update); // Update task by ID
router.delete("/tasks/:id", taskController.delete); // Delete task by ID
router.get("/tasks/:id", taskController.getById); // Get task by ID (with user)
router.get("/tasks", taskController.list); // List all tasks (with associated users)
// User route to get user data with tasks
router.get("/users/:id/tasks", taskController.getUserWithTasks); // Get user by ID (with tasks)

module.exports = router;