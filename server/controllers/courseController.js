const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const { courseId, semester, title, description, videoUrl, attachmentUrl } =
      req.body;
    const newCourse = await Course.create({
      courseId,
      semester,
      title,
      description,
      videoUrl,
      attachmentUrl,
    });
    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
    console.log("courses:", courses);
  } catch (error) {
    console.error("Error retrieving courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({ where: { courseId } });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error retrieving course by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { semester, title, description, videoUrls, attachmentUrl } = req.body;

    const course = await Course.findOne({ where: { courseId } });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.semester = semester;
    course.title = title;
    course.description = description;
    course.videoUrl = videoUrls;
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

exports.getSemesters = async (req, res) => {
  try {
    const semesters = await Course.findAll({
      attributes: ["semester"],
      group: ["semester"],
    });

    const uniqueSemesters = semesters.map((course) => course.semester);

    res.status(200).json(uniqueSemesters);
    console.log("Unique semesters:", uniqueSemesters);
  } catch (error) {
    console.error("Error retrieving semesters:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
