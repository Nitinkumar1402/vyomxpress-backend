const { validationResult } = require("express-validator");
const { sendError } = require("../utils/response");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    return sendError(res, {
      message: "Validation failed.",
      errors: messages,
      statusCode: 422,
    });
  }
  next();
};

module.exports = { validate };