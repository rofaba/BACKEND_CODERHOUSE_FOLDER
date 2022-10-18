const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const logger = require('pino')
const fs = require('fs');

const controlProductos = require('../controllers/controlProductos');

router.post('/', controlProductos.postProducto);

module.exports = router;
