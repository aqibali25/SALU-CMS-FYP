const db = require("../db");

const getDepartments = (req, res) => {
  const query = "SELECT * FROM departments";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching departments: ", err);
      return res
        .status(500)
        .json({ message: "Database error!", error: err.message });
    }
    res.status(200).json(results);
  });
};

module.exports = { getDepartments };
