const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Import bcrypt

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "salu_cms", // Database name
});

// Connect to the Database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Connected to the MySQL database.");
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
