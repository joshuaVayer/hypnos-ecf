const express = require("express");
const router = express.Router();

const userIs = require("@middlewares/auth");
const facility = require("@controllers/facilities");

router.get("/", facility.getAll);

router.get("/:id", facility.getById);

router.post("/", userIs.admin, facility.create);

router.put("/:id", userIs.admin, facility.update);

router.delete("/:id", userIs.admin, facility.remove);

module.exports = router;
