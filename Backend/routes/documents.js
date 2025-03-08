const express = require("express");
const router = express.Router();
const documentsController = require("../controllers/documentsController");
const upload = require("../middleware/upload");

// Upload Document Route
router.post(
  "/upload",
  upload.single("file"),
  documentsController.uploadDocument
);

// Fetch Uploaded Documents Route
router.get("/:cnic", documentsController.getUploadedDocuments);

module.exports = router;
