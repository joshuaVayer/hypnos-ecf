const jwt = require("jsonwebtoken");

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(" ")[0] === "Bearer") {
    const token = authorization.split(" ")[1];
    return jwt.decode(token, process.env.JWT_SECRET);
  }

  return null;
};

module.exports = {
  getTokenFromHeaders
};
