// ALIASES
require("module-alias/register");

// DEPENDENCIES
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// UTILS & MIDDLEWARES
const logger = require("@utils/logger");
const requestLogger = require("@middlewares/requestLogger");
const { findOrCreateAdmin } = require("@utils/admin");
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
       * BODY PARSER
       * ====================================
       */
      app.use(bodyParser.json({ limit: "50mb" }));
      app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

      /* ====================================
       * ROUTES
       * ====================================
       */
      const routes = require("@routes");
      app.use(urlRoot, routes);

      /* ====================================
       * ADMIN USER
       * ====================================
       */
      findOrCreateAdmin()
        .then(superAdminExist => {
          if (!superAdminExist) {
            logger.info(texts.superAdminNotFound);
            process.exit(1);
          }
        });
    })
  )
  .catch((err) => {
    logger.error(texts.mongoConnectionError(err));
    process.exit(1);
  });
