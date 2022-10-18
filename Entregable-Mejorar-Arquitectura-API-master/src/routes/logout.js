const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const logger = require("pino");

const controlLogin = require('../controllers/controlLogin');
const controlLogout = require('../controllers/controlLogout');

router.get("/", controlLogout.getLogout);

module.exports = router;