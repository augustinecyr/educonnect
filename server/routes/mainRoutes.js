// mainRoutes.js

const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

// Example route to get main data
router.get("/home", mainController.getMainData);

// Add more routes as needed

module.exports = router;
