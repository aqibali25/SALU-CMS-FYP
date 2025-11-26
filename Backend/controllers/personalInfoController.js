const { pool } = require("../db");

const savePersonalInfo = (req, res) => {
  const {
    cnic,
    phone_no,
    first_name,
    last_name,
    surname,
    email,
    gender,
    dob,
    religion,
    disability,
    disability_description,
    native_language,
    blood_group,
    province,
    city,
    postal_address,
    permanent_address,
    are_you_employed,
    self_finance,
    hostel,
    transport,
    domicile_district,
    block_no,
    form_status,
    remarks,
    roll_no,
    entry_test_roll_no,
    cgpa,
    form_fee_status,
    admission_year
  } = req.body;

  console.log("Save Personal Info Request:", req.body);

  if (!cnic || !first_name || !last_name || !gender || !dob || !religion || !admission_year) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({
        message: "Database connection error!",
        error: err.message,
      });
    }

    const checkCnicQuery = "SELECT * FROM sign_up WHERE cnic = ?";
    connection.query(checkCnicQuery, [cnic], (checkErr, checkResults) => {
      if (checkErr) {
        connection.release();
        console.error("Error validating CNIC:", checkErr);
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

      const insertOrUpdateQuery = `
        INSERT INTO personal_info (
          cnic, phone_no, first_name, last_name, surname, email, gender, dob, religion,
          disability, disability_description, native_language, blood_group, province, city,
          postal_address, permanent_address, are_you_employed, self_finance, hostel,
          transport, domicile_district, block_no, form_status, remarks, roll_no,
          entry_test_roll_no, cgpa, form_fee_status, admission_year
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          phone_no = VALUES(phone_no),
          first_name = VALUES(first_name),
          last_name = VALUES(last_name),
          surname = VALUES(surname),
          email = VALUES(email),
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
          permanent_address = VALUES(permanent_address),
          are_you_employed = VALUES(are_you_employed),
          self_finance = VALUES(self_finance),
          hostel = VALUES(hostel),
          transport = VALUES(transport),
          domicile_district = VALUES(domicile_district),
          block_no = VALUES(block_no),
          form_status = VALUES(form_status),
          remarks = VALUES(remarks),
          roll_no = VALUES(roll_no),
          entry_test_roll_no = VALUES(entry_test_roll_no),
          cgpa = VALUES(cgpa),
          form_fee_status = VALUES(form_fee_status),
          admission_year = VALUES(admission_year)
      `;

      connection.query(
        insertOrUpdateQuery,
        [
          cnic,
          phone_no,
          first_name,
          last_name,
          surname,
          email,
          gender,
          dob,
          religion,
          disability,
          disability_description || null,
          native_language,
          blood_group,
          province,
          city,
          postal_address,
          permanent_address,
          are_you_employed,
          self_finance,
          hostel,
          transport,
          domicile_district,
          block_no,
          form_status,
          remarks,
          roll_no,
          entry_test_roll_no,
          cgpa,
          form_fee_status,
          admission_year
        ],
        (insertErr, result) => {
          connection.release();

          if (insertErr) {
            console.error("Error saving personal information:", insertErr);
            return res.status(500).json({
              message: "Database error!",
              error: insertErr.message,
            });
          }

          console.log("Personal info saved successfully:", result);
          res.status(201).json({
            message: "Personal information saved successfully!",
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

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({
        message: "Database connection error!",
        error: err.message,
      });
    }

    const query = "SELECT * FROM personal_info WHERE cnic = ?";
    connection.query(query, [cnic], (queryErr, results) => {
      connection.release();

      if (queryErr) {
        console.error("Error fetching personal information:", queryErr);
        return res.status(500).json({
          message: "Database error!",
          error: queryErr.message,
        });
      }

      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({
          message: "No personal information found for this user.",
        });
      }
    });
  });
};

module.exports = { savePersonalInfo, getPersonalInfo };
