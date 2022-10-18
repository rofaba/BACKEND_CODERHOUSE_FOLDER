const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();
const logger = require("pino");

const controlLogin = require('../controllers/controlLogin');

router.get('/', controlLogin.getLogin);
router.get('/login', controlLogin.renderLogin);
router.get("/login-error", controlLogin.getError);

module.exports = router;
