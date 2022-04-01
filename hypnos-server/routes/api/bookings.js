const express = require("express");
const router = express.Router();

const booking = require("@controllers/bookings");

router.post("/", booking.create);

router.get("/", booking.getAll);

router.get("/:id", booking.getById);

router.put("/:id", booking.update);

router.delete("/:id", booking.remove);

module.exports = router;
