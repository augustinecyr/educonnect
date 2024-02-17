// authController.js
// Handles authentication-specific functionality, such as user registration, login, logout, password reset, etc. It deals with verifying user credentials and managing authentication sessions.
const User = require("../models/User");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    // Logic to create a new user
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    // Logic to authenticate user
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.validatePassword(password)) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      // Generate and send token for authentication
      const token = generateToken(user);
      res.status(200).json({ token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout a user (optional)
exports.logoutUser = async (req, res) => {
  try {
    // Logic to logout user (optional)
    // Clear user session or token, etc.
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Utility function to generate JWT token (example)
function generateToken(user) {
  // Logic to generate JWT token
  // Example: return JWT token with user payload
}

// Add more controller functions as needed
