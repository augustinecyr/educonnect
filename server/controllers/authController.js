const mysql = require("mysql");
const { format } = require("date-fns");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const EduconnectUser = {
    email,
    password,
  };
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  const params = [email, password];

  req.body.password = await bcrypt.hash(req.body.password, 10);

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
    const formattedTimestamp = format(timestamp, "dd:MM:yyyy HH:mm:ss");
    const accessToken = sign(EduconnectUser, process.env.APP_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });

    res.status(200).json({
      message: `Authenticated user with the email: ${email} has logged onto the system at ${formattedTimestamp}`,
      token: accessToken,
    });
  });
};

exports.generateToken = async (req, res) => {
  const { email, password } = req.body;

  const EduconnectUser = {
    email,
    password,
  };
  const accessToken = sign(EduconnectUser, process.env.APP_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
  res.json({
    accessToken: accessToken,
    user: EduconnectUser,
  });
};

exports.validateToken = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization").split(" ")[1];
    if (!accessToken) {
      return res.sendStatus(401);
    }

    const payload = verify(accessToken, process.env.APP_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
};
