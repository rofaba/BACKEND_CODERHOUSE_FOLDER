const express = require('express');

const router = express.Router();
const logger = require('pino')
const fs = require('fs');

const controlApi = require('../controllers/controlApi');

router.get('/', controlApi.getApi);

module.exports = router;