const db = require("../db");

const saveFatherGuardianInfo = (req, res) => {
  const { cnic, fatherData, guardianData } = req.body;

  // Validate required fields
  if (!cnic || !fatherData || !guardianData) {
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

    // Insert or update father information
    const fatherQuery =
      "INSERT INTO father_info (cnic, name, cnic_number, mobile_number, occupation) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), cnic_number = VALUES(cnic_number), mobile_number = VALUES(mobile_number), occupation = VALUES(occupation)";
    db.query(
      fatherQuery,
      [
        cnic,
        fatherData.name,
        fatherData.cnic,
        fatherData.mobileNumber,
        fatherData.occupation,
      ],
      (err, result) => {
        if (err) {
          console.error("Error saving father information: ", err);
          return res
            .status(500)
            .json({ message: "Database error!", error: err.message });
        }

        // Insert or update guardian information
        const guardianQuery =
          "INSERT INTO guardian_info (cnic, name, cnic_number, mobile_number, occupation) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), cnic_number = VALUES(cnic_number), mobile_number = VALUES(mobile_number), occupation = VALUES(occupation)";
        db.query(
          guardianQuery,
          [
            cnic,
            guardianData.name,
            guardianData.cnic,
            guardianData.mobileNumber,
            guardianData.occupation,
          ],
          (err, result) => {
            if (err) {
              console.error("Error saving guardian information: ", err);
              return res
                .status(500)
                .json({ message: "Database error!", error: err.message });
            }
            res.status(201).json({
              message: "Father and guardian information saved successfully!",
            });
          }
        );
      }
    );
  });
};

const getFatherGuardianInfo = (req, res) => {
  const { cnic } = req.params;

  // Fetch father and guardian information for the user
  const fatherQuery = "SELECT * FROM father_info WHERE cnic = ?";
  const guardianQuery = "SELECT * FROM guardian_info WHERE cnic = ?";

  db.query(fatherQuery, [cnic], (err, fatherResults) => {
    if (err) {
      console.error("Error fetching father information: ", err);
      return res
        .status(500)
        .json({ message: "Database error!", error: err.message });
    }

    db.query(guardianQuery, [cnic], (err, guardianResults) => {
      if (err) {
        console.error("Error fetching guardian information: ", err);
        return res
          .status(500)
          .json({ message: "Database error!", error: err.message });
      }

      if (fatherResults.length > 0 || guardianResults.length > 0) {
        res.status(200).json({
          fatherData: fatherResults[0] || null,
          guardianData: guardianResults[0] || null,
        });
      } else {
        res.status(404).json({
          message: "No father or guardian information found for this user.",
        });
      }
    });
  });
};

module.exports = { saveFatherGuardianInfo, getFatherGuardianInfo };
