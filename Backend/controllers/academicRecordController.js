const db = require("../db");

const saveAcademicRecord = (req, res) => {
  const { cnic, intermediate, matriculation } = req.body;

  // Validate required fields
  if (!cnic || !intermediate || !matriculation) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  // Check if CNIC exists in sign_up table
  const checkCnicQuery = "SELECT * FROM sign_up WHERE cnic = ?";
  db.query(checkCnicQuery, [cnic], (err, results) => {
    if (err) {
      console.error("Error validating CNIC: ", err);
      return res
        .status(500)
        .json({ message: "Database error!", error: err.message });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid CNIC. User not found." });
    }

    // Insert or update intermediate information
    const intermediateQuery =
      "INSERT INTO intermediate (cnic, group_name, degree_year, seat_no, institution_name, board, total_marks, marks_obtained, percentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE group_name = VALUES(group_name), degree_year = VALUES(degree_year), seat_no = VALUES(seat_no), institution_name = VALUES(institution_name), board = VALUES(board), total_marks = VALUES(total_marks), marks_obtained = VALUES(marks_obtained), percentage = VALUES(percentage)";
    db.query(
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
      (err, result) => {
        if (err) {
          console.error("Error saving intermediate information: ", err);
          return res
            .status(500)
            .json({ message: "Database error!", error: err.message });
        }

        // Insert or update matriculation information
        const matriculationQuery =
          "INSERT INTO matriculation (cnic, group_name, degree_year, seat_no, institution_name, board, total_marks, marks_obtained, percentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE group_name = VALUES(group_name), degree_year = VALUES(degree_year), seat_no = VALUES(seat_no), institution_name = VALUES(institution_name), board = VALUES(board), total_marks = VALUES(total_marks), marks_obtained = VALUES(marks_obtained), percentage = VALUES(percentage)";
        db.query(
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
          (err, result) => {
            if (err) {
              console.error("Error saving matriculation information: ", err);
              return res
                .status(500)
                .json({ message: "Database error!", error: err.message });
            }
            res
              .status(201)
              .json({ message: "Academic record saved successfully!" });
          }
        );
      }
    );
  });
};

const getAcademicRecord = (req, res) => {
  const { cnic } = req.params;

  // Fetch intermediate and matriculation information for the user
  const intermediateQuery = "SELECT * FROM intermediate WHERE cnic = ?";
  const matriculationQuery = "SELECT * FROM matriculation WHERE cnic = ?";

  db.query(intermediateQuery, [cnic], (err, intermediateResults) => {
    if (err) {
      console.error("Error fetching intermediate information: ", err);
      return res
        .status(500)
        .json({ message: "Database error!", error: err.message });
    }

    db.query(matriculationQuery, [cnic], (err, matriculationResults) => {
      if (err) {
        console.error("Error fetching matriculation information: ", err);
        return res
          .status(500)
          .json({ message: "Database error!", error: err.message });
      }

      if (intermediateResults.length > 0 || matriculationResults.length > 0) {
        res.status(200).json({
          intermediate: intermediateResults[0] || null,
          matriculation: matriculationResults[0] || null,
        });
      } else {
        res
          .status(404)
          .json({ message: "No academic record found for this user." });
      }
    });
  });
};

module.exports = { saveAcademicRecord, getAcademicRecord };
