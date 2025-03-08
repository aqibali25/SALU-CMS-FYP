const db = require("../db");

// Upload Document
const uploadDocument = async (req, res) => {
  const { cnic, docType, docName } = req.body;
  const filePath = req.file.path; // File path from multer

  // Validate required fields
  if (!cnic || !docType || !docName || !filePath) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Convert file to Base64
    const fileData = await convertToBase64(req.file.path);

    // Insert document into the database
    const query =
      "INSERT INTO uploaded_docs (cnic, docType, docName, filePath, fileData) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [cnic, docType, docName, filePath, fileData],
      (err, result) => {
        if (err) {
          console.error("Error uploading document: ", err);
          return res
            .status(500)
            .json({ message: "Database error!", error: err.message });
        }
        res.status(201).json({ message: "Document uploaded successfully!" });
      }
    );
  } catch (error) {
    console.error("Error converting file to Base64: ", error);
    res.status(500).json({ message: "Server error!", error: error.message });
  }
};

// Fetch Uploaded Documents
const getUploadedDocuments = (req, res) => {
  const { cnic } = req.params;

  // Fetch documents for the user
  const query = "SELECT * FROM uploaded_docs WHERE cnic = ?";
  db.query(query, [cnic], (err, results) => {
    if (err) {
      console.error("Error fetching documents: ", err);
      return res
        .status(500)
        .json({ message: "Database error!", error: err.message });
    }
    res.status(200).json(results);
  });
};

// Helper function to convert file to Base64
const convertToBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    const fs = require("fs");
    fs.readFile(filePath, { encoding: "base64" }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

module.exports = { uploadDocument, getUploadedDocuments };
