
const Room = require("@models/rooms");
const { User } = require("@models/users");
const { getTokenFromHeaders } = require("@utils/token");

const userIsManager = async req => {
  const token = getTokenFromHeaders(req);
  if (!token || !token.id) return false;

  const user = await User.findOne({ _id: token.id }).populate("role");
  if (!user || !user.role) return false;

  return user.role.name === "manager";
};

const isAllowedFacilityUser = async (req, fromRoom = false) => {
  const token = getTokenFromHeaders(req);
  if (!token || !token.id) return false;

  const user = await User.findOne({ _id: token.id }).populate("role");
  if (!user) return false;

  let facilityId = null;

  if (fromRoom) {
    const room = await Room.findOne({ _id: req.params.id });
    if (!room) return false;
    facilityId = room.facility.toString();
  } else {
    facilityId = req.params.id;
  }

  const facilitiesIds = user.facilities.map(facility => facility.toString());
  const isAllowedUser =
    facilitiesIds.includes(facilityId) || user.role.name === "admin";

  return isAllowedUser;
};

module.exports = {
  userIsManager,
  isAllowedFacilityUser
};
