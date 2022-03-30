const Rooms = require("@models/rooms");
const Facility = require("@models/facilities");
const { userIsAdmin } = require("@utils/mongo/admin");
const { generateCrudMethods } = require("@utils/mongo");
const { isAllowedFacilityUser } = require("@utils/mongo/user");

module.exports = {
  // 1 - CRUD OPERATIONS
  ...generateCrudMethods(Facility),

  // 2 - CUSTOM OPERATIONS
  create: async (req, res) => {
    const isAdmin = await userIsAdmin(req);
    if (!isAdmin) return res.status(403).json({ error: "Unauthorized operation" });

    return generateCrudMethods(Facility).create(req, res);
  },

  update: async (req, res) => {
    if (!isAllowedFacilityUser(req)) {
      return res.status(401).send("Unauthorized operation or no corresponding facility");
    }

    return generateCrudMethods(Facility).update(req, res);
  },

  remove: async (req, res) => {
    if (!isAllowedFacilityUser(req)) {
      return res.status(401).send("Unauthorized operation or no corresponding facility");
    }
    // Check for associated rooms
    const rooms = await Rooms.find({ facility: req.params.id });
    if (rooms.length > 0) {
      return res.status(400).send("Cannot remove facility with rooms");
    }

    return generateCrudMethods(Facility).remove(req, res);
  }
};
