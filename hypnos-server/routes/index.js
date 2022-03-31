const express = require("express");
const routes = express.Router();

routes.use("/auth", require("@api/auth"));
routes.use("/users", require("@api/users"));
routes.use("/upload", require("@api/upload"));
routes.use("/facilities", require("@api/facilities"));
routes.use("/rooms", require("@api/rooms"));

module.exports = routes;
