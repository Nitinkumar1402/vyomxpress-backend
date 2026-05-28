const userService = require("../services/user.service");
const { sendSuccess } = require("../utils/response");

/**
 * GET /api/v1/users
 */
const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await userService.getAllUsers({ page, limit });
    return sendSuccess(res, { message: "Users fetched successfully.", data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/users/:id
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return sendSuccess(res, { message: "User fetched successfully.", data: { user } });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/users/username/:username
 */
const getUserByUsername = async (req, res, next) => {
  try {
    const user = await userService.getUserByUsername(req.params.username);
    return sendSuccess(res, { message: "User fetched successfully.", data: { user } });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/v1/users/:id
 */
const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    return sendSuccess(res, { message: "User updated successfully.", data: { user } });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/v1/users/:id
 */
const deactivateUser = async (req, res, next) => {
  try {
    const result = await userService.deactivateUser(req.params.id);
    return sendSuccess(res, { message: result.message });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUserById, getUserByUsername, updateUser, deactivateUser };