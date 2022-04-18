const { Role } = require("@models/users");
const { generateCrudMethods } = require("@utils/mongo");

module.exports = generateCrudMethods(Role);
