const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  getUserRole
} = require("@controllers/auth");

router.post("/login", login);

router.post("/signup", signup);

router.get("/role", getUserRole);

module.exports = router;
