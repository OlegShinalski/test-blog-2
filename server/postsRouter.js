const express = require("express");
const router = express.Router();

let posts = []; // Array to store blog posts

// Middleware
router.use((req, res, next) => {
  // Sort desc by id (insertion time)
  console.log(`Time:${new Date().toLocaleString()}`);
  next();
});

// GET all posts
router.get("/", (req, res) => {
  const sortedPosts = posts.sort((a, b) => b.id - a.id);
  res.json(sortedPosts);
});

// Route to get a specific post
router.get("/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  console.log(`Get post id=${newPost.id}`);
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    res.json(posts[postIndex]);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// Add a new post
router.post("/", (req, res) => {
  const { title, content, userId } = req.body;
  const newPost = { id: Date.now(), title, content, userId };
  console.log(`Add new post id=${newPost.id}`);
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update a post
router.put("/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  console.log(`Update post id=${postId}`);
  const { title, content } = req.body;
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    posts[postIndex] = { ...posts[postIndex], title, content };
    res.json(posts[postIndex]);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

// Delete a post
router.delete("/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  console.log(`Delete post id=${postId}`);
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

module.exports = router;
