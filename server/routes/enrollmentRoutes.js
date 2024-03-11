// enrollmentRoutes.js
const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router.post('/enrollments', enrollmentController.enrollStudent);
router.get('/enrollments/:courseId', enrollmentController.getEnrollmentsByCourse);
// Add more routes as needed

module.exports = router;
