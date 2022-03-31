const express = require("express");
const router = express.Router();

const { upload, remove } = require("@controllers/upload");

/**
 * Upload a media
 * @name /upload
 * @method POST
 */
router.post("/", upload);

/**
 * Delete an existing media
 * @name /upload
 * @method POST
 */
router.delete("/:file", remove);

module.exports = router;
