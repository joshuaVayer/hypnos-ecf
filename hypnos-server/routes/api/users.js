const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  create,
  remove
} = require("@controllers/users");

/**
 * Add a new user
 * @name /user
 * @method PUT
 * @body {
 *  username: String,
 *  passwordHash: String,
 *  name: String,
 *  facilities: [{ type: Schema.Types.ObjectId, ref: "Facility", default: [] }],
 *  role: { type: Schema.Types.ObjectId, default: "Role" },
 *  createdAt: { type: Date, default: Date.now, required: true },
 *  updatedAt: { type: Date, default: Date.now, required: true }
 * }
 */
router.put("/", create);

/**
 * Get a user by id
 * @name path
 * @param {String} id
 */
router.get("/", getAll);

/**
 * Get a user by id
 * @name path
 * @param {String} id
 */
router.get("/:id", getById);

/**
 * Uodate an existing user
 * @name path
 * @param {type} param {description}
 */
router.post("/:id", function (_, res, next) {
  res.send("respond with a resource");
});

/**
 * Delete a user
 * @name path
 * @param {type} param {description}
 */
router.delete("/:id", remove);

module.exports = router;
