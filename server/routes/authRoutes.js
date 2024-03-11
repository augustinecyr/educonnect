// authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateToken = require("../controllers/authController");
// Login a user
router.post("/login", authController.loginUser);

// Route to generate token
router.post('/generate-token', authController.generateToken);

// Route that requires token validation
router.get('/protected-route', authController.validateToken, (req, res) => {
  res.json({ message: 'Access granted!' });
});
module.exports = router;
