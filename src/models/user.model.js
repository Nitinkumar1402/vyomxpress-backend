const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: { name: "unique_username", msg: "Username already exists." },
      validate: {
        len: { args: [3, 50], msg: "Username must be between 3 and 50 characters." },
        notEmpty: { msg: "Username cannot be empty." },
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: { name: "unique_email", msg: "Email already registered." },
      validate: {
        isEmail: { msg: "Please provide a valid email address." },
        notEmpty: { msg: "Email cannot be empty." },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: { args: [6, 255], msg: "Password must be at least 6 characters." },
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    discord_user_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: { attributes: {} },
    },
  }
);

module.exports = User;