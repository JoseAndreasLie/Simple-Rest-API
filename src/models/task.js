const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deadline: {
        type: DataTypes.DATE,
    },
});

// Define the one-to-many relationship between Task and User
Task.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Task, { foreignKey: "userId", as: "tasks" });

module.exports = Task;