const express = require("express");
const router = express.Router();

const { getAll } = require("@controllers/roles");

router.get("/", getAll);

module.exports = router;
