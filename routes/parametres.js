const express = require('express');
const router = express.Router();

const  {
    getUser
} = require('../api/controllers/parametresControllers');

router.get('/', getUser);

module.exports = router;