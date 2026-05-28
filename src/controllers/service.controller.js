const serviceService = require("../services/service.service");
const { sendSuccess } = require("../utils/response");

/**
 * POST /api/v1/services
 */
const createService = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;
    const service = await serviceService.createService({
      name, description, price, category,
      userId: req.user.id,
    });
    return sendSuccess(res, { message: "Service created successfully.", data: { service }, statusCode: 201 });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/services
 */
const getAllServices = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await serviceService.getAllServices({ page, limit });
    return sendSuccess(res, { message: "Services fetched successfully.", data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/v1/services/:id
 */
const getServiceById = async (req, res, next) => {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    return sendSuccess(res, { message: "Service fetched successfully.", data: { service } });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/v1/services/:id
 */
const updateService = async (req, res, next) => {
  try {
    const service = await serviceService.updateService(req.params.id, req.user.id, req.body);
    return sendSuccess(res, { message: "Service updated successfully.", data: { service } });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/v1/services/:id
 */
const deleteService = async (req, res, next) => {
  try {
    const result = await serviceService.deleteService(req.params.id, req.user.id);
    return sendSuccess(res, { message: result.message });
  } catch (error) {
    next(error);
  }
};

module.exports = { createService, getAllServices, getServiceById, updateService, deleteService };