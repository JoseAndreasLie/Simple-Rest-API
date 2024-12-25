const { Group, User } = require("../models");

const groupController = {
    // Create group
    async create(req, res) {
        try {
            const group = await Group.create(req.body);
            res.status(201).json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Update group
    async update(req, res) {
        try {
            const group = await Group.findByPk(req.params.id);
            if (!group) {
                return res.status(404).json({ error: "Group not found" });
            }
            await group.update(req.body);
            res.json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete group
    async delete(req, res) {
        try {
            const group = await Group.findByPk(req.params.id);
            if (!group) {
                return res.status(404).json({ error: "Group not found" });
            }
            await group.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get group by ID with associated users
    async getById(req, res) {
        try {
            const group = await Group.findByPk(req.params.id, {
                include: [
                    { model: User }, // Include users associated with this group
                ],
            });
            if (!group) {
                return res.status(404).json({ error: "Group not found" });
            }
            res.json(group);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // List all groups
    async list(req, res) {
        try {
            const groups = await Group.findAll({
                include: [
                    { model: User }, // Include associated users for each group
                ],
            });
            res.json(groups);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = groupController;
