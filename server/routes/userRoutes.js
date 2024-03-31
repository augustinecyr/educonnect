const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.createUser);
router.get("/fetch/userinfo/:email", userController.getUserByEmail);
router.put("/edit/userinfo/:email", userController.editUserByEmail);

module.exports = router;
