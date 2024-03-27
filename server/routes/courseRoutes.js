const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/create", courseController.createCourse);
router.get("/fetch", courseController.getAllCourses);
router.get("/fetch/:courseId", courseController.getCourseById);
router.put("/edit/:courseId", courseController.editCourse);
router.delete("/delete/:courseId", courseController.deleteCourse);
router.get("/semesters", courseController.getSemesters);

module.exports = router;
