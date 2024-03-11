// userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// create users
router.post("/register", userController.createUser);

module.exports = router;