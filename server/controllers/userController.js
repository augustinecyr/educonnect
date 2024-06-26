const User = require("../models/User");
const EduconnectUser = require("../models/User");
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

exports.createUser = async (req, res) => {
  const {
    name,
    company,
    occupation,
    mobile_number,
    email,
    password,
    createdAt,
    updatedAt,
  } = req.body;

  const EduconnectUserData = {
    name,
    company,
    occupation,
    mobile_number,
    email,
    password,
    createdAt,
    updatedAt,
  };

  const DbUserData = {
    email: EduconnectUserData.email,
    password: EduconnectUserData.password,
  };

  const checkEmailQuery = `SELECT COUNT(*) AS count FROM users WHERE email = ?`;

  pool.query(checkEmailQuery, [DbUserData.email], (err, result) => {
    if (err) {
      console.error("Error executing email check query:", err);
      return;
    }

    const emailExists = result[0].count > 0;

    if (emailExists) {
      console.log("This email already exists");
      return;
    }

    const insertQuery = `INSERT INTO educonnect_users (email, password) VALUES (?, ?)`;

    pool.query(
      insertQuery,
      [DbUserData.email, DbUserData.password],
      (err, result) => {
        if (err) {
          console.error("Error executing insert query:", err);
          return;
        }
        console.log("Number of rows affected:", result.affectedRows);
        console.log(
          `Registration of ${DbUserData.email} into the database was successful`
        );
      }
    );
  });

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    console.log("Existing user found:", email);
    return res
      .status(400)
      .json({ message: "This email has already been used." });
  }

  User.create(EduconnectUserData, async (error, result) => {
    try {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      return res
        .status(201)
        .json({ message: "User created successfully", user: result });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await EduconnectUser.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.editUserByEmail = async (req, res) => {
  const { email } = req.params;
  const updatedUserInfo = req.body;

  try {
    const user = await EduconnectUser.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await EduconnectUser.update(updatedUserInfo, { where: { email } });

    const updatedUser = await EduconnectUser.findOne({ where: { email } });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.changePasswordByEmail = async (req, res) => {
  const { email } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await EduconnectUser.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await EduconnectUser.update(
      { password: newPassword },
      { where: { email } }
    );

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
