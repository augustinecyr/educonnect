const User = require("../models/User"); // Assuming you have a User model defined
const bcrypt = require("bcrypt");
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// Controller function to create a new user
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
  
  EduconnectUserData.password = await bcrypt.hash(EduconnectUserData.password, 10);

  const DbUserData = {
    email: EduconnectUserData.email,
    password: EduconnectUserData.password,
  };

  DbUserData.password = await bcrypt.hash(DbUserData.password, 10);
  
  // Check if the email already exists
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

    // Email does not exist, proceed with insertion
    const insertQuery = `INSERT INTO users (email, password) VALUES (?, ?)`;

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

  // Check if the email already exists in the "users" table
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    console.log("Existing user found:", email);
    return res
      .status(400)
      .json({ message: "This email has already been used." });
  }

  // Call the createUser function on the User model
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
