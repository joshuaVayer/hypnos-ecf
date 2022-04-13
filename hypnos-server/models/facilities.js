const { Schema, model } = require("mongoose");

const FacilitySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String, required: true },
  coverImage: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true }
});

const Facility = model("Facility", FacilitySchema);

module.exports = Facility;
