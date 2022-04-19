const bcrypt = require("bcrypt");
require("dotenv").config();

const {
  User,
  Role
} = require("@models/users");

const { DEFAULT_ADMIN_PASSWORD } = process.env;

const findOrCreateAdmin = () =>
  new Promise((resolve, reject) => {
    Role.find({ name: "admin" }).then(([role]) => {
      if (!role) {
        reject(new Error("Admin role not found"));
        return;
      }

      User.find({ role: role._id }).then(user => {
        if (!user || user.length === 0) {
          const admin = new User({
            username: "admin@hypnos-hotel.com",
            passwordHash: bcrypt.hashSync(DEFAULT_ADMIN_PASSWORD, 10),
            name: "Admin",
            role: role._id
          });

          admin.save().then(() => resolve(admin)).catch(err => reject(err));
        } else {
          resolve(user);
        }
      });
    });
  });

module.exports = { findOrCreateAdmin };
