const { User, Service } = require("../models");

/**
 * Get all users (admin only)
 */
const getAllUsers = async ({ page = 1, limit = 10 } = {}) => {
  const offset = (page - 1) * limit;
  const { count, rows } = await User.findAndCountAll({
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [["created_at", "DESC"]],
  });
  return {
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / limit),
    users: rows,
  };
};

/**
 * Get user by ID with their services
 */
const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    include: [{ model: Service, as: "services", where: { is_active: true }, required: false }],
  });
  if (!user) {
    const err = new Error("User not found.");
    err.statusCode = 404;
    throw err;
  }
  return user;
};

/**
 * Get user by username
 */
const getUserByUsername = async (username) => {
  const user = await User.findOne({
    where: { username },
    include: [{ model: Service, as: "services", where: { is_active: true }, required: false }],
  });
  if (!user) {
    const err = new Error(`User '${username}' not found.`);
    err.statusCode = 404;
    throw err;
  }
  return user;
};

/**
 * Update user profile
 */
const updateUser = async (id, updateData) => {
  const user = await User.findByPk(id);
  if (!user) {
    const err = new Error("User not found.");
    err.statusCode = 404;
    throw err;
  }

  // Prevent password update through this method
  delete updateData.password;
  delete updateData.role;

  await user.update(updateData);
  return user;
};

/**
 * Soft-delete (deactivate) user
 */
const deactivateUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    const err = new Error("User not found.");
    err.statusCode = 404;
    throw err;
  }
  await user.update({ is_active: false });
  return { message: "User deactivated successfully." };
};

module.exports = { getAllUsers, getUserById, getUserByUsername, updateUser, deactivateUser };