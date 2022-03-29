const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  create,
  update,
  remove
} = require("@controllers/facilities");

/**
 * Add a new facilty
 * @name /facility
 * @method PUT
 * @body {
 *  name: { type: String, required: true },
 *  description: { type: String },
 *  address: { type: String, required: true },
 *  city: { type: String, required: true },
 *  state: { type: String, required: true },
 *  zip: { type: String, required: true },
 *  phone: { type: String, required: true },
 *  createdAt: { type: Date, default: Date.now, required: true },
 *  updatedAt: { type: Date, default: Date.now, required: true },
 * }
 */
router.put("/", create);

/**
 * Get all roles
 * @name /facility
 * @method GET
 */
router.get("/", getAll);

/**
 * Get all roles
 * @name /facility
 * @method GET
 */
router.get("/:id", getById);

/**
 * Update an existing role
 * @name /facility/:id
 * @method POST
 * @body {
 *  name: { type: String, required: true },
 *  description: { type: String },
 *  address: { type: String, required: true },
 *  city: { type: String, required: true },
 *  state: { type: String, required: true },
 *  zip: { type: String, required: true },
 *  phone: { type: String, required: true },
 *  createdAt: { type: Date, default: Date.now, required: true },
 *  updatedAt: { type: Date, default: Date.now, required: true },
 * }
 */
router.post("/:id", update);

/**
 * Delete a role
 * @name /facility/:id
 * @method DELETE
 */
router.delete("/:id", remove);

module.exports = router;
