const { Router } = require('express');
const router = Router();
const controlCarro = require('../controllers/controlCarro');

//CARRITOS
router.post('/', controlCarro.postCarro);
router.delete('/:id', controlCarro.delCarro);
router.get('/:id/productos', controlCarro.getIdProducts);
router.post('/:id/productos/:id_product', controlCarro.postByIds);
router.delete('/:id/productos/:id_product', controlCarro.deleteByIds);

module.exports = router;