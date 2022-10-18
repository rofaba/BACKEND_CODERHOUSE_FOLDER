const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const logger = require('pino')
const fs = require('fs');

const productos = require('../controllers/controlProductos')

function saveProduct() {
    try {
          productos.push(nuevoProducto)
          let prodString = JSON.stringify(productos, null, 2)
          fs.promises.writeFile('../src/DAOS/productos.txt', prodString);
          console.log('El producto se ha guardado exitosamente')
          res.redirect('/api')
        }
      
    catch (error) {
          console.log('Ha ocurrido un error en el proceso', error)
      }
  };
