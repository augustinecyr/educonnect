// courseController.js
const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    // Extract course data from the request body
    const { courseId, semester, title, description, videoUrl, attachmentUrl } =
      req.body;

    // Create a new course instance
    const newCourse = await Course.create({
      courseId,
      semester,
      title,
      description,
      videoUrl,
      attachmentUrl,
    });

    // Send a success response with the newly created course
    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    // Retrieve all courses from the database
    const courses = await Course.findAll();

    // Send the courses as a JSON response
    res.status(200).json(courses);
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response
    console.error("Error retrieving courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { semester, title, description, videoUrl, attachmentUrl } = req.body;

    const course = await Course.findOne({ where: { courseId } });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.semester = semester;
    course.title = title;
    course.description = description;
    course.videoUrl = videoUrl;
    course.attachmentUrl = attachmentUrl;

    await course.save();

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({ where: { courseId } });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.destroy();

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
