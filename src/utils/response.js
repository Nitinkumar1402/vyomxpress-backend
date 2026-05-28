/**
 * Send a successful response
 */
const sendSuccess = (res, { message = "Success", data = null, statusCode = 200 } = {}) => {
  const response = { success: true, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 */
const sendError = (res, { message = "Something went wrong", errors = [], statusCode = 500 } = {}) => {
  const response = { success: false, message };
  if (errors.length > 0) response.errors = errors;
  return res.status(statusCode).json(response);
};

module.exports = { sendSuccess, sendError };