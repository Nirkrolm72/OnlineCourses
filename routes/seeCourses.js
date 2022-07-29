const express = require('express');
const router = express.Router();

const {
    getSeeCourses
} = require('../api/controllers/seeCoursesControllers');

router.get('/', getSeeCourses);

module.exports = router;