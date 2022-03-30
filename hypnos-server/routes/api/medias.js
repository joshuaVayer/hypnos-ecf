const express = require("express");
const router = express.Router();

const media = require("@controllers/medias");

/**
 * Get a single media
 * @name /medias/:id
 * @method GET
 */
router.get("/:id", media.getById);

/**
 * Delete a media
 * @name /medias/:id
 * @method DELETE
 */
router.post("/", media.remove);
