const express = require('express');
const router = express.Router();

const userControllers = require('../api/controllers/userControllers');

router.get('/', userControllers.getUsers);

router.put('/:id', userControllers.updateUser);

router.delete('/:id', userControllers.deleteUser);

module.exports = router;