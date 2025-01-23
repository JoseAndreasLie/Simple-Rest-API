const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

// Routes for Task
router.post("/tasks", taskController.create); // Create a new task
router.put("/tasks/:id", taskController.update); // Update task by ID
router.delete("/tasks/:id", taskController.delete); // Delete task by ID
router.get("/tasks/:id", taskController.getById); // Get task by ID (with associated user)
router.get("/tasks", taskController.list); // List all tasks (with associated users)

module.exports = router;
