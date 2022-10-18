const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const logger = require('pino');
const bcrypt = require('bcrypt');

module.exports = {

renderRegister: (req, res) => {
    res.render("register");
    logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
  },

  postRegister: (req, res) => {
    logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
    const { username, password, name } = req.body;
    User.findOne({ username }, async (err, user) => {
      if (err) console.log(err);
      if (user) res.render("register-error");
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          username,
          password: hashedPassword,
          name,
        });
        await newUser.save();
        res.redirect("/login");
      }
    });
  }


};