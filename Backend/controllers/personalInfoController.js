const { pool } = require("../db");

const savePersonalInfo = (req, res) => {
  const {
    cnic,
    firstName,
    lastName,
    gender,
    dob,
    religion,
    disability,
    disabilityDescription,
    nativeLanguage,
    bloodGroup,
    province,
    city,
    postalAddress,
    permanentAddress,
  } = req.body;

  console.log("Save Personal Info Request:", req.body);

  // Validate required fields
  if (!cnic || !firstName || !lastName || !gender || !dob || !religion) {
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
        console.error("Error validating CNIC:", checkErr);
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

      // Insert or update personal information in the database
      const insertOrUpdateQuery = `
        INSERT INTO personal_info (cnic, first_name, last_name, gender, dob, religion, disability, 
        disability_description, native_language, blood_group, province, city, postal_address, permanent_address) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE 
        first_name = VALUES(first_name), 
        last_name = VALUES(last_name), 
        gender = VALUES(gender), 
        dob = VALUES(dob), 
        religion = VALUES(religion), 
        disability = VALUES(disability), 
        disability_description = VALUES(disability_description), 
        native_language = VALUES(native_language), 
        blood_group = VALUES(blood_group), 
        province = VALUES(province), 
        city = VALUES(city), 
        postal_address = VALUES(postal_address), 
        permanent_address = VALUES(permanent_address)`;

      connection.query(
        insertOrUpdateQuery,
        [
          cnic,
          firstName,
          lastName,
          gender,
          dob,
          religion,
          disability,
          disabilityDescription || null,
          nativeLanguage,
          bloodGroup,
          province,
          city,
          postalAddress,
          permanentAddress,
        ],
        (insertErr, result) => {
          // Always release the connection back to the pool
          connection.release();

          if (insertErr) {
            console.error("Error saving personal information:", insertErr);
            return res.status(500).json({ 
              message: "Database error!", 
              error: insertErr.message 
            });
          }
          
          console.log("Personal info saved successfully, result:", result);
          res.status(201).json({ 
            message: "Personal information saved successfully!" 
          });
        }
      );
    });
  });
};

const getPersonalInfo = (req, res) => {
  const { cnic } = req.params;

  console.log("Get Personal Info for CNIC:", cnic);

  if (!cnic) {
    return res.status(400).json({ message: "CNIC is required." });
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

    // Fetch personal information for the user
    const query = "SELECT * FROM personal_info WHERE cnic = ?";
    connection.query(query, [cnic], (queryErr, results) => {
      // Always release the connection back to the pool
      connection.release();

      if (queryErr) {
        console.error("Error fetching personal information:", queryErr);
        return res.status(500).json({ 
          message: "Database error!", 
          error: queryErr.message 
        });
      }
      
      console.log("Personal info results:", results);
      
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ 
          message: "No personal information found for this user." 
        });
      }
    });
  });
};

module.exports = { savePersonalInfo, getPersonalInfo };