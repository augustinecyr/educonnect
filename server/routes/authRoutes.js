// authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// Login a user
router.post("/login", authController.loginUser);
// Add more routes as needed
module.exports = router;
