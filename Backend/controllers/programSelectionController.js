// programSelectionController.js - Updated for connection pool
const { pool } = require("../db");

const saveProgramChoices = (req, res) => {
  const { cnic, appliedDepartment, firstChoice, secondChoice, shift } =
    req.body;

  // Validate required fields
  if (!cnic || !appliedDepartment || !firstChoice || !secondChoice || !shift) {
    return res.status(400).json({
      message:
        "CNIC, Applied Department, First Choice, Second Choice, and Shift are required.",
    });
  }

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({
        message: "Database connection error!",
        error: err.message,
      });
    }

    // Insert or update program choices
    const query =
      "INSERT INTO program_of_study (cnic, applied_department, first_choice, second_choice, shift) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE applied_department = VALUES(applied_department), first_choice = VALUES(first_choice), second_choice = VALUES(second_choice), shift = VALUES(shift)";

    connection.query(
      query,
      [cnic, appliedDepartment, firstChoice, secondChoice, shift],
      (err, result) => {
        // Always release the connection back to the pool
        connection.release();

        if (err) {
          console.error("Error saving program choices: ", err);
          return res.status(500).json({
            message: "Database error!",
            error: err.message,
          });
        }
        res.status(201).json({
          message: "Program choices saved successfully!",
        });
      }
    );
  });
};

const getProgramSelection = (req, res) => {
  const { cnic } = req.params;

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({
        message: "Database connection error!",
        error: err.message,
      });
    }

    // Fetch program choices for the user
    const query = "SELECT * FROM program_of_study WHERE cnic = ?";
    connection.query(query, [cnic], (err, results) => {
      // Always release the connection back to the pool
      connection.release();

      if (err) {
        console.error("Error fetching program choices: ", err);
        return res.status(500).json({
          message: "Database error!",
          error: err.message,
        });
      }
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({
          message: "No program selection found for this user.",
        });
      }
    });
  });
};

module.exports = { saveProgramChoices, getProgramSelection };
