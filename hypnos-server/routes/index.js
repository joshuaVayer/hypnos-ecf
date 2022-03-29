const express = require("express");
const routes = express.Router();

routes.use("/users", require("@api/users"));
routes.use("/facilities", require("@api/facilities"));

module.exports = routes;
