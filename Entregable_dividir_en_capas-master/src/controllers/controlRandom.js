const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const logger = require("pino");
const {fork} = require('child_process');

module.exports = {

getRandom: (req, res) => {
    
    logger().info("ruta - metodo correctos")
    console.log(`cant = ${req.query.cant} || Si no fue ingresado el parámetro se asignará valor de 100 millones`)
    let cant = req.query.cant
    if (cant === undefined) { cant= 100000000};
    const child = fork('./temp/random.js');
    child.send(cant);
    child.on("message", msg => {
      res.json({ numeros: msg });
    })
  }
};