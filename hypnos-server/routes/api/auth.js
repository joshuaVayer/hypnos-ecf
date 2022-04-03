const express = require("express");
const router = express.Router();

const {
  login,
  signup
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

router.post("/signup", signup);

module.exports = router;
