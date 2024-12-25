const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserGroup = sequelize.define(
    "UserGroup",
    {
        // While Sequelize will automatically create the id, userId, and groupId fields,
        // we can explicitly define them for better control
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users", // This is the table name that Sequelize creates
                key: "id",
            },
            allowNull: false,
        },
        groupId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Groups",
                key: "id",
            },
            allowNull: false,
        },
        // You can add additional fields specific to the relationship if needed
        // For example:
        joinedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "member",
        },
    },
    {
        // Add indexes for better query performance
        indexes: [
            {
                unique: true,
                fields: ["userId", "groupId"],
            },
        ],
    }
);

module.exports = UserGroup;
