const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const taskController = require("../controllers/task.controller");

router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);
router.get("/users/:id", userController.getById);
router.get("/users", userController.list);


module.exports = router;
