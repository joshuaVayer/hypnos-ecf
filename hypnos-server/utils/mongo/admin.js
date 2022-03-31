const { User } = require("@models/users");
const { getTokenFromHeaders } = require("@utils/token");

const userIsAdmin = async req => {
  const token = getTokenFromHeaders(req);
  if (!token || !token.id) return false;

  const user = await User.findOne({ _id: token.id }).populate("role");
  console.log("user", user);
  if (!user || !user.role) return false;

  return user.role.name === "admin";
};

module.exports = {
  userIsAdmin
};
