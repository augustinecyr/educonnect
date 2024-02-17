// postRoutes.js
const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Create a new post
router.post("/posts", postController.createPost);

// Get all posts
router.get("/posts", postController.getAllPosts);

// Get post by ID
router.get("/posts/:id", postController.getPostById);

// Update post by ID
router.put("/posts/:id", postController.updatePostById);

// Delete post by ID
router.delete("/posts/:id", postController.deletePostById);

// Add more routes as needed

module.exports = router;
