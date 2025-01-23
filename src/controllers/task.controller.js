const { Task, User } = require("../models");

const taskController = {
    // Create task
    async create(req, res) {
        try {
            const task = await Task.create(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Update task
    async update(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }
            await task.update(req.body);
            res.json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete task
    async delete(req, res) {
        try {
            const task = await Task.findByPk(req.params.id);
            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }
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
                include: [
                    { model: User }, // Include the user who owns this task
                ],
            });
            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }
            res.json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // List all tasks
    async list(req, res) {
        try {
            const tasks = await Task.findAll({
                include: [
                    { model: User }, // Include associated users for each task
                ],
            });
            res.json(tasks);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = taskController;
