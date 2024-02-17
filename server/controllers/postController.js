// postController.js
const Post = require("../models/Post");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    // Logic to create a new post
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    // Logic to retrieve all posts
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get post by ID
exports.getPostById = async (req, res) => {
  try {
    // Logic to retrieve post by ID
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update post by ID
exports.updatePostById = async (req, res) => {
  try {
    // Logic to update post by ID
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPost) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json(updatedPost);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete post by ID
exports.deletePostById = async (req, res) => {
  try {
    // Logic to delete post by ID
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json({ message: "Post deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};