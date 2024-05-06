const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

let users = [
  { id: 1, username: "oleg", email: "oleg@aaa.bbb", password: "oleg1" },
  { id: 2, username: "user", email: "user@aaa.bbb", password: "user1" },
]; // Array to store blog posts

// Middleware
router.use((req, res, next) => {
  // Sort desc by id (insertion time)
  console.log(`Time:${new Date().toLocaleString()}`);
  next();
});

router.get("/users", (req, res) => {
  res.json(users);
});

// Register new user
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const index = users.findIndex((post) => post.username === username);
  if (index !== -1) {
    return res.status(404).json(`User ${username} already exists`);
  }
  const newUser = { id: Date.now(), username, email, password };
  console.log(`Add new post id=${newUser.id} username=${newUser.username}`);
  users.push(newUser);
  res.status(201).json(newUser);
  console.log(`Registered user ${newUser.username}`)
});

// Login
router.post("/login", (req, res) => {
  const { username, email, password } = req.body;
  const index = users.findIndex((post) => post.username === username);
  if (index == -1) {
    return res.status(404).json("User not found!");
  }
  user = users[index];
  if (user.password != password) {
    return res.status(400).json("Wrong username or password!");
  }

  const token = jwt.sign({ id: user.id }, "jwtkey");

  // Remove the password from the user data
  const { removed_password, ...other } = user;
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(other);
  console.log(`Logged in user ${user.username}`)
});

router.post("/logout", (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
});

module.exports = router;
