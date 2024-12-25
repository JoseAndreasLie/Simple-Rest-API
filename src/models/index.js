const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user");
const Group = require("./group");
const Task = require("./task");
const UserGroup = require("./user-group");

// Define relationships
User.belongsToMany(Group, {
    through: UserGroup,
    foreignKey: "userId",
});
Group.belongsToMany(User, {
    through: UserGroup,
    foreignKey: "groupId",
});

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

module.exports = {
    sequelize,
    User,
    Group,
    Task,
    UserGroup,
};
