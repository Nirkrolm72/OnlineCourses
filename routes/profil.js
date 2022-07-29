const express = require('express');
const router = express.Router();

const {
    getProfilUser
} = require('../api/controllers/profilControllers');

router.get('/', getProfilUser);

module.exports = router;