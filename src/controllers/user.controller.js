const { User, Group, Task } = require("../models");

const userController = {
    // Create user
    async create(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Update user
    async update(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            await user.update(req.body);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete user
    async delete(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            await user.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get user by ID with groups and tasks
    async getById(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [{ model: Group }, { model: Task }],
            });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // List all users
    async list(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = userController;
