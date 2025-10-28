const { pool } = require("../db");
const bcrypt = require("bcrypt");

// Login Controller - Fixed for connection pool
const login = async (req, res) => {
  const { cnic, password } = req.body;

  if (!cnic || !password) {
    return res.status(400).json({ message: "CNIC and Password are required." });
  }

  try {
    // Use pool.query which automatically handles connections
    pool.query(
      "SELECT * FROM sign_up WHERE CNIC = ?",
      [cnic],
      async (err, results) => {
        if (err) {
          console.error("Error querying the database: ", err);
          return res.status(500).json({
            message: "Server error. Please try again later.",
            error: err.message,
          });
        }

        if (results.length > 0) {
          const user = results[0];
          const hashedPassword = user.PASSWORD;

          // Compare passwords
          bcrypt.compare(password, hashedPassword, (bcryptErr, isMatch) => {
            if (bcryptErr) {
              console.error("Error comparing passwords: ", bcryptErr);
              return res.status(500).json({
                message: "Server error. Please try again later.",
              });
            }

            if (isMatch) {
              // Remove password from user object
              const { PASSWORD, ...userWithoutPassword } = user;
              return res.status(200).json({
                message: "Login successful.",
                user: userWithoutPassword,
              });
            } else {
              return res.status(401).json({
                message: "Invalid CNIC or Password.",
              });
            }
          });
        } else {
          return res.status(401).json({
            message: "Invalid CNIC or Password.",
          });
        }
      }
    );
  } catch (err) {
    console.error("Error in login controller: ", err);
    return res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

// Signup Controller - Fixed for connection pool
const signup = async (req, res) => {
  const { cnic, fullName, email, password, confirmPassword } = req.body;

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
    // First check if user exists
    pool.query(
      "SELECT * FROM sign_up WHERE CNIC = ? OR EMAIL = ?",
      [cnic, email],
      async (checkErr, checkResults) => {
        if (checkErr) {
          console.error("Error checking user existence: ", checkErr);
          return res.status(500).json({
            message: "Database error!",
            error: checkErr.message,
          });
        }

        if (checkResults.length > 0) {
          return res.status(400).json({
            message: "CNIC or Email already registered!",
          });
        }

        try {
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Insert user into the database
          pool.query(
            "INSERT INTO sign_up (CNIC, FULLNAME, EMAIL, PASSWORD) VALUES (?, ?, ?, ?)",
            [cnic, fullName, email, hashedPassword],
            (insertErr, insertResult) => {
              if (insertErr) {
                console.error("Error inserting user: ", insertErr);
                return res.status(500).json({
                  message: "Database error!",
                  error: insertErr.message,
                });
              }

              res.status(201).json({
                message: "User registered successfully!",
              });
            }
          );
        } catch (hashErr) {
          console.error("Error hashing password: ", hashErr);
          return res.status(500).json({
            message: "Server error during password hashing.",
          });
        }
      }
    );
  } catch (error) {
    console.error("Error in signup controller: ", error);
    res.status(500).json({
      message: "Database error!",
      error: error.message,
    });
  }
};

module.exports = { signup, login };
