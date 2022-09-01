const express = require('express');
const router = express.Router();

const seeCoursesControllers = require('../api/controllers/seeCoursesControllers');

//router.get('/', seeCoursesControllers.seeCourses);

router.get('/seeCourses/:id', seeCoursesControllers.getSeeCourses);

module.exports = router;