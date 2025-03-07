const db = require("../db");

const saveProgramChoices = (req, res) => {
  const { cnic, firstChoice, secondChoice, thirdChoice } = req.body;

  // Validate required fields
  if (!cnic || !firstChoice) {
    return res
      .status(400)
      .json({ message: "CNIC and First Choice are required." });
  }

  // Insert program choices into the database
  const query =
    "INSERT INTO program_choices (cnic, first_choice, second_choice, third_choice) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [cnic, firstChoice, secondChoice, thirdChoice],
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

module.exports = { saveProgramChoices };
