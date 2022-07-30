const express = require('express');
const router = express.Router();

const deconnexionControllers = require('../api/controllers/deconnexionControllers');

router.post('/', deconnexionControllers.deconnexion);

module.exports = router;