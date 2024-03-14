const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");

// Define the user model
const Course = sequelize.define("educonnect_courses", {
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attachmentUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Course;
