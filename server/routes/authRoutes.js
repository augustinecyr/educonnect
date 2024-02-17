// authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register a new user
router.post("/register", authController.registerUser);

// Login a user
router.post("/login", authController.loginUser);

// Logout a user (optional)
router.post("/logout", authController.logoutUser);

// Add more routes as needed

module.exports = router;
