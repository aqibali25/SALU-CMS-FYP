const { pool } = require("../db");

// Helper function to run query with Promise
const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// ✔ Fetch all tables data together
const getAllData = async (req, res) => {
  const cnic = req.params.cnic || null;

  try {
    let condition = "";
    let params = [];

    if (cnic) {
      condition = "WHERE cnic = ?";
      params = [cnic];
    }

    // Queries
    const queries = {
      signup: `SELECT EMAIL FROM sign_up ${cnic ? "WHERE CNIC = ?" : ""}`,
      personal_info: `SELECT * FROM personal_info ${condition}`,
      program_of_study: `SELECT * FROM program_of_study ${condition}`,
      matriculation: `SELECT * FROM matriculation ${condition}`,
      intermediate: `SELECT * FROM intermediate ${condition}`,
      uploaded_docs: `SELECT id, cnic, docType, docName, fileName, fileSize, mimeType, uploadDate FROM uploaded_docs ${condition}`,
      father_info: `SELECT * FROM father_info ${condition}`,
      admission_schedule: `SELECT * FROM admission_schedule`
    };

    // Execute all queries
    const results = {
      sign_up: await runQuery(queries.signup, params),
      personal_info: await runQuery(queries.personal_info, params),
      program_of_study: await runQuery(queries.program_of_study, params),
      matriculation: await runQuery(queries.matriculation, params),
      intermediate: await runQuery(queries.intermediate, params),
      uploaded_docs: await runQuery(queries.uploaded_docs, params),
      father_info: await runQuery(queries.father_info, params),
      admission_schedule: await runQuery(queries.admission_schedule)
    };

    return res.status(200).json({
      success: true,
      filter: cnic ? `CNIC Filter Applied: ${cnic}` : "All Data Returned",
      data: results,
    });

  } catch (error) {
    console.error("Error fetching all tables data:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { getAllData };
