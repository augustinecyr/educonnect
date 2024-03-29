const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();
const PORT = process.env.PORT;
const { Sequelize } = require("sequelize");

// Middleware
app.use(express.json()); // Parse JSON bodies

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow cookies and session tokens to be sent
  })
);

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database using sequelize has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database using sequelize:", error);
  }
}

module.exports = { sequelize, testConnection };

testConnection();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL: [educonnect]");
});

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
