const { pool } = require("../db");

const saveAcademicRecord = (req, res) => {
  const { cnic, intermediate, matriculation } = req.body;

  console.log("Save Academic Record Request:", req.body);

  // Validate required fields
  if (!cnic || !intermediate || !matriculation) {
    return res.status(400).json({ message: "Required fields are missing." });
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

    // Check if CNIC exists in sign_up table
    const checkCnicQuery = "SELECT * FROM sign_up WHERE cnic = ?";
    connection.query(checkCnicQuery, [cnic], (checkErr, checkResults) => {
      if (checkErr) {
        connection.release();
        console.error("Error validating CNIC: ", checkErr);
        return res.status(500).json({
          message: "Database error!",
          error: checkErr.message,
        });
      }

      if (checkResults.length === 0) {
        connection.release();
        return res.status(400).json({
          message: "Invalid CNIC. User not found.",
        });
      }

      // Insert or update intermediate information
      const intermediateQuery =
        "INSERT INTO intermediate (cnic, group_name, degree_year, seat_no, institution_name, board, total_marks, marks_obtained, percentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE group_name = VALUES(group_name), degree_year = VALUES(degree_year), seat_no = VALUES(seat_no), institution_name = VALUES(institution_name), board = VALUES(board), total_marks = VALUES(total_marks), marks_obtained = VALUES(marks_obtained), percentage = VALUES(percentage)";

      connection.query(
        intermediateQuery,
        [
          cnic,
          intermediate.group,
          intermediate.degreeYear,
          intermediate.seatNo,
          intermediate.institutionName,
          intermediate.board,
          intermediate.totalMarks,
          intermediate.marksObtained,
          intermediate.percentage,
        ],
        (intermediateErr, intermediateResult) => {
          if (intermediateErr) {
            connection.release();
            console.error(
              "Error saving intermediate information: ",
              intermediateErr
            );
            return res.status(500).json({
              message: "Database error!",
              error: intermediateErr.message,
            });
          }

          // Insert or update matriculation information
          const matriculationQuery =
            "INSERT INTO matriculation (cnic, group_name, degree_year, seat_no, institution_name, board, total_marks, marks_obtained, percentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE group_name = VALUES(group_name), degree_year = VALUES(degree_year), seat_no = VALUES(seat_no), institution_name = VALUES(institution_name), board = VALUES(board), total_marks = VALUES(total_marks), marks_obtained = VALUES(marks_obtained), percentage = VALUES(percentage)";

          connection.query(
            matriculationQuery,
            [
              cnic,
              matriculation.group,
              matriculation.degreeYear,
              matriculation.seatNo,
              matriculation.institutionName,
              matriculation.board,
              matriculation.totalMarks,
              matriculation.marksObtained,
              matriculation.percentage,
            ],
            (matriculationErr, matriculationResult) => {
              // Always release the connection back to the pool
              connection.release();

              if (matriculationErr) {
                console.error(
                  "Error saving matriculation information: ",
                  matriculationErr
                );
                return res.status(500).json({
                  message: "Database error!",
                  error: matriculationErr.message,
                });
              }

              console.log("Academic record saved successfully");
              res.status(201).json({
                message: "Academic record saved successfully!",
              });
            }
          );
        }
      );
    });
  });
};

const getAcademicRecord = (req, res) => {
  const { cnic } = req.params;

  console.log("Get Academic Record for CNIC:", cnic);

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({
        message: "Database connection error!",
        error: err.message,
      });
    }

    // Fetch intermediate and matriculation information for the user
    const intermediateQuery = "SELECT * FROM intermediate WHERE cnic = ?";
    const matriculationQuery = "SELECT * FROM matriculation WHERE cnic = ?";

    connection.query(
      intermediateQuery,
      [cnic],
      (intermediateErr, intermediateResults) => {
        if (intermediateErr) {
          connection.release();
          console.error(
            "Error fetching intermediate information: ",
            intermediateErr
          );
          return res.status(500).json({
            message: "Database error!",
            error: intermediateErr.message,
          });
        }

        connection.query(
          matriculationQuery,
          [cnic],
          (matriculationErr, matriculationResults) => {
            // Always release the connection back to the pool
            connection.release();

            if (matriculationErr) {
              console.error(
                "Error fetching matriculation information: ",
                matriculationErr
              );
              return res.status(500).json({
                message: "Database error!",
                error: matriculationErr.message,
              });
            }

            console.log("Intermediate results:", intermediateResults);
            console.log("Matriculation results:", matriculationResults);

            if (
              intermediateResults.length > 0 ||
              matriculationResults.length > 0
            ) {
              res.status(200).json({
                intermediate: intermediateResults[0] || null,
                matriculation: matriculationResults[0] || null,
              });
            } else {
              res.status(404).json({
                message: "No academic record found for this user.",
              });
            }
          }
        );
      }
    );
  });
};

module.exports = { saveAcademicRecord, getAcademicRecord };
