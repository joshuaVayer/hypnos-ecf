const express = require("express");
const routes = express.Router();

routes.use("/auth", require("@api/auth"));
routes.use("/rooms", require("@api/rooms"));
routes.use("/users", require("@api/users"));
routes.use("/roles", require("@api/roles"));
routes.use("/upload", require("@api/upload"));
routes.use("/bookings", require("@api/bookings"));
routes.use("/facilities", require("@api/facilities"));
routes.use("/formSubmissions", require("@api/formSubmissions"));

module.exports = routes;
