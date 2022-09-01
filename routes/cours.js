const express = require('express');
const router = express.Router();

const coursControllers = require('../api/controllers/coursControllers');

router.get('/cours', coursControllers.getCours);

module.exports = router;