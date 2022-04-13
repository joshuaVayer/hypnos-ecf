const Room = require("@models/rooms");
const { generateCrudMethods } = require("@utils/mongo");
const { isAllowedFacilityUser } = require("@utils/mongo/user");

module.exports = {
  ...generateCrudMethods(Room),

  getAll: async (req, res) => {
    const { facilityId } = req.query;
    if (facilityId) {
      Room.find({ facility: facilityId })
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
    } else {
      return generateCrudMethods(Room).getAll(req, res);
    }
  },

  create: async (req, res) => {
    const isAllowed = await isAllowedFacilityUser(req, true);
    if (!isAllowed) return res.status(403).send("Unauthorized operation");

    return generateCrudMethods(Room).create(req, res);
  },

  update: async (req, res) => {
    const isAllowed = await isAllowedFacilityUser(req, true);
    if (!isAllowed) return res.status(403).send("Unauthorized operation or no corresponding room");

    return generateCrudMethods(Room).update(req, res);
  },

  remove: async (req, res) => {
    const isAllowed = await isAllowedFacilityUser(req, true);
    if (!isAllowed) return res.status(401).json({ message: "Unauthorized operation or no corresponding room" });

    return generateCrudMethods(Room).remove(req, res);
  }
};
