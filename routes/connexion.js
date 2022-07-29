const express = require('express');
const router = express.Router();

const  {
    connectUser
} = require('../api/controllers/connexionControllers');


router.post('/', connectUser);


module.exports = router;