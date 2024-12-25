const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group.controller");

// Routes for Group
router.post("/groups", groupController.create); // Create a new group
router.put("/groups/:id", groupController.update); // Update group by ID
router.delete("/groups/:id", groupController.delete); // Delete group by ID
router.get("/groups/:id", groupController.getById); // Get group by ID (with associated users)
router.get("/groups", groupController.list); // List all groups (with associated users)

module.exports = router;
