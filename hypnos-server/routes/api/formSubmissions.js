const express = require("express");
const router = express.Router();

const formSubmission = require("@controllers/formSubmissions");

router.post("/", formSubmission.create);

router.get("/", formSubmission.getAll);

router.get("/:id", formSubmission.getById);

module.exports = router;
