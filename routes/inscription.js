const express = require('express');
const router = express.Router();

const inscriptionControllers = require('../api/controllers/inscriptionControllers');

router.get('/', inscriptionControllers.inscription);

module.exports = router;