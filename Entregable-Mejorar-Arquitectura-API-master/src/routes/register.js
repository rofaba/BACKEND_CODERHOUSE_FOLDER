const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();

const controlRegister = require('../controllers/controlRegister');

router.get('/register', controlRegister.renderRegister);

router.post("/register", controlRegister.postRegister);

module.exports = router;
  