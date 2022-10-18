const express = require('express');
const {appendFile } = require('fs');
const router = express.Router();
const logger = require("pino");

module.exports = {

    getLogin: (req, res) => {
        if (req.user) {
            res.redirect("/api");
        } else {
            res.redirect("/login");
        }
    },

    renderLogin: (req, res) => {
        res.render("login");
        logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
    },

    getError: (req, res) => {
        res.render("login-error");
    }
};