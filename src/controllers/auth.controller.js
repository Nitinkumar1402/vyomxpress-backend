const authService = require("../services/auth.service");
const { sendSuccess, sendError } = require("../utils/response");

/**
 * POST /api/v1/auth/signup
 */
const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const result = await authService.signup({ username, email, password });

    return sendSuccess(res, {
      message: "Account created successfully.",
      data: result,
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/auth/login
 */
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login({ username, password });

    return sendSuccess(res, {
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/auth/me
 */
const getMe = async (req, res, next) => {
  try {
    return sendSuccess(res, {
      message: "Profile fetched successfully.",
      data: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, getMe };