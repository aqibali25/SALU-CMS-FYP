const db = require("../db");
const bcrypt = require("bcrypt");

// Signup Controller
const signup = async (req, res) => {
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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const query =
      "INSERT INTO sign_up (CNIC, EMAIL, PASSWORD) VALUES (?, ?, ?)";
    db.query(query, [cnic, email, hashedPassword], (err, result) => {
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
};

// Login Controller
const login = (req, res) => {
  const { cnic, password } = req.body;

  if (!cnic || !password) {
    return res.status(400).json({ message: "CNIC and Password are required." });
  }

  // Query the database to get the user's hashed password
  const query = "SELECT * FROM sign_up WHERE CNIC = ?";
  db.query(query, [cnic], (err, results) => {
    if (err) {
      console.error("Error querying the database: ", err);
      return res
        .status(500)
        .json({ message: "Server error. Please try again later." });
    }

    if (results.length > 0) {
      const user = results[0];
      const hashedPassword = user.PASSWORD; // Retrieve the hashed password from the database

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
};

module.exports = { signup, login };
