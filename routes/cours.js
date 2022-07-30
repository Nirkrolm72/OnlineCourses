const express = require('express');
const router = express.Router();

const coursControllers = require('../api/controllers/coursControllers'); 

router.get('/', coursControllers.cours);

router.post('/', coursControllers.postCours);

module.exports = router;