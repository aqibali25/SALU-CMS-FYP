// routes/documents.js
const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const upload = require("../config/multer"); // Import multer configuration

// Upload document - multer handles the file upload
router.post("/uploadDocument", upload.single("document"), documentController.uploadDocument);

// Get uploaded documents (metadata)
router.get("/getUploadedDocuments/:cnic", documentController.getUploadedDocuments);

// Download document
router.get("/downloadDocument/:id", documentController.downloadDocument);

// View document inline
router.get("/viewDocument/:id", documentController.viewDocument);

// Delete document
router.delete("/deleteDocument/:id", documentController.deleteDocument);

module.exports = router;