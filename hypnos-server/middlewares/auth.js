const { User } = require("@models/users");
const Booking = require("@models/bookings");
const { getTokenFromHeaders } = require("@utils/token");

// ------------------
//  1 - Helpers
// ------------------
const rejectRequest = (res, message = "Unauthorized") =>
  res.status(401).json({
    status: "error",
    message
  });

const checkAndGetUser = req =>
  new Promise((resolve, reject) => {
    const token = getTokenFromHeaders(req);
    if (!token || !token.id) return reject(new Error("No valid token provided"));

    User.findOne({ _id: token.id }).populate("role").then(user => {
      if (!user || !user.role) return reject(new Error("No valid user found"));
      resolve(user);
    }).catch(err => reject(err));
  });

// ------------------
//  2 - Meant for export
// ------------------
const userIs = async (req, res, next, role = "") => {
  checkAndGetUser(req)
    .then(user => {
      if (user.role.name === role) return next();
      rejectRequest(res);
    })
    .catch(err => rejectRequest(res, err.message));
};

const adminOrManager = async (req, res, next) => {
  checkAndGetUser(req)
    .then(user => {
      if (user.role.name === "admin" || user.role.name === "manager") return next();
      rejectRequest(res);
    })
    .catch(err => rejectRequest(res, err.message));
};

const himselfOrAdmin = async (req, res, next) => {
  checkAndGetUser(req)
    .then(user => {
      if (user.role.name === "admin" || user._id.toString() === req.params.id) return next();
      rejectRequest(res);
    })
    .catch(err => rejectRequest(res, err.message));
};

const bookingRelated = async (req, res, next) => {
  checkAndGetUser(req)
    .then(user => {
      if (user.role.name === "admin") return next();
      Booking.findOne({ _id: req.params.id }).then(booking => {
        if (!booking) return rejectRequest(res);
        if (booking.user.toString() === user._id.toString()) return next();
        rejectRequest(res);
      });
    })
    .catch(err => rejectRequest(res, err.message));
};

const methods = {
  adminOrManager,
  himselfOrAdmin,
  bookingRelated,
  admin: (req, res, next) => userIs(req, res, next, "admin"),
  client: (req, res, next) => userIs(req, res, next, "client"),
  manager: (req, res, next) => userIs(req, res, next, "manager")
};

module.exports = methods;
