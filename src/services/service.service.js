const { Service, User } = require("../models");

/**
 * Create a new service for a user
 */
const createService = async ({ name, description, price, category, userId }) => {
  const user = await User.findByPk(userId);
  if (!user) {
    const err = new Error("User not found.");
    err.statusCode = 404;
    throw err;
  }

  const service = await Service.create({ name, description, price, category, user_id: userId });
  return service;
};

/**
 * Get all services (with pagination)
 */
const getAllServices = async ({ page = 1, limit = 10 } = {}) => {
  const offset = (page - 1) * limit;
  const { count, rows } = await Service.findAndCountAll({
    where: { is_active: true },
    include: [{ model: User, as: "user", attributes: ["id", "username", "email"] }],
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [["created_at", "DESC"]],
  });
  return {
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / limit),
    services: rows,
  };
};

/**
 * Get service by ID
 */
const getServiceById = async (id) => {
  const service = await Service.findByPk(id, {
    include: [{ model: User, as: "user", attributes: ["id", "username", "email"] }],
  });
  if (!service) {
    const err = new Error("Service not found.");
    err.statusCode = 404;
    throw err;
  }
  return service;
};

/**
 * Update service (owner only)
 */
const updateService = async (id, userId, updateData) => {
  const service = await Service.findByPk(id);
  if (!service) {
    const err = new Error("Service not found.");
    err.statusCode = 404;
    throw err;
  }
  if (service.user_id !== userId) {
    const err = new Error("You are not authorized to update this service.");
    err.statusCode = 403;
    throw err;
  }
  await service.update(updateData);
  return service;
};

/**
 * Delete service (owner only)
 */
const deleteService = async (id, userId) => {
  const service = await Service.findByPk(id);
  if (!service) {
    const err = new Error("Service not found.");
    err.statusCode = 404;
    throw err;
  }
  if (service.user_id !== userId) {
    const err = new Error("You are not authorized to delete this service.");
    err.statusCode = 403;
    throw err;
  }
  await service.update({ is_active: false });
  return { message: "Service deleted successfully." };
};

module.exports = { createService, getAllServices, getServiceById, updateService, deleteService };