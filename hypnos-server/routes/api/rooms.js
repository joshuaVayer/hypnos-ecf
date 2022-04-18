const express = require("express");
const router = express.Router();

const userIs = require("@middlewares/auth");
const rooms = require("@controllers/rooms");

router.get("/", rooms.getAll);

router.get("/:id", rooms.getById);

router.post("/", userIs.adminOrManager, rooms.create);

router.put("/:id", userIs.adminOrManager, rooms.update);

router.delete("/:id", userIs.adminOrManager, rooms.remove);

module.exports = router;
