const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateToken = require("../controllers/authController");
router.post("/login", authController.loginUser);

router.post("/generate-token", authController.generateToken);

router.get("/protected-route", authController.validateToken, (req, res) => {
  res.json({ message: "Access granted!" });
});
module.exports = router;
