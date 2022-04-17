const { Schema, model } = require("mongoose");

const RoomSchema = new Schema({
  facility: { type: Schema.Types.ObjectId, ref: "Facility", required: true },
  roomNumber: { type: String, required: true },
  capacity: { type: Number, required: true, min: 1, default: 1 },
  description: { type: String, required: true, default: "" },
  price: { type: Number, required: true, default: 0 },
  coverImage: { type: String, default: "" },
  images: [{ type: String, default: [] }],
  externalLink: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Room = model("Room", RoomSchema);

module.exports = Room;
