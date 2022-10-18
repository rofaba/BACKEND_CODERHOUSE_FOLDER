const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const logger = require("pino");

module.exports = {

getLogout: (req, res, next) => {
    logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.render('logout');
    });
  }
};
