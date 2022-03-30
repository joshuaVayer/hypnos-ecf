const { User } = require("@models/users");
const Facility = require("@models/facilities");
const { userIsAdmin } = require("@utils/mongo/admin");
const { generateCrudMethods } = require("@utils/mongo");
const { getTokenFromHeaders } = require("@utils/token");

const isAllowedUser = async req => {
  const token = getTokenFromHeaders(req);
  if (!token || !token.id) return false;

  const user = await User.findOne({ _id: token.id }).populate("role");
  if (!user) return false;

  const facilityId = req.params.id;
  const facilitiesIds = user.facilities.map(facility => facility.toString());
  const isAllowedUser =
    facilitiesIds.includes(facilityId) || user.role.name === "admin";

  return isAllowedUser;
};

module.exports = {
  // 1 - CRUD OPERATIONS
  ...generateCrudMethods(Facility),

  // 2 - CUSTOM OPERATIONS
  create: async (req, res) => {
    const isAdmin = await userIsAdmin(req);
    if (!isAdmin) return res.status(403).json({ error: "Unauthorized operation" });

    const facility = await Facility.create(req.body);
    return res.status(201).json(facility);
  },

  update: async (req, res) => {
    if (!isAllowedUser(req)) {
      return res.status(401).send("Unauthorized operation or no corresponding facility");
    }

    const facilityId = req.params.id;
    const updatedFacility = await Facility.findByIdAndUpdate(facilityId, req.body);
    return res.status(200).send(updatedFacility);
  },

  remove: async (req, res) => {
    if (!isAllowedUser(req)) {
      return res.status(401).send("Unauthorized operation or no corresponding facility");
    }

    const facilityId = req.params.id;
    const removedFacility = await Facility.findByIdAndRemove(facilityId);
    return res.status(200).send(removedFacility);
  }
};
