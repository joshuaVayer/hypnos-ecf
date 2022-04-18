const bcrypt = require("bcrypt");

const { User } = require("@models/users");
const { generateCrudMethods } = require("@utils/mongo");

module.exports = {
  // 1 - CRUD OPERATIONS
  ...generateCrudMethods(User),

  // 2 - CUSTOM OPERATIONS
  /*
   * Only meant to be used by admins to create new admins and managers
   * Otherwise the /signup route should be used
  */
  create: async (req, res) => {
    const { username, name, password, role, facilities } = req.body;

    if (!password) {
      res.status(400).send({
        error: "Password is required"
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

  getAll: (_, res) => {
    User.find({}).populate("role")
      .then(users => {
        res.status(200).send(users);
      }).catch(err => {
        res.status(500).send(err);
      });
    ;
  }
};
