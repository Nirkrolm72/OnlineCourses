const express = require('express');
const router = express.Router();

const {

    getUsers,
    updateUser,
    deleteUser

} = require('../api/controllers/adminControllers');

router.get('/', getUsers);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;