// authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateToken = require("../controllers/authController");
// Login a user
router.post("/login", authController.loginUser);

router.get("/validate", authController.validateToken);
// Add more routes as needed
module.exports = router;
