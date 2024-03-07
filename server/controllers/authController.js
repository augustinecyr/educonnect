const mysql = require("mysql");
const { format } = require("date-fns");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
require("dotenv").config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  const params = [email, password];

  req.body.password = await bcrypt.hash(req.body.password, 10);

  // Execute the query using the connection pool
  pool.query(query, params, (error, results) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    if (results.length === 0) {
      return res
        .status(401)
        .json({ message: "Invalid user credentials provided." });
    }

    const timestamp = new Date();
    // format function
    const formattedTimestamp = format(timestamp, "dd:MM:yyyy HH:mm:ss");
    // Passwords match
    res.status(200);
    res.status(200).json({
      message: `Authenticated user with the email: ${email} has logged onto the system at ${formattedTimestamp}`,
    });
  });
};

exports.validateToken = (req, res, next) => {
  const EduconnectUser = {
    email,
    password,
  };
  let accessToken = sign(EduconnectUser, process.env.APP_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
  res.json({
    accessToken: accessToken,
    user: EduconnectUser,
  });
  try {
    const accessToken = req.header("Authorization").split(" ")[1];
    if (!accessToken) {
      return res.sendStatus(401);
    }

    const payload = verify(accessToken, process.env.APP_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
};
