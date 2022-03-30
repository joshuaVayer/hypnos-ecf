const logger = require("@utils/logger");
const roles = require("./roles.json");

const { Role } = require("@models/users");

const getExistingRoles = () =>
  new Promise(resolve => {
    Role.find().then(existingRoles => {
      resolve(existingRoles);
    }).catch(err => {
      logger.error(err);
      resolve([]);
    });
  });

const areEquals = existingRoles => {
  if (existingRoles.length !== roles.length) return false;

  const result = existingRoles.every(existingRole => {
    const role = roles.find(({ name }) => name === existingRole.name);
    if (!role) return false;
    return true;
  });

  return result;
};

const findMissingRoles = existingRoles =>
  roles.filter(({ name }) => {
    const role = existingRoles.find(existingRole => name === existingRole.name);
    return !role;
  });

const createMissingRoles = missingRoles =>
  new Promise((resolve, reject) => {
    const promises = missingRoles.map(({ name, description }) => {
      const role = new Role({
        name,
        description
      });

      return role.save();
    });

    Promise.all(promises).then(() => resolve()).catch(err => reject(err));
  });

module.exports = {
  getExistingRoles,
  areEquals,
  findMissingRoles,
  createMissingRoles
};
