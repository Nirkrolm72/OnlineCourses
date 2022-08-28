const express = require('express');
const router = express.Router();

const profilControllers = require('../api/controllers/profilControllers');


router.get('/', profilControllers.getProfilUser);
router.put('/:id', profilControllers.updateProfil);

module.exports = router;