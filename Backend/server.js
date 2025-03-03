const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3306; // You can use port 3306 for the API

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "mydb.c1s48muq8i92.eu-north-1.rds.amazonaws.com",
  user: "muhammadfaizan25", // Replace with your MySQL username
  password: "Faizan2502$", // Replace with your MySQL password
  database: "cmsprojectdatabase", // Database name
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to the Database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { cnic, email, password, confirmPassword } = req.body;

  // Validate CNIC format
  const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
  if (!cnicPattern.test(cnic)) {
    return res.status(400).json({ message: "Invalid CNIC format!" });
  }

  // Validate password strength
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
  if (!passwordPattern.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain at least one uppercase letter, one special character, one number, and be at least 8 characters long.",
    });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    // Hash the password
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database (fixed query to include email)
    const query = "INSERT INTO users (CNIC, EMAIL, PASSWORD) VALUES (?, ?, ?)";
    db.query(query, [cnic, email, password], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ message: "CNIC or Email already registered!" });
        }
        return res
          .status(500)
          .json({ message: "Database error!", error: err.message });
      }
      res.status(201).json({ message: "User registered successfully!" });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error: error.message });
  }
});

// Login Route
app.post("/api/login", (req, res) => {
  const { cnic, password } = req.body;

  if (!cnic || !password) {
    return res.status(400).json({ message: "CNIC and Password are required." });
  }

  // Query the database to get the user's hashed password
  const query = "SELECT * FROM users WHERE cnic = ?";
  db.query(query, [cnic], (err, results) => {
    if (err) {
      console.error("Error querying the database: ", err);
      return res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }

    if (results.length > 0) {
      const user = results[0];
      const hashedPassword = user.password; // Retrieve the hashed password from the database

      // Compare the provided password with the hashed password
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) {
          console.error("Error comparing passwords: ", err);
          return res
            .status(500)
            .json({ message: "Server error. Please try again later." });
        }

        if (isMatch) {
          return res.status(200).json({ message: "Login successful.", user });
        } else {
          return res.status(401).json({ message: "Invalid CNIC or Password." });
        }
      });
    } else {
      return res.status(401).json({ message: "Invalid CNIC or Password." });
    }
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
