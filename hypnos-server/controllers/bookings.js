const Room = require("@models/rooms");
const Bookings = require("@models/bookings");

const { generateCrudMethods } = require("@utils/mongo");

module.exports = {
  ...generateCrudMethods(Bookings),

  // Unprotected endpoint, should not reveal any personal information
  getAll: async (req, res) => {
    const validParams = ["room", "user", "active", "startDate", "endDate", "facility"];
    const { query } = req;

    if (query && query.facility) {
      const rooms = await Room.find({ facility: query.facility });
      query.room = rooms.map(room => room._id);
    }

    const validatedQuery = Object.keys(query).reduce((acc, key) => {
      if (validParams.includes(key)) {
        acc[key] = query[key];
      }
      return acc;
    }, {});

    Bookings.find(validatedQuery)
      .then((result) => {
        const { user, ...rest } = result;
        res.json(rest);
      })
      .catch((err) => res.json(err));
  }
};
