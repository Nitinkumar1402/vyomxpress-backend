const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const serviceController = require("../controllers/service.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");

const serviceValidation = [
  body("name").trim().isLength({ min: 2, max: 100 }).withMessage("Service name must be between 2 and 100 characters."),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a non-negative number."),
];

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new service
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price]
 *             properties:
 *               name: { type: string, example: "Web Development" }
 *               description: { type: string }
 *               price: { type: number, example: 999.99 }
 *               category: { type: string, example: "Technology" }
 *     responses:
 *       201:
 *         description: Service created
 */
router.post("/", authenticate, serviceValidation, validate, serviceController.createService);

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services (paginated)
 *     tags: [Services]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of services
 */
router.get("/", serviceController.getAllServices);

/**
 * @swagger
 * /services/{id}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Service found
 *       404:
 *         description: Not found
 */
router.get("/:id", serviceController.getServiceById);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update a service (owner only)
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Service updated
 */
router.put("/:id", authenticate, serviceController.updateService);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a service (owner only)
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Service deleted
 */
router.delete("/:id", authenticate, serviceController.deleteService);

module.exports = router;