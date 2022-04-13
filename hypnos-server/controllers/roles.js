const { Role } = require("@models/users");
const { generateCrudMethods } = require("@utils/mongo");
const { userIs } = require("@utils/mongo/user");

module.exports = {
  getAll: async (req, res) => {
    if (!userIs("admin", req)) {
      return res.status(403).send({
        error: "You don't have the permission to get all users"
      });
    }

    return generateCrudMethods(Role).getAll(req, res);
  }
};
