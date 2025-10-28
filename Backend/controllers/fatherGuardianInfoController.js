const { pool } = require("../db");

const saveFatherGuardianInfo = (req, res) => {
  const { cnic, fatherData, guardianData } = req.body;

  console.log("Save Father/Guardian Info Request:", req.body);

  // Validate required fields
  if (!cnic || !fatherData || !guardianData) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({ 
        message: "Database connection error!", 
        error: err.message 
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
          error: checkErr.message 
        });
      }

      if (checkResults.length === 0) {
        connection.release();
        return res.status(400).json({ 
          message: "Invalid CNIC. User not found." 
        });
      }

      // Insert or update father information
      const fatherQuery =
        "INSERT INTO father_info (cnic, name, cnic_number, mobile_number, occupation) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), cnic_number = VALUES(cnic_number), mobile_number = VALUES(mobile_number), occupation = VALUES(occupation)";
      
      connection.query(
        fatherQuery,
        [
          cnic,
          fatherData.name,
          fatherData.cnic,
          fatherData.mobileNumber,
          fatherData.occupation,
        ],
        (fatherErr, fatherResult) => {
          if (fatherErr) {
            connection.release();
            console.error("Error saving father information: ", fatherErr);
            return res.status(500).json({ 
              message: "Database error!", 
              error: fatherErr.message 
            });
          }

          // Insert or update guardian information
          const guardianQuery =
            "INSERT INTO guardian_info (cnic, name, cnic_number, mobile_number, occupation) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), cnic_number = VALUES(cnic_number), mobile_number = VALUES(mobile_number), occupation = VALUES(occupation)";
          
          connection.query(
            guardianQuery,
            [
              cnic,
              guardianData.name,
              guardianData.cnic,
              guardianData.mobileNumber,
              guardianData.occupation,
            ],
            (guardianErr, guardianResult) => {
              // Always release the connection back to the pool
              connection.release();

              if (guardianErr) {
                console.error("Error saving guardian information: ", guardianErr);
                return res.status(500).json({ 
                  message: "Database error!", 
                  error: guardianErr.message 
                });
              }

              console.log("Father and guardian info saved successfully");
              res.status(201).json({
                message: "Father and guardian information saved successfully!",
              });
            }
          );
        }
      );
    });
  });
};

const getFatherGuardianInfo = (req, res) => {
  const { cnic } = req.params;

  console.log("Get Father/Guardian Info for CNIC:", cnic);

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({ 
        message: "Database connection error!", 
        error: err.message 
      });
    }

    // Fetch father and guardian information for the user
    const fatherQuery = "SELECT * FROM father_info WHERE cnic = ?";
    const guardianQuery = "SELECT * FROM guardian_info WHERE cnic = ?";

    connection.query(fatherQuery, [cnic], (fatherErr, fatherResults) => {
      if (fatherErr) {
        connection.release();
        console.error("Error fetching father information: ", fatherErr);
        return res.status(500).json({ 
          message: "Database error!", 
          error: fatherErr.message 
        });
      }

      connection.query(guardianQuery, [cnic], (guardianErr, guardianResults) => {
        // Always release the connection back to the pool
        connection.release();

        if (guardianErr) {
          console.error("Error fetching guardian information: ", guardianErr);
          return res.status(500).json({ 
            message: "Database error!", 
            error: guardianErr.message 
          });
        }

        console.log("Father results:", fatherResults);
        console.log("Guardian results:", guardianResults);

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
  });
};

module.exports = { saveFatherGuardianInfo, getFatherGuardianInfo };