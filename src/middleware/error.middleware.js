const logger = require("../utils/logger");
const { sendError } = require("../utils/response");

const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = [];

  // Sequelize Unique Constraint Error
  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    message = "Duplicate entry. Resource already exists.";
    errors = err.errors.map((e) => e.message);
  }

  // Sequelize Validation Error
  if (err.name === "SequelizeValidationError") {
    statusCode = 422;
    message = "Validation error.";
    errors = err.errors.map((e) => e.message);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token.";
  }

  logger.error(`[${statusCode}] ${message}`, { stack: err.stack, url: req.originalUrl });

  return sendError(res, { message, errors, statusCode });
};

module.exports = { notFound, errorHandler };