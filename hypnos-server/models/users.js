const { Schema, model } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// USER
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  facilities: [{ type: Schema.Types.ObjectId, ref: "Facility", default: [] }],
  role: { type: Schema.Types.ObjectId, required: true, ref: "Role" },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true }
});

// passwordHash should not be revealed
UserSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    delete returnedObject.passwordHash;
    return returnedObject;
  }
});

UserSchema.plugin(uniqueValidator);

// ROLE
const RoleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
RoleSchema.plugin(uniqueValidator);

const User = model("User", UserSchema);
const Role = model("Role", RoleSchema);

module.exports = { User, Role };
