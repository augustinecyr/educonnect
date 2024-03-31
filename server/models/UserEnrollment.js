const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");
const Course = require("./Course");

const UserEnrollment = sequelize.define("educonnect_user_enrollment", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  try {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
})();

module.exports = UserEnrollment;
