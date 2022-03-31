const bcrypt = require("bcrypt");

const { User } = require("@models/users");
const { generateCrudMethods } = require("@utils/mongo");

module.exports = {
  // 1 - CRUD OPERATIONS
  ...generateCrudMethods(User),

  // 2 - CUSTOM OPERATIONS
  create: async (req, res) => {
    const { username, name, password, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      name,
      passwordHash,
      role
    });

    try {
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
};
