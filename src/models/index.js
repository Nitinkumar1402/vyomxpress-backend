const sequelize = require("../config/database");
const User = require("./user.model");
const Service = require("./service.model");

// ─── Associations ──────────────────────────────────────────
User.hasMany(Service, { foreignKey: "user_id", as: "services" });
Service.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = { sequelize, User, Service };