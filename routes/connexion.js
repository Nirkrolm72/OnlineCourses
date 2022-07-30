const express = require('express');
const router = express.Router();

const connexionControllers = require('../api/controllers/connexionControllers');

router.get('/', connexionControllers.connexion);

// router.post('/', connexionControllers.connectUser ) = {
//     console.log('Coucou');
// }


module.exports = router;