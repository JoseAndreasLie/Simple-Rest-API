const { Task, User } = require("../models");

const taskController = {
    // Create a new task
    async create(req, res) {
        try {
            const { userId } = req.body;

            // Check if the user exists before creating the task
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Create the task
            const task = await Task.create(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Update a task by ID
    async update(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }

            // Update the task (including userId if provided)
            await task.update(req.body);
            res.json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete a task by ID
    async delete(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }

            // Delete the task
            await task.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get task by ID with associated user
    async getById(req, res) {
        try {
            const task = await Task.findByPk(req.params.id, {
                include: [{ model: User, as: "user" }],
            });
            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }

            res.json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // List all tasks with associated users
    async list(req, res) {
        try {
            const tasks = await Task.findAll({
                include: [{ model: User, as: "user" }],
            });
            res.json(tasks);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get user by ID with associated tasks
    async getUserWithTasks(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [{ model: Task, as: "tasks" }],
            });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = taskController;
