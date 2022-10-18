const express = require('express');
const router = express.Router();
const logger = require("pino");
const minimist=require('minimist');
const cluster = require('cluster');

const controlInfo = require('../controllers/controlInfo');
router.get('/', controlInfo.getInfo)

module.exports = router;