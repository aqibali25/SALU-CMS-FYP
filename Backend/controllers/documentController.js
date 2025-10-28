// controllers/documentController.js
const { pool } = require("../db");
const fs = require("fs");
const path = require("path");

const uploadDocument = async (req, res) => {
  const { cnic, docType, docName } = req.body;

  console.log("Upload Document Request:", { cnic, docType, docName });

  // Check if file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
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

    try {
      // Read file as buffer
      const fileBuffer = fs.readFileSync(req.file.path);
      const fileName = req.file.originalname;
      const fileSize = req.file.size;
      const mimeType = req.file.mimetype;

      // Clean up the temporary file
      fs.unlinkSync(req.file.path);

      // Insert document into the database with file data
      const query =
        "INSERT INTO uploaded_docs (cnic, docType, docName, fileName, fileData, fileSize, mimeType, uploadDate) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";
      
      connection.query(query, [
        cnic, 
        docType, 
        docName, 
        fileName, 
        fileBuffer, 
        fileSize, 
        mimeType
      ], (queryErr, result) => {
        // Always release the connection back to the pool
        connection.release();

        if (queryErr) {
          console.error("Error uploading document: ", queryErr);
          return res.status(500).json({ 
            message: "Database error!", 
            error: queryErr.message 
          });
        }

        console.log("Document uploaded successfully to database, result:", result);
        res.status(201).json({
          message: "Document uploaded successfully!",
          documentId: result.insertId,
          fileName: fileName,
          fileSize: fileSize,
          docType: docType,
          docName: docName
        });
      });
    } catch (fileError) {
      connection.release();
      console.error("Error processing file: ", fileError);
      return res.status(500).json({ 
        message: "File processing error!", 
        error: fileError.message 
      });
    }
  });
};

// Fetch Uploaded Documents (metadata only, not file data)
const getUploadedDocuments = (req, res) => {
  const { cnic } = req.params;

  console.log("Get Uploaded Documents for CNIC:", cnic);

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({ 
        message: "Database connection error!", 
        error: err.message 
      });
    }

    // Fetch documents metadata for the user (exclude fileData for performance)
    const query = "SELECT id, cnic, docType, docName, fileName, fileSize, mimeType, uploadDate FROM uploaded_docs WHERE cnic = ? ORDER BY uploadDate DESC";
    connection.query(query, [cnic], (queryErr, results) => {
      // Always release the connection back to the pool
      connection.release();

      if (queryErr) {
        console.error("Error fetching documents: ", queryErr);
        return res.status(500).json({ 
          message: "Database error!", 
          error: queryErr.message 
        });
      }

      console.log("Uploaded documents metadata results:", results);
      res.status(200).json(results);
    });
  });
};

// Download a specific document
const downloadDocument = (req, res) => {
  const { id } = req.params;

  console.log("Download Document ID:", id);

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({ 
        message: "Database connection error!", 
        error: err.message 
      });
    }

    // Fetch document with file data
    const query = "SELECT fileName, fileData, mimeType FROM uploaded_docs WHERE id = ?";
    connection.query(query, [id], (queryErr, results) => {
      // Always release the connection back to the pool
      connection.release();

      if (queryErr) {
        console.error("Error fetching document: ", queryErr);
        return res.status(500).json({ 
          message: "Database error!", 
          error: queryErr.message 
        });
      }

      if (results.length === 0) {
        return res.status(404).json({ 
          message: "Document not found." 
        });
      }

      const document = results[0];
      
      // Set appropriate headers for download
      res.setHeader('Content-Type', document.mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${document.fileName}"`);
      res.setHeader('Content-Length', document.fileData.length);

      // Send the file buffer
      res.send(document.fileData);
    });
  });
};

// View a document (inline in browser)
const viewDocument = (req, res) => {
  const { id } = req.params;

  console.log("View Document ID:", id);

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({ 
        message: "Database connection error!", 
        error: err.message 
      });
    }

    // Fetch document with file data
    const query = "SELECT fileName, fileData, mimeType FROM uploaded_docs WHERE id = ?";
    connection.query(query, [id], (queryErr, results) => {
      // Always release the connection back to the pool
      connection.release();

      if (queryErr) {
        console.error("Error fetching document: ", queryErr);
        return res.status(500).json({ 
          message: "Database error!", 
          error: queryErr.message 
        });
      }

      if (results.length === 0) {
        return res.status(404).json({ 
          message: "Document not found." 
        });
      }

      const document = results[0];
      
      // Set appropriate headers for viewing in browser
      res.setHeader('Content-Type', document.mimeType);
      res.setHeader('Content-Disposition', `inline; filename="${document.fileName}"`);
      res.setHeader('Content-Length', document.fileData.length);

      // Send the file buffer
      res.send(document.fileData);
    });
  });
};

// Delete a document
const deleteDocument = (req, res) => {
  const { id } = req.params;

  console.log("Delete Document ID:", id);

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection: ", err);
      return res.status(500).json({ 
        message: "Database connection error!", 
        error: err.message 
      });
    }

    // Delete document from database
    const query = "DELETE FROM uploaded_docs WHERE id = ?";
    connection.query(query, [id], (queryErr, result) => {
      // Always release the connection back to the pool
      connection.release();

      if (queryErr) {
        console.error("Error deleting document: ", queryErr);
        return res.status(500).json({ 
          message: "Database error!", 
          error: queryErr.message 
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ 
          message: "Document not found." 
        });
      }

      console.log("Document deleted successfully");
      res.status(200).json({
        message: "Document deleted successfully!"
      });
    });
  });
};

module.exports = { 
  uploadDocument, 
  getUploadedDocuments, 
  downloadDocument, 
  viewDocument, 
  deleteDocument 
};