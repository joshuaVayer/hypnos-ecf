const { Schema, model } = require("mongoose");

const BookingSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  active: { type: Boolean, default: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true }
});

const Booking = model("Booking", BookingSchema);

module.exports = Booking;
