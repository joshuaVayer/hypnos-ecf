const express = require("express");
const router = express.Router();

const userIs = require("@middlewares/auth");
const booking = require("@controllers/bookings");

router.get("/", booking.getAll);

router.post("/", booking.create);

router.get("/:id", booking.getById);

router.put("/:id", userIs.bookingRelated, booking.update);

router.delete("/:id", userIs.bookingRelated, booking.remove);

module.exports = router;
