const Room = require("@models/rooms");
const { generateCrudMethods } = require("@utils/mongo");

module.exports = {
  ...generateCrudMethods(Room),

  getAll: async (req, res) => {
    const { facilityId } = req.query;

    if (facilityId) {
      Room.find({ facility: facilityId })
        .then((result) => res.json(result))
        .catch((err) => res.json(err));
      return;
    }

    return generateCrudMethods(Room).getAll(req, res);
  }
};
