const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const logger = require('pino')
const fs = require('fs');
require('../DAOS/productos.dao')

module.exports = {

postProducto: (req, res) => {
    logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
      try {
          const nuevoProducto = req.body;
          if (productos.length == 0) {
              nuevoProducto.id = 1
          } else {
              const identificadores = [];
              productos.forEach(element => identificadores.push(element.id));
              nuevoProducto.id = (Math.max(...identificadores) + 1);
          }
          saveProduct()
        }
  
      catch (error) {
          console.log('Ha ocurrido un error en el proceso', error)
      }
  }
};