const express = require("express");
const router = express.Router();
const { signup, login, getUserByCnic } = require("../controllers/authController");

// Signup Route
router.post("/signup", signup);

// Login Route
router.post("/login", login);

// ✅ Fetch user details by CNIC
router.get("/user/:cnic", getUserByCnic);

module.exports = router;
