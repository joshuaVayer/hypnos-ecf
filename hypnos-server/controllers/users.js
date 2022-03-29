const { User } = require("@models/users");
const { generateCrudMethods } = require("@utils/mongo");

module.exports = {
  // 1 - CRUD OPERATIONS
  ...generateCrudMethods(User)

  // 2 - OTHER OPERATIONS
};
