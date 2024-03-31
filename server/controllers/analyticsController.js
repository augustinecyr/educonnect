const Course = require("../models/Course");
const UserEnrollment = require("../models/UserEnrollment");

exports.getTotalCourses = async (req, res) => {
  try {
    const totalCount = await Course.count();
    res.json({ totalCount });
  } catch (error) {
    console.error("Error getting total courses:", error);
    res.status(500).json({ error: "Could not fetch total courses" });
  }
};

exports.getTotalEnrolledUsers = async (req, res) => {
  try {
    const totalUsers = await UserEnrollment.count({
      col: "email",
      distinct: true,
    });
    res.json({ totalUsers });
  } catch (error) {
    console.error("Error getting total enrolled users:", error);
    res.status(500).json({ error: "Could not fetch total enrolled users" });
  }
};

exports.getEnrolledCoursesByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const courseCount = await UserEnrollment.count({
      where: { email },
    });
    res.json({ courseCount });
  } catch (error) {
    console.error("Error getting enrolled courses by email:", error);
    res
      .status(500)
      .json({ error: "Could not fetch enrolled courses by email" });
  }
};
