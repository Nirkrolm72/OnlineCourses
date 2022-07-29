const express = require('express');
const router = express.Router();

const {
    postCours
} = require('../api/controllers/coursControllers');

router.post('/', postCours);

module.exports = router;