//ruta en base a contenedor archivos

const { Router } = require('express');
const router = Router();
const controlProducts = require('../public/controlProducts');

router
get('/', controllerproductos.getAllProducts);
get('/:id', controllerproductos.getPbyId);
post('/', controllerproductos.postProduct);
put('/:id', controllerproductos.putOneProduct);
delete ('/:id', controllerproductos.delProdById);

module.exports = router;