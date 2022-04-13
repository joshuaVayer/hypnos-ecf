const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  getUserRole
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

router.get("/role", getUserRole);

module.exports = router;
