const db = require("../db");

const saveProgramChoices = (req, res) => {
  const { cnic, appliedDepartment, firstChoice, secondChoice, thirdChoice } =
    req.body;

  // Validate required fields
  if (!cnic || !appliedDepartment || !firstChoice) {
    return res.status(400).json({
      message: "CNIC, Applied Department, and First Choice are required.",
    });
  }

  // Insert or update program choices in the database
  const query =
    "INSERT INTO program_of_study (cnic, applied_department, first_choice, second_choice, third_choice) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE applied_department = VALUES(applied_department), first_choice = VALUES(first_choice), second_choice = VALUES(second_choice), third_choice = VALUES(third_choice)";
  db.query(
    query,
    [cnic, appliedDepartment, firstChoice, secondChoice, thirdChoice],
    (err, result) => {
      if (err) {
        console.error("Error saving program choices: ", err);
        return res
          .status(500)
          .json({ message: "Database error!", error: err.message });
      }
      res.status(201).json({ message: "Program choices saved successfully!" });
    }
  );
};

const getProgramSelection = (req, res) => {
  const { cnic } = req.params;

  // Fetch program choices for the user
  const query = "SELECT * FROM program_of_study WHERE cnic = ?";
  db.query(query, [cnic], (err, results) => {
    if (err) {
      console.error("Error fetching program choices: ", err);
      return res
        .status(500)
        .json({ message: "Database error!", error: err.message });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res
        .status(404)
        .json({ message: "No program selection found for this user." });
    }
  });
};

module.exports = { saveProgramChoices, getProgramSelection };
