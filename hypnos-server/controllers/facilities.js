const Rooms = require("@models/rooms");
const Facility = require("@models/facilities");
const { generateCrudMethods } = require("@utils/mongo");

module.exports = {
  // 1 - CRUD OPERATIONS
  ...generateCrudMethods(Facility),

  remove: async (req, res) => {
    // Check for associated rooms
    const rooms = await Rooms.find({ facility: req.params.id });
    if (rooms.length > 0) {
      return res.status(400).send("Cannot remove facility with rooms");
    }

    return generateCrudMethods(Facility).remove(req, res);
  }
};
