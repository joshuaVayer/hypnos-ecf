// ALIASES
require("module-alias/register");

// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const upload = require("express-fileupload");

// UTILS & MIDDLEWARES
const logger = require("@utils/logger");
const requestLogger = require("@middlewares/requestLogger");
const initMongo = require("@utils/initMongo");
const { texts, defaultPort, urlRoot } = require("@utils/config");

// ENV VARIABLES
require("dotenv").config();
const { PORT, MONGODB_URI } = process.env || { PORT: defaultPort };

const app = express();

logger.info(texts.mongoConnection);

// CONNECT TO MONGODB
mongoose
  .connect(MONGODB_URI)
  .then(() =>
    app.listen(PORT, () => {
      /* ====================================
       * APP LOGS
       * ====================================
       */
      logger.info(texts.mongoConnectionSuccess(PORT));

      app.use(requestLogger);

      /* ====================================
       * BODY PARSER & FILE UPLOAD
       * ====================================
       */
      app.use(bodyParser.json({ limit: "50mb" }));
      app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

      app.use(upload());

      /* ====================================
       * ROUTES
       * ====================================
       */
      app.use(express.static("public"));

      const routes = require("@routes");
      app.use(urlRoot, routes);

      /* ====================================
       * INIT MONGODB WITH ROLES & ADMIN
       * ====================================
       */
      initMongo().then(success => {
        if (!success) {
          logger.error(texts.initMongoError);
          process.exit(1);
        }
      });
    })
  )
  .catch((err) => {
    logger.error(texts.mongoConnectionError(err));
    process.exit(1);
  });
