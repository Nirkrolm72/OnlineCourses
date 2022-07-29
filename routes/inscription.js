const express = require('express');
const router = express.Router();

const  {
    inscripUser
} = require('../api/controllers/inscriptionControllers');

router.post('/', inscripUser);

module.exports = router;