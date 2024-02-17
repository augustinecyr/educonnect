// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// create users
router.post('/users', userController.createUser);

// retrieve users
router.get('/users', userController.getAllUsers);

module.exports = router;
