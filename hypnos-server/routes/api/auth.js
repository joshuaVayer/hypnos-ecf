const express = require("express");
const router = express.Router();

const {
  login
} = require("@controllers/auth");

/**
 * Add a new user
 * @name /auth/login
 * @method POST
 * @body {
 *  username: String,
 *  password: String
 * }
 */
router.post("/login", login);

module.exports = router;
