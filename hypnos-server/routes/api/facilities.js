const express = require("express");
const router = express.Router();

const facility = require("@controllers/facilities");

router.post("/", facility.create);

/**
 * Get all roles
 * @name /facility
 * @method GET
 */
router.get("/", facility.getAll);

/**
 * Get all roles
 * @name /facility
 * @method GET
 */
router.get("/:id", facility.getById);

/**
 * Update an existing role
 * @name /facility/:id
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
router.put("/:id", facility.update);

/**
 * Delete a role
 * @name /facility/:id
 * @method DELETE
 */
router.delete("/:id", facility.remove);

module.exports = router;
