const db = require("../db");

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

  // Validate required fields
  if (!cnic || !firstName || !lastName || !gender || !dob || !religion) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  // Check if CNIC exists in sign_up table
  const checkCnicQuery = "SELECT * FROM sign_up WHERE cnic = ?";
  db.query(checkCnicQuery, [cnic], (err, results) => {
    if (err) {
      console.error("Error validating CNIC:", err);
      return res
        .status(500)
        .json({ message: "Database error!", error: err.message });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid CNIC. User not found." });
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

    db.query(
      insertOrUpdateQuery,
      [
        cnic,
        firstName,
        lastName,
        gender,
        dob,
        religion,
        disability,
        disabilityDescription || null, // Fix: Prevent empty values from breaking query
        nativeLanguage,
        bloodGroup,
        province,
        city,
        postalAddress,
        permanentAddress,
      ],
      (err, result) => {
        if (err) {
          console.error("Error saving personal information:", err);
          return res
            .status(500)
            .json({ message: "Database error!", error: err.message });
        }
        res
          .status(201)
          .json({ message: "Personal information saved successfully!" });
      }
    );
  });
};

const getPersonalInfo = (req, res) => {
  const { cnic } = req.params;

  if (!cnic) {
    return res.status(400).json({ message: "CNIC is required." });
  }

  // Fetch personal information for the user
  const query = "SELECT * FROM personal_info WHERE cnic = ?";
  db.query(query, [cnic], (err, results) => {
    if (err) {
      console.error("Error fetching personal information:", err);
      return res
        .status(500)
        .json({ message: "Database error!", error: err.message });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res
        .status(404)
        .json({ message: "No personal information found for this user." });
    }
  });
};

module.exports = { savePersonalInfo, getPersonalInfo };
