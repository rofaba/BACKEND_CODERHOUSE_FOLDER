//ruta en base a contenedor archivos

const { Router } = require('express');
const router = Router();
const controlCarro = require('../public/controlCarro');

router
post('/', controllercarros.postCarro);
delete ('/:id', controllercarros.delCarro);
get('/:id/productos', controllercarros.getIdProducts);
post('/:id/productos/:id_product', controllercarros.postByIds);
delete ('/:id/productos/:id_product', controllercarros.deleteByIds);

module.exports = router;