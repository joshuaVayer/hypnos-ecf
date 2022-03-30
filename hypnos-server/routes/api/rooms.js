const express = require("express");
const router = express.Router();

const rooms = require("@controllers/rooms");

/**
 * Get all roles
 * @name /rooms
 * @method POST
 * @body {
 * facility: { type: Schema.Types.ObjectId, ref: "Facility", required: true },
 * roomNumber: { type: String, required: true, unique: true },
 * capacity: { type: Number, required: true, min: 1, default: 1 },
 * description: { type: String, required: true, default: "" },
 * price: { type: Number, required: true, default: 0 },
 * coverImage: { type: Schema.Types.ObjectId, ref: "Media", default: null },
 * images: [{ type: Schema.Types.ObjectId, ref: "Media", default: [] }],
 * createdAt: { type: Date, default: Date.now },
 * updatedAt: { type: Date, default: Date.now }
 * }
 */
router.post("/", rooms.create);

/**
 * Get all roles
 * @name /facility
 * @method GET
 */
router.get("/", rooms.getAll);

/**
  * Get all roles
  * @name /facility
  * @method GET
  */
router.get("/:id", rooms.getById);

router.put("/:id", rooms.update);

router.delete("/:id", rooms.remove);

module.exports = router;
