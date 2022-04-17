const Room = require("@models/rooms");
const Bookings = require("@models/bookings");

const logger = require("@utils/logger");
const { generateCrudMethods } = require("@utils/mongo");
const { userIs, isAllowedBookingUser } = require("@utils/mongo/user");

module.exports = {
  create: async (req, res) => {
    const isClient = await userIs("client", req);
    if (!isClient) return res.status(403).json({ error: "Unauthorized operation, you should create a client account" });

    return generateCrudMethods(Bookings).create(req, res);
  },

  update: async (req, res) => {
    isAllowedBookingUser(req)
      .then(permission => {
        if (!permission) return res.status(403).json({ error: "Unauthorized operation" });
        return generateCrudMethods(Bookings).update(req, res);
      })
      .catch(error => {
        logger.error(error);
        res.status(500).json({
          error: "Something went wrong."
        });
      });
  },

  remove: async (req, res) => {
    isAllowedBookingUser(req)
      .then(permission => {
        if (!permission) return res.status(403).json({ error: "Unauthorized operation" });
        // Remove booking to user
        return generateCrudMethods(Bookings).remove(req, res);
      })
      .catch(error => {
        logger.error(error);
        res.status(500).json({
          error: "Something went wrong."
        });
      });
  },

  getById: async (req, res) => {
    isAllowedBookingUser(req)
      .then(permission => {
        if (!permission) return res.status(403).json({ error: "Unauthorized operation" });
        return generateCrudMethods(Bookings).getById(req, res);
      })
      .catch(error => {
        logger.error(error);
        res.status(500).json({
          error: "Something went wrong."
        });
      });
  },

  // Unprotected endpoint, should not reveal any personal information
  getAll: async (req, res) => {
    const validParams = ["room", "user", "active", "startDate", "endDate", "facility"];
    const { query } = req;
    if (query && query.facility) {
      const rooms = await Room.find({ facility: query.facility });
      query.room = rooms.map(room => room._id);
    }
    console.log(query);
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
