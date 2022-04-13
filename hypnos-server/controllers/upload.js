const fs = require("fs");
const path = require("path");

const { convertBytes } = require("@utils/convert");

const logger = require("@utils/logger");

const { userIsAdmin } = require("@utils/mongo/admin");
const { userIs } = require("@utils/mongo/user");

const upload = async (req, res) => {
  Promise.all([userIsAdmin(req), userIs("manager", req)])
    .then(([isAdmin, isManager]) => {
      if (!isAdmin && !isManager) {
        res.status(403).json({
          error: "You are not allowed to upload files."
        });
        return;
      }

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      }

      const uploadedFiles = [];

      Object.keys(req.files).forEach(key => {
        const file = req.files[key];
        const fileName = String(file.name).replace(/\s/g, "_");
        const uploadPath = path.join(__dirname, "../public/uploads", fileName);

        // Move the file from the temporary location to the intended location
        file.mv(uploadPath, err => {
          if (err) return res.status(500).send(err);
        });

        uploadedFiles.push({
          name: fileName,
          type: file.mimetype,
          size: file.size,
          path: `${req.protocol}://${req.get("host")}/uploads/${fileName}`
        });
      });

      return res.status(200).json(uploadedFiles);
    })
    .catch(error => {
      logger.error(error);
      res.status(500).json({
        error: "Something went wrong."
      });
    });
};

const remove = async (req, res) => {
  const isAdmin = await userIsAdmin(req);
  if (!isAdmin) return res.status(403).json({ error: "Unauthorized operation" });

  const filePath = path.join(__dirname, "../public/uploads", req.params.file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      return res.status(200).json({
        message: "File deleted"
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error deleting file"
      });
    }
  } else {
    return res.status(404).json({
      message: "File not found"
    });
  }
};

const getAll = async (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, "../public/uploads"));
  const uploadedFiles = files.map(file => {
    const fileSuffix = path.extname(file);
    return {
      type: fileSuffix,
      size: convertBytes(fs.statSync(path.join(__dirname, "../public/uploads", file)).size),
      name: file,
      path: `${req.protocol}://${req.get("host")}/uploads/${file}`
    };
  });

  return res.status(200).json(uploadedFiles);
};

module.exports = {
  upload,
  remove,
  getAll
};
