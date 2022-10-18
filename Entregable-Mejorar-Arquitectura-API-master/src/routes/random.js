const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const logger = require("pino");
const {fork} = require('child_process');

const controlRandom = require('../controllers/controlRandom');

router.get('/', controlRandom.getRandom)

module.exports = router;

