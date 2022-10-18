const { Router } = require('express');
const router = Router();
const controlProducts = require('../public/controlProducts');

//PRODUCTOS

router.get('/', controlProducts.getAllProducts); 
router.get('/:id', controlProducts.getPbyId);
router.post('/', controlProducts.postProduct);
router.put('/:id', controlProducts.putOneProduct);
router.delete('/:id', controlProducts.delProdById);


module.exports = router;