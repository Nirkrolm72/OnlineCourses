const express = require('express');
const router = express.Router();

const formateurControllers = require('../api/controllers/formateurControllers');

router.get('/', formateurControllers.formateur);


module.exports = router;