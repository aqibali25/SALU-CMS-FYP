const db = require("../db");

const uploadDocument = async (req, res) => {
  const { cnic, docType, docName } = req.body;

  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const filePath = req.file.path; // File path from multer

  try {
    // Insert document into the database
    const query =
      "INSERT INTO uploaded_docs (cnic, docType, docName, filePath) VALUES (?, ?, ?, ?)";
    db.query(query, [cnic, docType, docName, filePath], (err, result) => {
      if (err) {
        console.error("Error uploading document: ", err);
        return res
          .status(500)
          .json({ message: "Database error!", error: err.message });
      }
      res.status(201).json({
        message: "Document uploaded successfully!",
        filePath: filePath, // Return the file path
      });
    });
  } catch (error) {
    console.error("Error uploading document: ", error);
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
