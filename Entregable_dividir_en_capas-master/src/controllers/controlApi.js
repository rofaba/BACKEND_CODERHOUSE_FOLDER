const express = require('express');
const {
    appendFile
} = require('fs');
const router = express.Router();
const logger = require('pino')
const fs = require('fs');

module.exports = {
    getApi: async (req, res) => {
        logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
        
        if (req.user) {
            const datosUsuario = await User.findById(req.user._id).lean();
            res.render("index", {
                usuario: req.user.name,
                username: req.user.username
            });
        } else {
            res.redirect("/login");
        }
    }
}