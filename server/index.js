// this file is the main interface
const express = require("express");
const app = express();
// .env file config
require("dotenv").config();
const PORT = process.env.PORT;

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Educonnect!");
});

app.get("/about", (req, res) => {
  res.send("About Educonnect");
});

// Handle POST request
app.post("/login", (req, res) => {
  // Handle login logic here
  const { username, password } = req.body;
  // Example logic: check if username and password are valid
  if (username === "admin" && password === "password") {
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid username or password");
  }
});

// Routes using separate files
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

// Use route files
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollment", enrollmentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});