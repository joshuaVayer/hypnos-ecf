
const logger = require("@utils/logger");

// HELPERS
const initRoles = require("./roles");
const initAdmin = require("./admin");

const initMongo = () =>
  new Promise((resolve, reject) => {
    try {
      initRoles.getExistingRoles().then(existingRoles => {
        if (!initRoles.areEquals(existingRoles)) {
          const missingRoles = initRoles.findMissingRoles(existingRoles);

          initRoles.createMissingRoles(missingRoles).then(() => {
            initAdmin.findOrCreateAdmin().then(() => resolve(true));
          });
        } else {
          initAdmin.findOrCreateAdmin().then(() => resolve(true));
        }
      });
    } catch (error) {
      logger.error(error);
      reject(error);
    }
  });

module.exports = initMongo;
