// courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CourseController');

router.post('/create', courseController.createCourse);
router.get('/fetch', courseController.getAllCourses);
router.put('/edit/:courseId', courseController.editCourse);
router.delete('/delete/:courseId', courseController.deleteCourse);


module.exports = router;
