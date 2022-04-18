const express = require("express");
const router = express.Router();

const userIs = require("@middlewares/auth");
const { upload, remove, getAll } = require("@controllers/upload");

router.get("/", getAll);

router.post("/", userIs.adminOrManager, upload);

router.delete("/:file", userIs.adminOrManager, remove);

module.exports = router;
