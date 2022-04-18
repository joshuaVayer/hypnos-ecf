const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  create,
  remove,
  update
} = require("@controllers/users");
const userIs = require("@middlewares/auth");

router.get("/:id", getById);

/*
  * Only meant to be used by admins to create new admins or managers
  * Otherwise the /signup route should be used
*/
router.post("/", userIs.admin, create);

router.delete("/:id", userIs.admin, remove);

router.get("/", userIs.adminOrManager, getAll);

router.put("/:id", userIs.himselfOrAdmin, update);

module.exports = router;
