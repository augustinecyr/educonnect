const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.get("/fetch/courses/count", analyticsController.getTotalCourses);
router.get("/fetch/users/count", analyticsController.getTotalEnrolledUsers);
router.get("/fetch/enrolled/:email", analyticsController.getEnrolledCoursesByEmail);

module.exports = router;