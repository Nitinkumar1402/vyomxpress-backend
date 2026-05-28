const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { sendError } = require("../utils/response");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, {
        message: "Access denied. No token provided.",
        statusCode: 401,
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      const message =
        err.name === "TokenExpiredError" ? "Token has expired." : "Invalid token.";
      return sendError(res, { message, statusCode: 401 });
    }

    // Fetch fresh user data
    const user = await User.findByPk(decoded.id);
    if (!user || !user.is_active) {
      return sendError(res, { message: "User not found or deactivated.", statusCode: 401 });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(res, {
        message: "You do not have permission to perform this action.",
        statusCode: 403,
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };