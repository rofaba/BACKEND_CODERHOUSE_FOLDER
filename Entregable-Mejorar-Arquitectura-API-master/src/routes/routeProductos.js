const { Router } = require('express');
const router = Router();
const controlProducts = require('../controllers/controlProducts');

router.post('/', controlProducts.postProduct);

module.exports = router;