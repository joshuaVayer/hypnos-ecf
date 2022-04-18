const express = require("express");
const router = express.Router();

const userIs = require("@middlewares/auth");
const formSubmission = require("@controllers/formSubmissions");

router.post("/", formSubmission.create);

router.get("/", userIs.admin, formSubmission.getAll);

router.get("/:id", userIs.admin, formSubmission.getById);

module.exports = router;
