// courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CourseController');

// create courses
router.post('/courses', courseController.createCourse);

// retrieve courses
router.get('/courses', courseController.getAllCourses);


module.exports = router;
