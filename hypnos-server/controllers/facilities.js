const Facility = require("@models/facilities");
const { generateCrudMethods } = require("@utils/mongo");

module.exports = {
  // 1 - CRUD OPERATIONS
  ...generateCrudMethods(Facility)

  // 2 - OTHER OPERATIONS
};
