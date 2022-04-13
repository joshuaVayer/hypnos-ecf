
const Room = require("@models/rooms");
const { User, Role } = require("@models/users");
const { Booking } = require("@models/bookings");

const { userIsAdmin } = require("@utils/mongo/admin");
const { getTokenFromHeaders } = require("@utils/token");

const userIs = async (role = "", req) => {
  const token = getTokenFromHeaders(req);
  if (!token || !token.id) return false;

  const user = await User.findOne({ _id: token.id }).populate("role");
  if (!user || !user.role) return false;

  return user.role.name === role;
};

const isAllowedFacilityUser = async (req, fromRoom = false) => {
  const token = getTokenFromHeaders(req);
  if (!token || !token.id) return false;

  if (userIsAdmin(req)) return true;

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
  return facilitiesIds.includes(facilityId);
};

const isBookingOwnerOrAdmin = async (req) => {
  const token = getTokenFromHeaders(req);
  if (!token || !token.id) return false;

  const user = await User.findOne({ _id: token.id }).populate("role");
  if (!user || !user.role) return false;
  if (user.role.name === "admin") return true;

  const booking = await Booking.findOne({ _id: req.params.id });

  return booking.user.toString() === token.id;
};

const userIsAllowedToCreateRole = async (req) => {
  if (req.body.role) {
    const role = await Role.findOne({ _id: req.body.role });
    if (!role) return false;
    // New clients should use the /auth/signup endpoint to create a new user
    if (role.name === "client") return false;

    return userIsAdmin(req);
  }

  return false;
};

const isAllowedBookingUser = async (req) => {
  const token = getTokenFromHeaders(req);
  if (!token || !token.id) return false;

  const user = await User.findOne({ _id: token.id }).populate("role");
  if (!user || !user.role) return false;
  if (user.role.name === "admin") return true;

  const booking = await Booking.findOne({ _id: req.params.id }).populate("user").populate("room");
  if (!booking || !booking.user) return false;
  if (booking.user.name === "client" && booking.user._id.toString() === token.id) return true;

  // Check if manager is allowed to get this booking
  if (booking.room && booking.room.facility) {
    const facilitiesIds = user.facilities.map(facility => facility.toString());
    const isAllowedUser =
      facilitiesIds.includes(booking.room.facility.toString());

    return isAllowedUser;
  }

  return false;
};

module.exports = {
  userIs,
  isAllowedBookingUser,
  isAllowedFacilityUser,
  isBookingOwnerOrAdmin,
  userIsAllowedToCreateRole
};
