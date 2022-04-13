const bcrypt = require("bcrypt");

const { User } = require("@models/users");
const { generateCrudMethods } = require("@utils/mongo");
const { userIsAllowedToCreateRole, userIs } = require("@utils/mongo/user");

module.exports = {
  // 1 - CRUD OPERATIONS
  ...generateCrudMethods(User),

  // 2 - CUSTOM OPERATIONS
  create: async (req, res) => {
    const { username, name, password, role, facilities } = req.body;

    if (!password) {
      res.status(400).send({
        error: "Password is required"
      });
    }

    if (!userIsAllowedToCreateRole(req)) {
      return res.status(403).send({
        error: "You don't have the permission to create users"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      role,
      name,
      username,
      facilities,
      passwordHash
    });

    try {
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getAll: async (req, res) => {
    if (!userIs("admin", req)) {
      return res.status(403).send({
        error: "You don't have the permission to get all users"
      });
    }

    try {
      const users = await User.find({}).populate("role");
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
